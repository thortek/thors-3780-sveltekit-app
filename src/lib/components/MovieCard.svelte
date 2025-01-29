<script lang="ts">
    import type { Movie } from '$lib/types/Movie.ts';

    let { movie } = $props<{ movie: Movie }>();
  
    // Calculate star rating
    const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(movie.rating));
  </script>
  
  <div class="card w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl">
    <div class="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <!-- Movie Poster -->
      <div class="relative aspect-[2/3] w-full">
        <img
          src={movie.poster || "/placeholder.svg"}
          alt="{movie.title} poster"
          class="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
      </div>
  
      <!-- Content -->
      <div class="p-6 flex flex-col gap-4">
        <!-- Header -->
        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tight">
            {movie.title} <span class="text-gray-500 dark:text-gray-400">({movie.year})</span>
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Directed by <span class="font-semibold">{movie.director}</span>
          </p>
        </div>
  
        <!-- Rating -->
        <div class="flex items-center gap-4">
          <div class="flex gap-1">
            {#each stars as star}
              <svg
                class="w-5 h-5 {star ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
              </svg>
            {/each}
          </div>
          <span class="text-sm font-medium">{movie.rating}/5</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">({movie.reviews} reviews)</span>
        </div>
  
        <!-- Metadata -->
        <div class="flex gap-4 text-sm">
          <span class="px-2.5 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100">
            {movie.runtime}
          </span>
          {#each movie.genre as g}
            <span class="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              {g}
            </span>
          {/each}
        </div>
  
        <!-- Plot -->
        <p class="text-gray-700 dark:text-gray-300 line-clamp-3">
          {movie.plot}
        </p>
  
        <!-- Cast -->
        <div class="space-y-2">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">Starring</h3>
          <div class="flex flex-wrap gap-2">
            {#each movie.cast as actor}
              <span class="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm">
                {actor}
              </span>
            {/each}
          </div>
        </div>
  
        <!-- Actions -->
        <div class="flex gap-4 mt-auto">
          <button class="btn">
            Watch Now
          </button>
          <button class="btn variant-soft">
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    /* Add any custom styles here if needed */
  </style>