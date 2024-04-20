<script>
  import "$lib/css/homepage.css";
  import { onMount } from "svelte";
  import { navigation, icons } from "$lib/home/constants.js";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import Typed from "typed.js";

  let menuActive = false;
  let activeSlide = 0;
  onMount(() => {
    const typed = new Typed(".typewriter", {
      strings: ["to Cover <br/> Letter A.I"],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1500,
    });
    const video = document.querySelector(".video-slide");

    // Add the preload attribute dynamically
    video.setAttribute("preload", "auto");

    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  });
  function toggleMenu() {
    menuActive = !menuActive;
  }
  $: pathname = $page.url.pathname;
</script>

<header>
  <a href="#" class="brand">Her</a>
  <div
    class="menu-btn {menuActive ? 'active' : ''}"
    on:click={toggleMenu}
  ></div>
  <div class="navigation {menuActive ? 'active' : ''}">
    <div class="navigation-items">
      {#each navigation as item}
        <a
          rel={item.url.match("http") ? "noopener noreferrer" : ""}
          data-sveltekit-prefetch={item.url.match("http") ? null : true}
          class:active={item.url !== "/homepage"
            ? pathname.match(item.url)
            : item.url === pathname}
          href="{base}{item.url}">{item.title}</a
        >
      {/each}
    </div>
  </div>
</header>
<section class="home">
  <video class="video-slide active" src="/home/1.mp4" autoplay muted loop
  ></video>
  <div class="content {activeSlide === 0 ? 'active' : ''}">
    <div class="wrap-header-content">
      <h1>Welcome<br /><span class="typewriter"> </span></h1>
    </div>
    <p>
      Generate customized cover letters effortlessly using our ChatGPT AI tool.
      Simply upload your CV, and our advanced system will create tailored cover
      letters that highlight your qualifications and experiences. Improve your
      chances of landing an interview and save time with our intuitive
      interface. Experience the power of ChatGPT AI today!
    </p>
    <a href="/">Get started</a>
  </div>
  <div id="canvas3d"></div>

  <div class="media-icons">
    {#each icons as icon}
      <a href={icon.url}><i class={icon.title}></i></a>
    {/each}
  </div>

  <div class="copy-right">
    <p>Copyright © 2024 Her</p>
  </div>
  <!-- <div class="slider-navigation"> -->
  <!-- {#each [0, 1] as i}
        <div class="nav-btn {activeSlide === i ? 'active' : ''}" on:click={() => sliderNav(i)}></div>
      {/each} -->
  <!-- </div> -->
</section>
