<script>
import {
    slide,
    fade,
    fly
} from 'svelte/transition';
import {
    flip
} from 'svelte/animate';
import {
    send,
    receive
} from '$lib/utils/transition.js';

import {
    error
} from '@sveltejs/kit';

import Modal from '$lib/components/Modal.svelte';
import {
    quintOut
} from 'svelte/easing'
import ButtonLogin from '$lib/components/ButtonLogin.svelte';
import {
    accessToken,
    user,
    sidebar,
    historyChat,
    showModal,
    lengthChat
} from '$lib/stores.js'
import {
    spring
} from 'svelte/motion';
import {
    Button,
    Overlay,
    MaterialApp
} from 'svelte-materialify';
import {
    onMount,
    tick,
    beforeUpdate,
    afterUpdate
} from 'svelte';
import {
    svg,
    END_POINT
} from '$lib/constants.js'
import SidebarToggle from '$lib/components/SidebarToggle.svelte'
import UserMenu from '$lib/components/UserMenu.svelte';
import tippy from 'tippy.js';
import axios from 'axios';
import {
    getDataChat,
    parseRecruiterDocument
} from '$lib/context/MainContext.js';
import 'tippy.js/dist/tippy.css';
import {
    goto
} from '$app/navigation'
import {
    page,
    navigating
} from '$app/stores';

// let disabled = true;
let active = !$sidebar;
let pathValue = "M12 17V7";
let rotate = '0deg';
let content = 'Close sidebar';
let openSidebarResponsive = $sidebar;
let editingId = null;
let deleteId = null;
let chatTitleSideBar = null;
let specificButton;
let focusBind;
$: openSidebarResponsive = $sidebar;
$: active = !$sidebar;
$: $sidebar ? content = 'Close sidebar' : content = 'Open sidebar';
$: $sidebar ? rotate = '180deg' : rotate = '0deg';

function handleHover() {
    pathValue = "M12 17L14 12L12 7";
}

function handleOverlay() {
    active = !active;
    sidebar.update(s => s = !s)
}

function handleHoverOut() {
    pathValue = "M12 17V7";
}

function tooltip(node, options) {
    const tooltip = tippy(node, options);

    return {
        update(options) {
            tooltip.setProps(options);
        },
        destroy() {
            tooltip.destroy();
        }
    };
};
let promise;
$: if ($user) promise = getDataChat($user.id);
$: console.log($historyChat)
let activeChatId = null;

// Function to set the active chat ID based on the current URL

let currentPath = $page.url.pathname;
let hasUpdated = false;

function handleClick(chatId, url) {
    activeChatId = chatId;
    goto(url)
}

async function handleEditClick(chatId, title) {
    editingId = chatId;
    chatTitleSideBar = title;
    await tick();
    focusBind.focus();
};

const updateTitleChat = async () => {
    try {
        const response = await axios.put(`${END_POINT}/v1/chat/description-chat-sidebar`, {
            cid: editingId,
            title: chatTitleSideBar
        }, {
            headers: {
                authorization: `Bearer ${$accessToken}`
            }
        });
        const { data } = response.data;
        historyChat.update(chats => {
            const chat = chats.find(chat => chat._id === editingId);
            if (chat) {
                chat.title = chatTitleSideBar;
                chat.updatedAt = new Date(); // Update the timestamp
            }
            return chats;
        });
        editingId = null;
    } catch (err) {
        console.log(err)
        throw error(404);
    }
};

const updateActiveChat = () => {
  // Prevent running the logic if it has already run for the current state
  if (hasUpdated) {
        hasUpdated = false; // Reset for next update cycle
        return;
    }

    const match = currentPath.match(/\/parse-recruiter\/(\w+)/);
    console.log('match', match); // This should now log only once per update cycle

    if (match) {
        activeChatId = match[1];
    }

    hasUpdated = true; // Set the flag to prevent redundant updates
}

beforeUpdate(() => {
    if ($page.url.pathname) {
        currentPath = $page.url.pathname;
    }
});

afterUpdate(async () => {
    await tick();
    updateActiveChat();
});

const handleNewPageClick = async () => {
    await tick();
    getDataChat($user.id, $historyChat.length);
    updateActiveChat();
  }
</script>

