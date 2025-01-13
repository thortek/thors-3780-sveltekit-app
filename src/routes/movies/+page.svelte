<script lang="ts">
    import type { PageData } from './$types'

    let { data }: { data: PageData} = $props()

    console.log(data)
</script>

<h1>Movies page</h1>

<ol>
    {#each data?.body ?? [] as movie}
        <li>{movie?._id}</li>
    {/each}
</ol>