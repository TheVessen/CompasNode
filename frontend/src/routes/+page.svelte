<script lang="ts">
	import { BaseAPI, PointAPI, VectorAPI, MeshAPI, LineAPI } from '$lib/index';
	import { onMount } from 'svelte';
	import { initThree } from '$lib/three-initalizer';

	let canvas: HTMLCanvasElement;

	onMount(async () => {
		BaseAPI.host = import.meta.env.VITE_API_URL;
		BaseAPI.logging = false;

		const point = await PointAPI.createPoint({ x: 20, y: 20, z: 6 });
		const point12 = await PointAPI.createPoint({ x: 34, y: 34, z: 34 });

		console.log(point);
		const point2 = await PointAPI.distanceToPoint(point, point12);
		console.log(point2);
		// const point2 = await VectorAPI.createVector({ x: 0, y: 500, z: 0 });
		// const v = await VectorAPI.createVector({ x: 0, y: 0, z: 500 });
		// const line = await LineAPI.createLineFromPoints(point, point2);
		// const mesh = await MeshAPI.createMeshFromExtrusion(v, line);

		let { camera, controls, scene } = initThree(canvas);
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
