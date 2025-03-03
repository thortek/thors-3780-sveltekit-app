<script lang="ts">
    import { goto } from '$app/navigation'
    import { browser } from '$app/environment'
    import AirbnbListings from '$lib/components/AirbnbListings.svelte'
    import { Rating } from '@skeletonlabs/skeleton-svelte';

    const { data } = $props<{ data: any }>()
    console.log(data.userProfile)
    if (!data.userProfile && browser) {
        console.log('No user profile')
        goto('/')
    }

    let formVisible = $state(true)
    let starValue = $state(2);
    let listingName = $state('My Listing')

    let selectedListing = $state('')
    
    // Callback function to handle listing selection
    function handleSelectListing(listing: any) {
        selectedListing = listing;
        formVisible = true;
        // Set the listing name for the review form
        if (listing && listing.name) {
            listingName = listing.name;
        }
    }
    
    // Your form submission function
    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        // Your submission logic here
    }
</script>

<AirbnbListings 
    listings={data.airbnbs} 
    onSelectListing={handleSelectListing} 
/>

<!-- Your form that uses the selected listing ID -->
{#if selectedListing && formVisible}
    <form 
        method="POST" 
        action="?/addReview" 
        onsubmit={handleSubmit}
        class="p-4 bg-white shadow-lg rounded-lg max-w-2xl mx-auto mt-8"
    >
        <input type="hidden" name="listingId" value={selectedListing}>
        <input type="hidden" name="username" value={data.userProfile.name} />
        <div>
            <p class="text-2xl">Review of: {listingName}</p>
            <Rating value={starValue} allowHalf onValueChange={(e) => (starValue = e.value)} />
            <label for="review" class="block mt-4 mb-2">Your Review</label>
            <textarea class="textarea w-full" id="review" rows="4" required name="review" placeholder="Write your review here"></textarea>
            <div class="flex justify-end m-2 gap-2">
                <button class="btn preset-filled-secondary-50-950" type="button" onclick={() => formVisible = false}>Cancel</button>
                <button class="btn preset-filled-primary-50-950" type="submit">Submit</button>
            </div>
        </div>
    </form>
{/if}
