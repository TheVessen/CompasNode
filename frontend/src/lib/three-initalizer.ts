import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const defaultUp = new THREE.Vector3(0, 0, 1);

function clearScene(scene: THREE.Scene) {
  scene.remove.apply(scene, scene.children);
  if (scene.children.length > 0) {
    scene.children.forEach((child) => {
      scene.remove(child);
    });
  }
}

function createCamera(base: ThreeInitializerOptions): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    0.1,
    1000000,
  );

  if (base.cameraPosition) {
    camera.position.set(
      base.cameraPosition.x,
      base.cameraPosition.y,
      base.cameraPosition.z,
    );
  } else {
    camera.position.set(-2000, 2000, 2000);
  }

  if (base.sceneUp) {
    camera.up.set(base.sceneUp.x, base.sceneUp.y, base.sceneUp.z);
  } else {
    camera.up.set(defaultUp.x, defaultUp.y, defaultUp.z);
  }

  return camera;
}

function setupRenderer(canvas: HTMLCanvasElement): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
    logarithmicDepthBuffer: true,
  });

  // Get the parent element
  const parent = canvas.parentElement;

  // Set the size of the renderer to the size of the parent element
  if (parent) {
    renderer.setSize(parent.clientWidth, parent.clientHeight);
  } else {
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  renderer.shadowMap.enabled = true;
  return renderer;
}

function setupControls(
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement,
): OrbitControls {
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.autoRotate = true;
  return controls;
}

function setupEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene, options: ThreeInitializerOptions) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  new RGBELoader().load(options.hdrPath || "/baseHDR.hdr", function (texture) {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    texture.dispose();
    pmremGenerator.dispose();
  }, undefined, function (error) {
    console.error('An error occurred while loading the HDR texture:', error);
  });
}


/**
 * Initializes the Three.js environment.
 *
 * @param canvas - The HTML canvas element to render the scene on.
 * @returns An object containing the scene, camera, and controls.
 */
export const initThree = function (
  canvas: HTMLCanvasElement,
  options?: ThreeInitializerOptions,
): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
} {
  options = options || {};

  const scene = new THREE.Scene();
  clearScene(scene);

  if (options.backgroundColor) {
    scene.background = options.backgroundColor;
  } else {
    scene.background = new THREE.Color(0xffffff);
  }

  const camera = createCamera(options);
  const renderer = setupRenderer(canvas);
  const controls = setupControls(camera, canvas);

  setupEnvironment(renderer, scene, options);

  const parent = canvas.parentElement;
  let needsResize = false;

  if (parent) {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === canvas) {
          const newWidth = canvas.clientWidth;
          const newHeight = canvas.clientHeight;
          const newRatio = newWidth / newHeight;

          if (newWidth !== renderer.domElement.width || newHeight !== renderer.domElement.height) {
            camera.aspect = newRatio;
            camera.updateProjectionMatrix();
            needsResize = true;
          }
        }
      }
    });

    resizeObserver.observe(canvas);
  } else {
    window.addEventListener('resize', function () {
      const ratio = window.innerWidth / window.innerHeight;
      camera.aspect = ratio;
      camera.updateProjectionMatrix();
      needsResize = true;
    });
  }

  // Animate the scene
  const animate = function () {
    if (needsResize) {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      needsResize = false;
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };


  if (options.sceneUp) {
    scene.up.set(options.sceneUp.x, options.sceneUp.y, options.sceneUp.z);
  } else {
    scene.up.set(defaultUp.x, defaultUp.y, defaultUp.z);
  }

  animate();
  return { scene, camera, controls };
};

export type ThreeInitializerOptions = {
  backgroundColor?: THREE.Color;
  cameraPosition?: THREE.Vector3;
  sceneUp?: THREE.Vector3;
  hdrPath?: string;
};
