<script>
  import { goto } from "$app/navigation";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { accessToken, user } from "$lib/stores.js";

</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap");

  /* CSS */
  .login-wrap {
    font-family: "Roboto Mono", monospace;
  }
  .button-22 {
    align-items: center;
    appearance: button;
    background-color: #22d3ee;
    border-radius: 8px;
    border-style: none;
    box-shadow: rgba(255, 255, 255, 0.26) 0 1px 2px inset;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    flex-direction: row;
    flex-shrink: 0;
    font-size: 100%;
    line-height: 1.15;
    padding: 10px 21px;
    text-align: center;
    text-transform: none;
    transition: color 0.13s ease-in-out, 0.13s ease-in-out,
      opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 200px;
    margin-top: 10px;
  }

  .button-22:active {
    /* background-color: #006AE8; */
    border-color: #fff;
    border: 3px;
  }

  .button-22:hover {
    background-color: #0891b2;
  }
  p {
    line-height: 20px !important;
    padding: 3px 0;
  }
</style>

<div class="login-wrap" style="margin: 22px;">
  <p style="color: #1b254b;font-weight: 500;font-size: 0.675rem;">Login</p>
  <p style="color: #a3aed0;font-size: 0.675rem;">
    Save your chat history, share chats, and personalize your experience.
  </p>
  <button
    class="button-22"
    on:click={() => window.location.href = '/account/login'}>
    Sign in
  </button>
</div>
