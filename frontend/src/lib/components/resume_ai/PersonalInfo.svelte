<script>
  import '$lib/css/main.css'
  import DropdownCountryStateCity from '$lib/components/DropdownCountryStateCity.svelte'
  import { createEventDispatcher } from 'svelte';
	import { clickOutsideAction } from 'svelte-tel-input/utils';
	import { TelInput, isSelected, normalizedCountries } from 'svelte-tel-input';
	import 'svelte-tel-input/styles/flags.css';
  import Boop from '$lib/components/Boop.svelte';
  import { fade } from 'svelte/transition';
  import {svg} from '$lib/constants.js';
  import QuestionTooltip from '$lib/components/QuestionTooltip.svelte';
  import DatePicker from '$lib/components/resume_ai/DatePicker.svelte';
	export let clickOutside = true;
	export let closeOnClick = true;
	export let disabled = false;
	export let detailedValue = null;
	export let searchPlaceholder = 'Search';
	export let selectedCountry = 'US';
	export let valid = true;
	export let options = {};
  export let fullName;
  export let zipCode;
  export let birthday;
  export let address;
  export let email;
  export let phone;
  export let biography;
  export let alertVisible;
  const dispatch = createEventDispatcher();
	let searchText = '';
	let isOpen = false;
  let isModalOpenGeneralInformation = false;
  const showAlert = () => {
    alertVisible = true;
    setTimeout(() => {
      alertVisible = false;
    }, 1000);
  }
	$: selectedCountryDialCode =
		normalizedCountries.find((el) => el.iso2 === selectedCountry)?.dialCode || null;

	const toggleDropDown = (e) => {
		e?.preventDefault();
		if (disabled) return;
		isOpen = !isOpen;
	};
  
    function toggleModalGeneralInformation() {
        isModalOpenGeneralInformation = !isModalOpenGeneralInformation;
    }

	const closeDropdown = (e) => {
		if (isOpen) {
			e?.preventDefault();
			isOpen = false;
			searchText = '';
		}
	};

	const selectClick = () => {
		if (closeOnClick) closeDropdown();
	};

	const closeOnClickOutside = () => {
		if (clickOutside) {
			closeDropdown();
		}
	};

	const sortCountries = (countries, text) => {
		const normalizedText = text.trim().toLowerCase();
		if (!normalizedText) {
			return countries.sort((a, b) => a.label.localeCompare(b.label));
		}
		return countries.sort((a, b) => {
			const aNameLower = a.name.toLowerCase();
			const bNameLower = b.name.toLowerCase();
			const aStartsWith = aNameLower.startsWith(normalizedText);
			const bStartsWith = bNameLower.startsWith(normalizedText);
			if (aStartsWith && !bStartsWith) return -1;
			if (!aStartsWith && bStartsWith) return 1;
			const aIndex = aNameLower.indexOf(normalizedText);
			const bIndex = bNameLower.indexOf(normalizedText);
			if (aIndex === -1 && bIndex === -1) return a.id.localeCompare(b.id);
			if (aIndex === -1) return 1;
			if (bIndex === -1) return -1;
			const aWeight = aIndex + (aStartsWith ? 0 : 1);
			const bWeight = bIndex + (bStartsWith ? 0 : 1);
			return aWeight - bWeight;
		});
	};

	const handleSelect = (val, e) => {
		if (disabled) return;
		e?.preventDefault();
		if (selectedCountry === undefined || selectedCountry === null || (typeof selectedCountry === typeof val && selectedCountry !== val)) {
			selectedCountry = val;
			onChange(val);
			selectClick();
		} else {
			dispatch('same', { option: val });
			selectClick();
		}
	};

	const onChange = (selectedCountry) => {
		dispatch('change', { option: selectedCountry });
	};
  const saveBio = () => {
    localStorage.setItem('bio', biography);
    isModalOpenGeneralInformation = !isModalOpenGeneralInformation;
    showAlert();
  }

  
  
</script>

<style>
    .fixed {
      position: fixed;
    }
    .hidden {
      display: none;
    }
   
