<script>
  import { showModal } from "$lib/stores.js";
  import axios from "axios";
  import { error } from "@sveltejs/kit";
  import { svg, END_POINT } from "$lib/constants.js";
  import { user, historyChat, lengthChat } from "$lib/stores.js";
  import { goto } from "$app/navigation";
  import {getDataChat} from '$lib/context/MainContext.js';
    import { tick } from "svelte";
  export let accessToken;
  export let chatId;
  const closeModal = () => {
    showModal.update((s) => (s = !s));
  };
  const deleteChat = async (chatId) => {
    try {
      const response = await axios.put(
        `${END_POINT}/v1/chat/description-chat-sidebar/delete`,
        {
          cid: chatId,
        },
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      historyChat.update((chats) => {
        const index = chats.findIndex((chat) => chat._id == chatId);
        if (index !== -1) {
          chats.splice(index, 1);
        }
        return chats;
      });
      lengthChat.update(c => c = c - 1);
      getDataChat($user.id, $historyChat.length, 1)

      console.log("historyChat", response);
      closeModal();
      await tick();
      setTimeout(() => {
        goto('/parse-recruiter');
      }, 200);
    } catch (err) {
      console.log(err);
      throw error(404);
    }
  };
</script>

<style>
  .transition-opacity {
    transition: opacity 0.3s ease-out;
  }
  .transition-all {
    transition: all 0.3s ease-out;
  }
</style>

<!-- src/lib/Modal.svelte -->
{#if $showModal}
  <div
    class="relative modal-css"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true">
    <div class="test11 fixed inset-0 transition-opacity" />
    <div class="fixed inset-0 modal-css w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center
        sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white
          text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center
                justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  class="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948
                    3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949
                    3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12
                    15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div class="mt-3 text-left sm:ml-4 sm:mt-0">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title">
                  Delete account
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed. This action cannot be
                    undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-red-600
              px-3 py-2 text-sm font-semibold text-white shadow-sm
              hover:bg-red-500 sm:ml-3 sm:w-auto"
              on:click={deleteChat(chatId)}
              aria-label="Remove">
              Delete
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white
              px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1
              ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              on:click={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
