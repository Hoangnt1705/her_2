<script>
import {
    fade
} from 'svelte/transition'
import {
    onMount,
    beforeUpdate,
    afterUpdate,
    tick
} from 'svelte'
import {
    fly,
    slide
} from 'svelte/transition';

import {
    user
} from '$lib/stores.js';
import CollapseChat from '$lib/components/CollapseChat.svelte';
import {
    statusSend
} from '$lib/stores.js';
import {
    send,
    receive
} from '$lib/utils/transition.js';
import { currencyFormat } from '$lib/constants.js';
export let data;

let countStaticPR = 0
// const handleStaticPR = () => {
//   if (countStaticPR <= doc.receiver.data.length - 1) {
//     doc.receiver.data[countStaticPR].state = true
//     setTimeout(handleStaticPR, 200)
//   }
//   countStaticPR++
// }
function renameKey(obj, oldKey, newKey) {
    let o;
    for (let i = 0; i < obj.length; i++) {
        o = obj[i].receiver.data;
        if (o && o.hasOwnProperty(oldKey)) {
            o[newKey] = o[oldKey]
            delete o[oldKey]
        }
    }
}
let arrayRename = [{
        old: 'salary_max',
        new: 'salary max'
    },
    {
        old: 'salary_min',
        new: 'salary min'
    },
    {
        old: 'is_remote',
        new: 'is remote'
    },
    {
        old: 'next_step',
        new: 'next step'
    },
    {
        old: 'role_name',
        new: 'role name'
    },
]
$: for (let i = 0; i < arrayRename.length; i++) {
    renameKey(data, arrayRename[i].old, arrayRename[i].new)
}

// $: handleStaticPR();
onMount(() => {
    // handleStaticPR();

})
$: if ($statusSend) {
    scrollTo();
    statusSend.set(null);
}

const scrollTo = async () => {
    await tick(); // Ensure DOM updates are complete
    let element = document.getElementById(`sender-${data[0]._id}`);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
    await tick();
    element = null;
}

</script>

<style>
    .ok1{
        line-break: auto;
    }

</style>
<!-- Chat Bubble -->
<ul class="space-y-5" style="scroll-behavior: smooth;">
    {#each data as doc (doc._id)}
    <!-- Chat -->
    <li class="max-w-lg flex gap-x-2 sm:gap-x-4 me-11" id="sender-{doc._id}" out:send={{ key: doc._id }}>
        <img class="inline-block size-9 rounded-full" src={$user.role.avatarUrl} alt="Sender Avatar">
        <div>
            <!-- Card -->
            <div class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                <div class="space-y-1.5">
                    <p class="mb-1.5 text-sm text-gray-800 dark:text-white">
                        <!--  -->
                        <CollapseChat sender={doc.sender}/> <!-- I previously put the source code into this component -->
                        <!--  how to handle with <CollapseChat/> -->
                    </p>
                </div>
            </div>
            <!-- End Card -->
            {#if $statusSend === 404}
            <span class="mt-1.5 flex items-center gap-x-1 text-xs text-red-500">
                <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" x2="12" y1="8" y2="12"></line>
                    <line x1="12" x2="12.01" y1="16" y2="16"></line>
                </svg>
                Not sent
            </span>
            {:else}
            <span class="mt-1.5 flex items-center gap-x-1 text-xs text-gray-500 dark:text-neutral-500">
                <svg class="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 7 17l-5-5"></path>
                    <path d="m22 10-7.5 7.5L13 16"></path>
                </svg>
                Sent
            </span>
            {/if}
        </div>
    </li>
    <!-- End Chat -->

    <!-- Chat -->
    <!-- in:fly={{ y: 100, duration:1000 }} -->
    <li class="flex ms-auto gap-x-2 sm:gap-x-4" out:send={{ key: doc._id }} >
        {#if doc.receiver.data}

        <div class="flex-col justify-center items-center w-[100%]">
            <div
                class="relative flex flex-col items-center rounded-[20px] mx-auto bg-white
                bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-slate-50
                dark:text-white dark:!shadow-none p-3">
                <div class="mt-2 mb-8 w-full text-center">
                    <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-navy-700">
                        {doc.receiver.data.recruiter}
                    </h4>
                </div>
                <div class="w-full columns-3 md:columns-3 xl:columns-4 gap-3 ">
                    {#each Object.entries(doc.receiver.data) as [key, value]}
                    {#if key !== 'recruiter' && key !== "unit_of_time_for_position_experience"
                    && key !=="title" && key !== "unit_of_time_for_holidays" && key !== "currency_format"}
                    <div class=" break-inside-avoid mb-4">
                        <div
                            transition:fade
                            class="flex flex-col items-start justify-center rounded-2xl
                            bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500
                            dark:shadow-none text-left bg-gray-50">
                            <p class="text-sm text-gray-600 relative ok1 max-w-[200px]" style="color: #a3aed0 !important">{key}</p>
                            <p class="text-base font-medium text-navy-700 relative  max-w-[200px]">
                                {#if value === null}
                                No
                                {:else if value === false}
                                No
                                {:else if key === "salary min" || key === "salary max"}
                                    {#each Object.entries(doc.receiver.data) as [additionalKey, additionalValue]}
                                        {#if additionalKey === "currency_format"}
                                            {#if additionalValue === "VND"}
                                            {currencyFormat("vi-VN", additionalValue, value)}
                                            {:else if additionalValue === "USD"}
                                            {currencyFormat("en-US", additionalValue, value)}
                                            {:else}
                                            {value} {additionalValue}
                                            {/if}
                                        {/if}
                                    {/each}
                                {:else}
                                {value}
                                {#if key === "experience"}
                                    {#each Object.entries(doc.receiver.data) as [additionalKey, additionalValue]}
                                    {#if additionalKey === "unit_of_time_for_position_experience"}
                                    {#if value === 1}
                                    {additionalValue}
                                    {:else}
                                    {additionalValue}s
                                    {/if}
                                    {/if}
                                    {/each}
                                {:else if key === "holidays"}
                                    {#each Object.entries(doc.receiver.data) as [additionalKey, additionalValue]}
                                    {#if additionalKey === "unit_of_time_for_holidays"}
                                    {#if value === 1}
                                    {additionalValue}
                                    {:else}
                                    {additionalValue}s
                                    {/if}
                                    {/if}
                                    {/each}
                                {/if}
                                {/if}
                            </p>
                        </div>
                    </div>
                    {/if}
                    {/each}
                </div>
            </div>
        </div>
        <!-- <span class="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
            <span class="text-sm font-medium text-white leading-none">Her</span>
        </span> -->
        {/if}
        {#if !doc.receiver.success && doc.receiver.code === 401}
        <div class="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m15 9-6 6"></path>
                        <path d="m9 9 6 6"></path>
                    </svg>
                </div>
                <div class="ms-4">
                    <h3 class="text-sm font-semibold">
                        A problem has been occurred while submitting your data.
                    </h3>
                    <div class="mt-2 text-sm text-red-700 dark:text-red-400">
                        <ul class="list-disc space-y-1 ps-5">
                            <li>
                                {doc.receiver.message?.error ? doc.receiver.message?.error : 'Please try again'}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- <span class="flex-shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
          <span class="text-sm font-medium text-white leading-none">Her</span>
        </span> -->
        {/if}
    </li>
    <!-- End Chat -->
    {/each}
</ul>
<svelte:head>
    <!-- <link
    rel="stylesheet"
    href="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/css/main.ad49aa9b.css" /> -->

    </svelte:head>