</style>

    <div class="max-w-md space-y-3 wrap-title-personal">
        <h3 class="text-gray-900 text-4xl font-extrabold md:text-3xl lg:text-4xl">
          <span
          class="text-black
          from-[#EECC8C]">
          Personal Information
          
        </span>
          </h3>        <!-- Floating Input -->
        <!-- Full Name Input -->
        <div class="relative">
            <input bind:value={fullName} type="text" id="hs-floating-input-name" class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2 outline-none" placeholder="Full name">
            <label for="hs-floating-input-name" class="absolute top-0 left-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:translate-x-0.5 peer-[&:not(:placeholder-shown)]:-translate-y-1.5 peer-[&:not(:placeholder-shown)]:text-gray-500 dark:peer-[&:not(:placeholder-shown)]:text-neutral-500">Full Name</label>
        </div>

        <!-- Email Input -->
        <div class="relative">
            <input bind:value={email} type="email" id="hs-floating-input-email" class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2 outline-none" placeholder="you@email.com">
            <label for="hs-floating-input-email" class="absolute top-0 left-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:translate-x-0.5 peer-[&:not(:placeholder-shown)]:-translate-y-1.5 peer-[&:not(:placeholder-shown)]:text-gray-500 dark:peer-[&:not(:placeholder-shown)]:text-neutral-500">Email</label>
        </div>

        <!-- Phone Number Input -->
        <div class="flex relative rounded-lg">
            <div class="flex" use:clickOutsideAction={closeOnClickOutside}>
            <button
                id="states-button"
                data-dropdown-toggle="dropdown-states"
                class="relative flex-shrink-0 overflow-hidden whitespace-nowrap inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:outline-none"
                type="button"
                role="combobox"
                aria-controls="dropdown-countries"
                aria-expanded="false"
                aria-haspopup="false"
                on:click={toggleDropDown}
            >
                {#if selectedCountry && selectedCountry !== null}
                <div class="inline-flex items-center text-left">
                    <span class="flag flag-{selectedCountry.toLowerCase()} flex-shrink-0 mr-3" />
                    {#if options.format === 'national'}
                    <span class="text-gray-600">+{selectedCountryDialCode}</span>
                    {/if}
                </div>
                {:else}
                Please select
                {/if}
                <svg
                aria-hidden="true"
                class="ml-1 w-4 h-4 {isOpen ? 'rotate-180' : ''}"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                />
                </svg>
            </button>
            {#if isOpen}
                <div
                id="dropdown-countries"
                class="absolute z-10 max-w-fit bg-white rounded divide-y divide-gray-100 shadow overflow-hidden translate-y-11"
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="bottom"
                aria-orientation="vertical"
                aria-labelledby="country-button"
                tabindex="-1"
                >
                <div class="text-sm text-gray-700 max-h-48 overflow-y-auto" aria-labelledby="countries-button" role="listbox">
                    <input
                    aria-autocomplete="list"
                    type="text"
                    class="px-4 py-2 text-gray-900 focus:outline-none w-full sticky top-0"
                    bind:value={searchText}
                    placeholder={searchPlaceholder}
                    />
                    {#each sortCountries(normalizedCountries, searchText) as country (country.id)}
                    {@const isActive = isSelected(country.iso2, selectedCountry)}
                    <div id="country-{country.iso2}" role="option" aria-selected={isActive}>
                        <button
                        value={country.iso2}
                        type="button"
                        class="inline-flex py-2 px-4 w-full text-sm hover:bg-gray-100 overflow-hidden {isActive ? 'bg-gray-600' : ''}"
                        on:click={(e) => {
                            handleSelect(country.iso2, e);
                        }}
                        >
                        <div class="inline-flex items-center text-left">
                            <span class="flag flag-{country.iso2.toLowerCase()} flex-shrink-0 mr-3" />
                            <span class="mr-2">{country.name}</span>
                            <span class="text-gray-500">+{country.dialCode}</span>
                        </div>
                        </button>
                    </div>
                    {/each}
                </div>
                </div>
            {/if}
            </div>

            <TelInput
            bind:country={selectedCountry}
            bind:detailedValue
            bind:valid
            bind:value={phone}
            {options}
            required
            class="text-sm rounded-r-lg block w-full p-2.5 py-4 focus:outline-none border border-gray-300 border-l-gray-100 text-gray-900"
            />
        </div>

        <DatePicker bind:birthday/>
        <!-- <DropdownCountryStateCity bind:valueCountry={country} bind:valueState={state} bind:valueDistrict={city}/> -->
 
        <!-- Address Input -->
        <div class="relative">
            <input bind:value={address} type="text" id="hs-floating-input-address" class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500  focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2 outline-none" placeholder="Address">
            <label for="hs-floating-input-address" class="absolute top-0 left-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:translate-x-0.5 peer-[&:not(:placeholder-shown)]:-translate-y-1.5 peer-[&:not(:placeholder-shown)]:text-gray-500 dark:peer-[&:not(:placeholder-shown)]:text-neutral-500">Address

            </label>
        </div>
        <!-- zip code -->
        <div class="relative">
            <input 
            bind:value={zipCode}
            type="text" 
            id="hs-floating-input-name" 
            class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500  focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2 outline-none"
            placeholder="Zip code" 
            pattern="[0-9]*" 
            inputmode="numeric"
            oninput="this.value = this.value.replace(/[^0-9]/g, '');"
            >
            <label for="hs-floating-input-name" class="absolute top-0 left-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:translate-x-0.5 peer-[&:not(:placeholder-shown)]:-translate-y-1.5 peer-[&:not(:placeholder-shown)]:text-gray-500 dark:peer-[&:not(:placeholder-shown)]:text-neutral-500">Zip code (Optional)</label>
        </div>
        <div class="relative">
            <div class="flex">
                <button type="button" class="py-3 px-4 gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-50 hover:bg-slate-100 disabled:opacity-50 disabled:pointer-events-none" on:click={toggleModalGeneralInformation}>
                    Biography
                </button>
                <Boop rotation={20} timing={50}>
                  <QuestionTooltip  information='Entering a personal biography is required to proceed to the next step of creating a resume.'/>
                </Boop>
                {#if biography}
                <div class="inline-flex flex-wrap gap-2 items-center pl-2">
                  <div>
                    <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-slate-900 text-white rounded-full">
                      <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      Saved
                    </span>
                  </div>
                </div>
                {/if}
            </div>
          
              {#if isModalOpenGeneralInformation}
              <div transition:fade={{duration:100}} id="hs-full-screen-modal" class="hs-overlay size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto {isModalOpenGeneralInformation ? '' : 'hidden'}">
                <div class="hs-overlay-open:mt-0 transition-all max-w-full max-h-full h-full">
                  <div class="flex flex-col bg-white pointer-events-auto max-w-full max-h-full h-full dark:bg-neutral-800">
                    <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                      <h3 class="font-bold text-gray-800 dark:text-white">
                        Biography
                      </h3>
                      <button type="button" class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700" on:click={toggleModalGeneralInformation}>
                        <span class="sr-only">Close</span>
                        <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                    </div>
                   
                    <div class="p-4 overflow-y-auto">
                      <p class="flex items-center mt-1 text-gray-800 dark:text-neutral-400 text-left">
                        <svg width="7" height="7" class="mr-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                        </svg> Please enter your personal profile, including education, experience, skills, leadership abilities, and additional Information...
                      </p>
                      <p class="flex items-center mt-1 text-gray-800 dark:text-neutral-400 text-left py-2">
                        <svg width="7" height="7" class="mr-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                        </svg> You have the option to present it as a personal introduction paragraph, or you may choose to list the information instead.
                      </p>
                      <div class="max-w-full space-y-3 ">
                        <textarea bind:value={biography} style="resize:none" class="outline-none py-3 px-4 block w-full border border-solid border-red-200 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 textareaScroll" rows="25" placeholder="Text"></textarea>
                      </div>
                    </div>
                    <div class="flex justify-end items-center gap-x-2 py-3 px-4 mt-auto border-t dark:border-neutral-700">
                      <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" on:click={toggleModalGeneralInformation}>
                        Close
                      </button>
                      <button type="button" on:click={saveBio} class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/if}
        </div>
    </div>

<!-- <script>
    import axios from 'axios';
    import { END_POINT } from '$lib/constants.js'

    const downloadFile = async (url, headers, body) => {
      const response = await axios.request({
        method: 'post',
        url,
        data: body,
        headers,
        responseType: 'arraybuffer'
      });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'file.pdf'); // or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    const generatePdf = () => {
      const headers = { 'Content-Type': 'application/json' };
      const body = {
        htmlContent: `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; }
                h1 { color: red; }
              </style>
            </head>
            <body>
              <h1>Welcome to puppeteer-html-pdf</h1>
              <p>This is a sample PDF generated using Puppeteer.</p>
            </body>
          </html>
        `
      };
      
      downloadFile(`${END_POINT}/v1/parse-recruiter/downloadPdfHere`, headers, body).then(() => {
        console.log('PDF generated and downloaded');
      }).catch((err) => {console.log(err)});
    };
  </script>
  
  <button on:click={generatePdf}>Generate PDF</button> -->