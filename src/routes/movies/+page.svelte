<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Slider, Switch } from '@skeletonlabs/skeleton-svelte';

  
	// State using proper Svelte 5 runes syntax
	let yearRange = $state([1970, 2024]);
	let selectedRatings = $state(new Set<string>());
	let scoreRange = $state([0, 10]);
  
	// Constants
	const minYear = 1920;
	const maxYear = 2024;
	const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  
	// Effect for logging state changes
	$effect(() => {
	  console.log({
		yearRange,
		selectedRatings: Array.from(selectedRatings),
		scoreRange
	  });
	});
  
	// Handle rating selection
	function toggleRating(rating: string) {
	  if (selectedRatings.has(rating)) {
		selectedRatings.delete(rating);
	  } else {
		selectedRatings.add(rating);
	  }
	}

	function handleCheckedChange(event: CustomEvent<boolean>) {
		console.log(event.detail);
	}
  </script>
  
  <div class="min-h-screen bg-gradient-to-br from-surface-900 via-tertiary-400 to-primary-900">
	<div class="container mx-auto px-4 py-12">
	  <div class="card">
		<header class="text-center mb-8">
		  <h1 class="h1 font-bold bg-gradient-to-r from-primary-200 to-tertiary-200 rounded-lg p-2">
			🎬 Movie Discovery
		  </h1>
		</header>
  
		<!-- Year Range Section -->
		<section class="mb-12" in:fly={{ y: 20, delay: 150 }}>
		  <h2 class="h2 mb-4">Release Year Range</h2>
		  <div class="px-4">
			<div class="flex justify-between mb-2">
			  <span class="text-surface-200">{yearRange[0]}</span>
			  <span class="text-surface-200">{yearRange[1]}</span>
			</div>
			<Slider
			  bind:value={yearRange}
			  min={minYear}
			  max={maxYear}
			  step={1}
			/>
		  </div>
		</section>
  
		<!-- Ratings Section -->
		<section class="mb-12" in:fly={{ y: 20, delay: 300 }}>
		  <h2 class="h2 mb-4">Movie Ratings</h2>
		  <div class="flex flex-wrap gap-4">
			{#each ratings as rating}
			<Switch name="ratingSwitch">
				{rating}
			</Switch>
<!-- 			  <button color={selectedRatings.has(rating) ? 'tertiary' : 'surface'}
				onclick={() => toggleRating(rating)}
			  >
				{rating}
			  </button> -->
			{/each}
		  </div>
		</section>
  
		<!-- Critic Score Section -->
		<section class="mb-12" in:fly={{ y: 20, delay: 450 }}>
		  <h2 class="h2 mb-4">Critic Score Range</h2>
		  <div class="px-4">
			<div class="flex justify-between mb-2">
			  <span class="text-surface-200">{scoreRange[0]}%</span>
			  <span class="text-surface-200">{scoreRange[1]}%</span>
			</div>
			<Slider
			  bind:value={scoreRange}
			  min={0}
			  max={100}
			  step={1}
			/>
		  </div>
		</section>
  
		<!-- Search Button -->
		<div class="text-center" in:fly={{ y: 20, delay: 600 }}>
		  <div class="btn preset-filled bg-primary-50 rounded-full font-semibold"
		  >
			Find Movies 🍿
		</div>
		</div>
	</div>
	</div>
  </div>