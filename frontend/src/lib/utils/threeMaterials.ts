import * as THREE from 'three';

export const cNBaseMaterial = new THREE.MeshStandardMaterial({
    color: 0x0077ff, // Blue color
    roughness: 0.5, // Controls the roughness of the material
    metalness: 0.5, // Controls the metalness of the material
    flatShading: true, // Use flat shading for hard edges
    side: THREE.DoubleSide // Render both sides of each face
});