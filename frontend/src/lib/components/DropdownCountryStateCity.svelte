<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  
  // Mock stateObject (replace this with your actual data or API calls)
  import { stateObject } from '$lib/utils/dropdownCountryStateCity.js'

  
  // Stores
  const countries = writable([]);
  const states = writable([]);
  const districts = writable([]);
  export let valueCountry;
  export let valueState;
  export let valueDistrict;
  // Fetch functions (replace these with actual API calls in a real application)
  async function fetchCountries() {
      return Object.keys(stateObject);
  }
  
  async function fetchStates(country) {
      return Object.keys(stateObject[country] || {});
  }
  
  async function fetchDistricts(country, state) {
      return stateObject[country]?.[state] || [];
  }
  
  // Initialize countries on mount
  onMount(async () => {
      const fetchedCountries = await fetchCountries();
      countries.set(fetchedCountries);
  });
  
  // Update states when valueCountry changes
  $: if (valueCountry) {
      (async () => {
          const fetchedStates = await fetchStates(valueCountry);
          states.set(fetchedStates);
          valueState = '';
          districts.set([]);
      })();
  } else {
      states.set([]);
      districts.set([]);
  }
  
  // Update districts when valueState changes
  $: if (valueState) {
      (async () => {
          const fetchedDistricts = await fetchDistricts(valueCountry, valueState);
          districts.set(fetchedDistricts);
      })();
  } else {
      districts.set([]);
  }
  </script>
  
  <!-- Country -->
  <div class="relative">
      <select bind:value={valueCountry} class="outline-none py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
          <option value="">-- Please select Country --</option>
          {#each $countries as country}
              <option value={country}>{country}</option>
          {/each}
      </select>
  </div>
  
  <!-- State -->
  <div class="relative">
      <select bind:value={valueState} disabled={!valueCountry} class="outline-none py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
          <option value="">-- Please select state --</option>
          {#each $states as state}
              <option value={state}>{state}</option>
          {/each}
      </select>
  </div>
  
  <!-- District/City -->
  <div class="relative">
      <select bind:value={valueDistrict} disabled={!valueState} class="outline-none py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
          <option value="">-- Please select district/city --</option>
          {#each $districts as district}
              <option value={district}>{district}</option>
          {/each}
      </select>
  </div>
  
  <style>
      select {
          appearance: none;
          cursor: pointer;
      }
      /* For IE10+ */
      select::-ms-expand {
          display: none;
      }
  </style>