<script lang="ts">
	import geometry from '$lib/index';
	import { onMount } from 'svelte';

	onMount(async () => {
		const point = await geometry.createPoint(0, 0, 0);
		const vector = await geometry.createVector(0, 0, 10);
		const line = await geometry.createLineDirection(point, vector, 20);
		console.log(line);
	});
</script>
