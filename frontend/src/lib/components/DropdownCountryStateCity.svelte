<script>
  import { stateObject } from '$lib/utils/dropdownCountryStateCity.js'

  let countries = []
  let states = []
  let districts = []

  let selectedCountry = ''
  let selectedState = ''

  // Mock stateObject for demonstration

  // Load countries on component mount
  $: countries = Object.keys(stateObject)

  // Update states when selectedCountry changes
  $: if (selectedCountry) {
    states = Object.keys(stateObject[selectedCountry])
    selectedState = '' // Reset state selection
    districts = [] // Reset districts
  } else {
    states = []
    districts = []
  }

  // Update districts when selectedState changes
  $: if (selectedState) {
    districts = stateObject[selectedCountry][selectedState]
  } else {
    districts = []
  }
</script>

<!-- Country -->
<div class="relative">
  <select bind:value={selectedCountry} class="outline-none py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
    <option value="" selected>-- Please select Country --</option>
    {#each countries as country}
      <option value={country}>{country}</option>
    {/each}
  </select>
</div>
<!-- State -->
<div class="relative">

  <select bind:value={selectedState} disabled={!selectedCountry} class="outline-none py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
    <option value="" selected>-- Please select state --</option>
    {#each states as state}
      <option value={state}>{state}</option>
    {/each}
  </select>
</div>
<!-- District/City -->
<div class="relative">
  <select disabled={!selectedState} class="outline-none py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
    <option value="" selected>-- Please select district/city --</option>
    {#each districts as district}
      <option value={district}>{district}</option>
    {/each}
  </select>
</div>


<!-- End Floating Select -->
<style>
    select {
  appearance: none;
  cursor:pointer;

}

/* For IE10+ */
select::-ms-expand {
  display: none;
}
</style>