<script lang="ts">
    import type { Movie } from '$lib/types/Movie.ts';

    let { data }: { data: Movie } = $props();

    console.log(data);
</script>

<h1>Movie Details: {data.body.title}</h1>