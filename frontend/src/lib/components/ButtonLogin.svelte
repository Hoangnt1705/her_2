<script>
  import { goto } from "$app/navigation";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { accessToken, user } from "$lib/stores.js";
</script>

<style>
  /* CSS */
  
  .button-22 {
    align-items: center;
    appearance: button;
    background-color: #9659ff; /* More vibrant purple */
    border-radius: 8px;
    border: 2px solid #bba4f0; /* Subtle border for better contrast */
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 6px, rgba(255, 255, 255, 0.2) 0 1px 2px inset;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    flex-direction: row;
    flex-shrink: 0;
    font-size: 100%;
    font-weight: 600; /* Slightly bolder text */
    line-height: 1.15;
    padding: 12px 24px; /* Increased padding for balance */
    text-align: center;
    text-transform: none;
    transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 200px;
  }

  .button-22:active {
    border-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px inset;
  }

  .button-22:hover {
    background-color: #7b47d3; /* Darker purple on hover */
    box-shadow: rgba(0, 0, 0, 0.15) 0 6px 8px, rgba(255, 255, 255, 0.2) 0 2px 4px inset;
  }

  p {
    line-height: 20px !important;
    padding: 3px 0;
  }
</style>

  <button
    class="button-22"
    on:click={() => window.location.href = '/account/login'}>
    Sign in
  </button>
