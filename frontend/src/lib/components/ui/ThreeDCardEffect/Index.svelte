<script>
  import CardBody from "./CardBody.svelte";
  import CardContainer from "./CardContainer.svelte";
  import CardItem from "./CardItem.svelte";
  import { Application } from "@splinetool/runtime";
  import { onMount, onDestroy, tick } from "svelte";
  import { browser } from "$app/environment";
  import { Skeleton } from "svelte-loading-skeleton";
  import { selectLoginAuthorizationDiaLog } from "$lib/stores.js";
  import { goto, invalidateAll } from "$app/navigation";
  let canvas;
  let isMouseEntered = false;


  const dialogSelectLogin = () => {
    selectLoginAuthorizationDiaLog.update((s) => (s = !s));
  };
  const closeDialog = () => {
    selectLoginAuthorizationDiaLog.update((s) => (s = !s));
  };

  const destroyCanvas = () => {
    canvas = "";
  };

  onMount(async () => {
    invalidateAll();
    try {
      canvas = document.getElementById("canvas3d");
      await tick();
      const app = new Application(canvas);
      await app.load(
        "https://prod.spline.design/0KlpWURw0tIyxS4r/scene.splinecode"
      );
    } catch (error) {
      console.log(error);
    }
  });

  onDestroy(() => {
    destroyCanvas();
  });
</script>

<CardContainer bind:isMouseEntered className="inter-var">
  <CardBody
    className="bg-gray-50 relative group/card
    border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-6 border">

    <CardItem
      {isMouseEntered}
      translateZ="50"
      className="text-xl font-bold text-neutral-600">
      Login with us
    </CardItem>

    <CardItem
      {isMouseEntered}
      translateZ="60"
      className="text-neutral-500 text-sm max-w-sm mt-2">
      Sign in via Google, Facebook, or Linkedin
    </CardItem>

    <CardItem {isMouseEntered} translateZ="100" className="w-full mt-4">
      {#if !browser}
        <!-- skeleton or loader -->
        <Skeleton height="13.5rem" borderRadius="10px" />
      {:else}
        <!-- full ui with data -->
        <canvas
        id="canvas3d"
        class="h-70 w-full rounded-xl object-cover group-hover/card:shadow-xl" />
      {/if}
    </CardItem>

    <div class="mt-20 flex items-center justify-between">
      <div on:click={() => window.location.href = '/homepage'}>
        <CardItem
          {isMouseEntered}
          translateZ={20}
          type="button"
          className="px-4 py-2 rounded-xl text-xs font-normal
          group relative ">
          Back home →
          <span
            class="absolute -bottom-1 left-0 w-0 transition-all h-0.5
            bg-pink-700 group-hover:w-full " />
        </CardItem>
      </div>
      <div on:click={dialogSelectLogin}>
        <CardItem
          {isMouseEntered}
          translateZ={20}
          type="button"
          data-ripple-light="true"
          className="px-4 py-2 rounded-xl bg-black
          text-white text-xs font-bold shadow-md shadow-gray-900/10
          transition-all hover:shadow-lg hover:shadow-gray-900/20
          focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85]
          active:shadow-none disabled:pointer-events-none disabled:opacity-50
          disabled:shadow-none">
          Next
        </CardItem>
      </div>
    </div>
  </CardBody>
</CardContainer>
