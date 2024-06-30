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
	import { CompasSurface } from '$lib/services/surface-service';
	import { displayLine, displayPolyline } from '$lib/services/line-curve-service';

	let canvas: HTMLCanvasElement;

	onMount(async () => {
		BaseAPI.host = import.meta.env.VITE_API_URL;
		BaseAPI.logging = true;

		const point11 = await PointAPI.createPoint({ x: 0, y: 0, z: 0 });
		const point12 = await PointAPI.createPoint({ x: 200, y: 0, z: 0 });
		const point13 = await PointAPI.createPoint({ x: 200, y: 200, z: 0 });

		const point21 = await PointAPI.createPoint({ x: 0, y: 0, z: 300 });
		const point22 = await PointAPI.createPoint({ x: 200, y: 0, z: 300 });
		const point23 = await PointAPI.createPoint({ x: 200, y: 200, z: 300 });
		const vec = await VectorAPI.createVector({ x: 0, y: 0, z: 100 });
		const line1 = await LineAPI.createLineFromPoints(point11, point12);

		const pointlist = [point11, point12, point13];
		const pointlist2 = [point21, point22, point23];

		//map over the point list and move all points by 200 in z
		// const pointlist = await Promise.all(pointlist.map(async (point) => {

		const polyLine1 = await PolylineAPI.createPolyline(pointlist);
		const polyLine2 = await PolylineAPI.createPolyline(pointlist2);

		SurfaceAPI.loftCurves([polyLine1, polyLine2]);

		const response = await SurfaceAPI.extrudePolyline(polyLine1, vec);
		console.log(response);

		// const simpleSuf = await SurfaceAPI.extrudeLine(line, vec);
		const surface = new CompasSurface(response);

		let { scene } = initThree(canvas);
		displayPolyline(polyLine1, scene);

		scene.add(surface.previewMesh);
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
