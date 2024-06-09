<script lang="ts">
	import { BaseAPI, PointAPI, VectorAPI, MeshAPI, LineAPI } from '$lib/index';
	import { onMount } from 'svelte';
	import { initThree } from '$lib/three-initalizer';

	let canvas: HTMLCanvasElement;

	onMount(async () => {
		BaseAPI.host = import.meta.env.VITE_API_URL;
		BaseAPI.logging = false;

		const point = await PointAPI.createPoint({ x: 0, y: 0, z: 6 });
		const point2 = await VectorAPI.createVector({ x: 500, y: 500, z: 0 });
		const v = await VectorAPI.createVector({ x: 0, y: 0, z: 200 });
		const line = await LineAPI.createLineFromPoints(point, point2);
		const mesh = await MeshAPI.createMeshFromExtrusion(v, line);

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
