<script>
	import { fetchData } from '$lib';
	import { onMount } from 'svelte';

	let data;

	onMount(async () => {
		data = await fetchData();

		console.log(data);
	});
</script>
