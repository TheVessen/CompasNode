<script lang="ts">
	import { PointAPI, GeometryAPI, MeshAPI } from '$lib/index';
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { initThree } from '$lib/three-initalizer';

	let canvas: HTMLCanvasElement;

	onMount(async () => {
		const point = await PointAPI.createPoint({ x: 0, y: 0, z: 0 });
		const point2 = await GeometryAPI.createVector({ x: 500, y: 500, z: 0 });
		const v = await GeometryAPI.createVector({ x: 0, y: 0, z: 400 });
		const line = await GeometryAPI.createLineFromPoints(point, point2);
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
