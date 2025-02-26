<script lang="ts">

    // Use the props rune
    const { listings = [] } = $props<{ listings: any }>();

</script>

<div class="flex w-full flex-wrap justify-center">
    {#each listings as listing}
        <div class="m-4 w-1/4">
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img class="w-full h-56 object-cover object-center" src={listing.images.picture_url} alt={listing.name} />
                <div class="p-4">
                    <h3 class="text-gray-800 text-xl font-medium">{listing.name}</h3>
                    <p class="mt-2 text-gray-600">{listing.summary}</p>
                    <div class="flex justify-between mt-3 items-center">
                        <h4 class="text-xl font-medium text-gray-700">${listing.price}</h4>
                        <button class="px-3 py-1 bg-gray-800 text-white text-xs font-medium uppercase rounded">Book</button>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>