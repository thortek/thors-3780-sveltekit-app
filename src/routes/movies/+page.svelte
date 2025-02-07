<script lang="ts">
	import { fade, fly } from 'svelte/transition';
  
	// State using runes
    let yearRange = $state([1970, 2024]);
    let minYear = $state(1920);
    let maxYear = $state(2024);
  
	// State for ratings
	let selectedRatings = $state(new Set<string>());
	const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  
	// State for critic score
	let scoreRange = [0, 100];
  
	// Handle rating selection
	function toggleRating(rating: string) {
	  if (selectedRatings.has(rating)) {
		selectedRatings.delete(rating);
	  } else {
		selectedRatings.add(rating);
	  }
	  selectedRatings = selectedRatings; // trigger reactivity
	}
  
	// Replace reactive statement with effect rune
    $effect(() => {
        console.log({
            yearRange,
            selectedRatings: Array.from(selectedRatings),
            scoreRange
        });
    });
  </script>
  
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-400 to-blue-900">
	<div class="container mx-auto px-4 py-12">
	  <div 
		class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
		in:fade={{ duration: 300 }}
	  >
		<h1 class="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gray-600 to-blue-500 bg-clip-text">
		  🎬 Movie Discovery
		</h1>
  
		<!-- Year Range Section -->
		<section class="mb-12" in:fly={{ y: 20, delay: 150 }}>
		  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Release Year Range</h2>
		  <div class="px-4">
			<div class="flex justify-between mb-2">
			  <span class="text-gray-600">{yearRange[0]}</span>
			  <span class="text-gray-600">{yearRange[1]}</span>
			</div>
			<div class="relative">
			  <input 
				type="range" 
				bind:value={yearRange[0]}
				min={minYear} 
				max={maxYear}
				class="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
			  />
			  <input 
				type="range" 
				bind:value={yearRange[1]}
				min={minYear} 
				max={maxYear}
				class="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
			  />
			  <div class="absolute w-full h-1 bg-gray-200 rounded-full">
				<div 
				  class="absolute h-full bg-blue-500 rounded-full"
				  style="left: {((yearRange[0] - minYear) / (maxYear - minYear)) * 100}%; right: {100 - ((yearRange[1] - minYear) / (maxYear - minYear)) * 100}%"
				></div>
			  </div>
			</div>
		  </div>
		</section>
  
		<!-- Ratings Section -->
		<section class="mb-12" in:fly={{ y: 20, delay: 300 }}>
		  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Movie Ratings</h2>
		  <div class="flex flex-wrap gap-4">
			{#each ratings as rating}
			  <button
				class="px-6 py-3 rounded-full text-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				class:bg-purple-500={selectedRatings.has(rating)}
				class:text-white={selectedRatings.has(rating)}
				class:bg-gray-100={!selectedRatings.has(rating)}
				class:text-gray-700={!selectedRatings.has(rating)}
				onclick={() => toggleRating(rating)}
			  >
				{rating}
			  </button>
			{/each}
		  </div>
		</section>
  
		<!-- Critic Score Section -->
		<section class="mb-12" in:fly={{ y: 20, delay: 450 }}>
		  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Critic Score Range</h2>
		  <div class="px-4">
			<div class="flex justify-between mb-2">
			  <span class="text-gray-600">{scoreRange[0]}%</span>
			  <span class="text-gray-600">{scoreRange[1]}%</span>
			</div>
			<div class="relative">
			  <input 
				type="range" 
				bind:value={scoreRange[0]}
				min={0} 
				max={100}
				class="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
			  />
			  <input 
				type="range" 
				bind:value={scoreRange[1]}
				min={0} 
				max={100}
				class="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
			  />
			  <div class="absolute w-full h-1 bg-gray-200 rounded-full">
				<div 
				  class="absolute h-full bg-green-500 rounded-full"
				  style="left: {scoreRange[0]}%; right: {100 - scoreRange[1]}%"
				></div>
			  </div>
			</div>
		  </div>
		</section>
  
		<!-- Search Button -->
		<div class="text-center" in:fly={{ y: 20, delay: 600 }}>
		  <button
			class="btn bg-gradient-to-r from-gray-600 to-blue-500 text-white px-8 py-2 rounded-full text-lg font-medium shadow-lg"
		  >
			Find Movies 🍿
		  </button>
		</div>
	  </div>
	</div>
  </div>
  
  <style>
	/* Custom styles for range inputs */
	input[type="range"] {
	  height: 1rem;
	}
  
	/* Remove default range input styles */
	input[type="range"]::-webkit-slider-runnable-track {
	  appearance: none;
	  height: 1px;
	}
  </style>
