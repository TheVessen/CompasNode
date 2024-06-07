import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

const config = {
	preprocess: preprocess({}),

	kit: {
		adapter: adapter(),
		alias: {
			$lib: './src/lib'
		}
		// Include other kit options here
	}
};

export default config;
