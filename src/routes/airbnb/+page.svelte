<script lang="ts">
    import { goto } from '$app/navigation'
    import { browser } from '$app/environment'
	import AirbnbListings from '$lib/components/AirbnbListings.svelte'

	const { data } = $props<{ data: any }>()
	console.log(data.userProfile)
    if (!data.userProfile && browser) {
        console.log('No user profile')
        goto('/')
    }
</script>

{#if data.airbnbs}
	<p>Found {data.airbnbs.length} airbnbs</p>
	<AirbnbListings listings={data.airbnbs} />
{/if}
