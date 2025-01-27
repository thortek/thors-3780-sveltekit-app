<script lang="ts">
	import type { PageData } from './$types';
	import Movie from '$lib/components/Movie.svelte'

	let { data }: { data: PageData } = $props();

	console.log(data?.body?.length);
</script>

<div class="flex flex-wrap">
	{#if data.body}
		{#if data.body.length > 0}
			{#each data.body as movie}
			<a href={`/movies/${movie.id}`}>
				<Movie {...movie} />
			</a>
			{/each}
		{:else}
			<p>There are {data.body.length} movies available</p>
		{/if}
	{:else}
		<li>No data returned from server</li>
	{/if}
</div>