<div class="wrap-sidebar">
    <div id="sidebar" class:hidden={!$sidebar} transition:slide={{ duration: 100, quintOut: quintOut }}>
        <div class="float-top">
            <div class="sidebar-controls">
                <button class="new-chat" on:click={() => goto('/')} aria-label="New chat">
                    <i class="fa fa-plus" />
                    New conversation
                </button>
            </div>
            {#await promise}
            <div class="grid gap-3" style="margin-top:290px">
                <div class="flex items-center justify-center">
                    <svg class="animate-spin border-pink-100"
                        xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                        viewBox="0 0 36 36" fill="none">
                        <circle cx="18" cy="18" r="17" stroke="#262626"
                            stroke-width="2" stroke-dasharray="6 6" />
                    </svg>
                </div>
            </div>
            {:then data}
            {#if $historyChat}
            <ul class="conversations h-[600px] max-w-xs flex flex-col overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <!-- animate:flip -->
                {#each $historyChat.filter(chat => chat.deleted === false).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) as chat (chat._id)}
                <li class="inline-flex items-center text-sm font-medium text-gray-800 my-1" out:send={{ key: chat._id }} id="chat-{chat._id}">
                    {#if editingId === chat._id}
                    <input
                        on:blur={ async (event) => {
                            // Check if the blur event target is the specific button
                            if (!event.relatedTarget || event.relatedTarget.tagName !== 'BUTTON' || event.relatedTarget !== specificButton) {
                                await tick();
                                editingId = null;
                            }
                        }}
                        type="text"
                        aria-current={$page.url.pathname === `/parse-recruiter/${chat._id}`}
                        class:active="{activeChatId === chat._id}"

                        class="conversation-button text-left gap-x-2 py-3 px-4 overflow-hidden focus-border-black"
                        data-sveltekit-preload-code
                        bind:value={chatTitleSideBar}
                        on:keydown={async (e) => {
                        if (e.key !== 'Enter') return;
                        updateTitleChat();
                        }}
                        bind:this={focusBind}
                        >
                    {:else}
                    <input
                        style="overflow: hidden"
                        type="button"
                        aria-current={$page.url.pathname === `/parse-recruiter/${chat._id}`}
                        class:active="{activeChatId === chat._id}"
                        data-sveltekit-reload
                        class="conversation-button w-full text-left cursor-pointer gap-x-2 py-3 px-4"
                        on:click={() => handleClick(chat._id, `/parse-recruiter/${chat._id}`)}
                    data-sveltekit-preload-code
                    bind:value={chat.title}
                    >
                    {/if}
                    <div class:fade={activeChatId === chat._id} class="fade-all"></div>
                    <div class:edit-buttons={activeChatId === chat._id} class:ac={activeChatId !== chat._id} class="gap-1">
                        {#if editingId !== chat._id}
                        <button on:click={() => handleEditClick(chat._id, chat.title)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.6711 4.48785L11.4428 9.78833C11.2429 9.99099 11.143 10.0923 11.0761 10.2152L11.0727 10.2215C11.0067 10.3448 10.9772 10.4832 10.9184 10.7599C10.6297 12.1177 10.4853 12.7966 10.8705 13.1765C10.8766 13.1825 10.8827 13.1885 10.889 13.1943C11.2839 13.5644 11.9721 13.4037 13.3486 13.0822C13.6235 13.0181 13.7609 12.986 13.8822 12.9197L13.8839 12.9187C14.0051 12.8521 14.1048 12.7545 14.3042 12.5592L19.6099 7.36337C20.2676 6.71937 20.5964 6.39736 20.6034 5.99372C20.6103 5.59008 20.2928 5.25743 19.6579 4.59212L19.5804 4.51093C18.9033 3.80151 18.5647 3.4468 18.1347 3.44338C17.7047 3.43997 17.3602 3.78926 16.6711 4.48785Z" stroke="black" stroke-width="1.6" class="my-path"></path>
                                <path d="M19.0007 8.00004L16 5" stroke="black" stroke-width="1.6" class="my-path"></path>
                                <path d="M13.5882 3H11C7.22876 3 5.34315 3 4.17157 4.17157C3 5.34315 3 7.22876 3 11V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13V11.4706" stroke="black" stroke-width="1.6" stroke-linecap="round" class="my-path"></path>
                            </svg>
                        </button>
                        <button on:click={() => {
                            showModal.update(s => s = !s);
                            deleteId = chat._id;
                            }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 7L5.29949 14.7868C5.41251 17.7252 5.46902 19.1944 6.40719 20.0972C7.34537 21 8.81543 21 11.7555 21H12.2433C15.1842 21 16.6547 21 17.5928 20.0972C18.531 19.1944 18.5875 17.7252 18.7006 14.7868L19 7" stroke="black" stroke-width="1.6" stroke-linecap="round" class="my-path"></path>
                                <path d="M10 13V16" stroke="black" stroke-width="1.6" stroke-linecap="round" class="my-path"></path>
                                <path d="M14 13V16" stroke="black" stroke-width="1.6" stroke-linecap="round" class="my-path"></path>
                                <path d="M20.4706 4.43329C18.6468 4.27371 17.735 4.19392 16.8229 4.13611C13.6109 3.93249 10.3891 3.93249 7.17707 4.13611C6.26506 4.19392 5.35318 4.27371 3.52942 4.43329" stroke="black" stroke-width="1.6" stroke-linecap="round" class="my-path"></path>
                                <path d="M13.7647 3.95212C13.7647 3.95212 13.3993 2.98339 11.6471 2.9834C9.8949 2.9834 9.52942 3.95211 9.52942 3.95211" stroke="black" stroke-width="1.6" stroke-linecap="round" class="my-path"></path>
                            </svg>
                        </button>
                        {:else}
                        <button on:click={() => updateTitleChat()} bind:this={specificButton}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z" stroke="black" stroke-width="1.6" class="my-path"></path>
                                <path d="M16.6704 9.39893L12.3611 13.7082C11.6945 14.3749 11.3611 14.7082 10.9469 14.7082C10.5327 14.7082 10.1994 14.3749 9.53269 13.7082L8 12.1755" stroke="black" stroke-width="1.6" stroke-linecap="round" class="my-path"></path>
                            </svg>
                        </button>
                        {/if}
                    </div>
                </li>
                {/each}
                {#if $historyChat.length < $lengthChat}
                <div class="flex w-full items-center h-14">
                    <div class="flex-1"></div>
                    <button on:click={() => handleNewPageClick()}
                     class="w-7 h-7 flex items-center justify-center bg-gray-700 rounded-xl shadow-sm border border-gray-700 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="none">
                        <g id="Add">
                          <path id="icon" d="M11 5.5V16.5M16.5 11H5.5" stroke="white" stroke-width="1.6" stroke-linecap="round" />
                        </g>
                      </svg>
                    </button>
                    <div class="flex-1"></div>
                </div>
                {/if}
            </ul>
            {/if}
            {:catch error}
            <p>wrong</p>
            {/await}
        </div>
        {#if $user && $user?.role}
        <div out:send>
            <UserMenu user={$user} accessToken={$accessToken}/>
        </div>
            {:else}
            <ButtonLogin />
            {/if}

            <!-- <li class="inline-flex items-center gap-x-2 py-3 px-4 text-base font-medium text-gray-800 ">
        <button class="conversation-button"><span class="w-2 h-2 inline-block bg-emerald-400 rounded-full mr-1"></span> This is a very super long conversation title that doesn't fit</button>
        <div class="fade"></div>
        <div class="edit-buttons">
          <button><i class="fa fa-edit"></i></button>
          <button><i class="fa fa-trash"></i></button>
        </div>
            </li> -->
            </div>
            {#if !openSidebarResponsive}
            <div on:click={handleOverlay}>
                <button class="open-sidebar-responsive" style="border: #f5f5f5 solid;">
                    {@html svg.openSidebarResponsive}
                </button>
            </div>
            {/if}
            <div class="wrap-open-sidebar-full-screen" style="z-index: 0">
                <div class="open-sidebar-full-screen"
                    on:click={async () => {
                    sidebar.update((s) => s = !s );
                    await tick();
                    active = false;

                    }}
                    on:mouseover={handleHover}
                    on:mouseout={handleHoverOut}
                    use:tooltip={{ content, delay: 300, theme: 'light', placement: 'right', offset: [0, -1]}}>
                    <svg  id="arrow-svg" style="transform: rotate({rotate})" width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Interface / Line_M">
                            <path id="Vector" d={pathValue} stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
        <Overlay {active} on:click={handleOverlay} />
        <Modal chatId={deleteId} accessToken={$accessToken}/>
                                    <!-- <ul class="conversations">
                            <li class="grouping">Yesterday</li>
                            <li>
                                <button class="conversation-button"><i class="fa fa-message fa-regular"></i> This is a very super long conversation title that doesn't fit</button>
                                <div class="fade"></div>
                                <div class="edit-buttons">
                                    <button><i class="fa fa-edit"></i></button>
                                    <button><i class="fa fa-trash"></i></button>
                                </div>
                            </li>

                                    </ul> -->
