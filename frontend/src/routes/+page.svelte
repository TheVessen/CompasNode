<script lang="ts">
	import {
		BaseAPI,
		PointAPI,
		VectorAPI,
		MeshAPI,
		LineAPI,
		PolylineAPI,
		SurfaceAPI
	} from '$lib/index';
	import { onMount } from 'svelte';
	import { initThree } from '$lib/three-initalizer';

	let canvas: HTMLCanvasElement;

	onMount(async () => {
		BaseAPI.host = import.meta.env.VITE_API_URL;
		BaseAPI.logging = true;

		const point = await PointAPI.createPoint({ x: 0, y: 0, z: 0 });
		const point12 = await PointAPI.createPoint({ x: 200, y: 0, z: 0 });
		const point3 = await PointAPI.createPoint({ x: 200, y: 200, z: 0 });

		const vec = await VectorAPI.createVector({ x: 0, y: 0, z: 100 });

		const pointlist = [point, point12, point3];

		const point2 = await PolylineAPI.createPolyline(pointlist);
		const mesh = await SurfaceAPI.extrudePolyline(point2, vec);
		console.log(mesh);
		console.log(point2);
		// const point2 = await VectorAPI.createVector({ x: 0, y: 500, z: 0 });
		// const v = await VectorAPI.createVector({ x: 0, y: 0, z: 500 });
		// const line = await LineAPI.createLineFromPoints(point, point2);
		// const mesh = await MeshAPI.createMeshFromExtrusion(v, line);

		let { camera, controls, scene } = initThree(canvas);

		scene.add(mesh);
	});
</script>

<div class="can">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
