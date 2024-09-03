<script>
  import { goto } from "$app/navigation";
  import {onMount} from 'svelte';

</script>

<style>
  .container-homepage {
    background-color: #d2d2d2;
    background-image: repeating-linear-gradient(
        to right,
        transparent 0 100px,
        #25283b22 100px 101px
      ),
      repeating-linear-gradient(
        to bottom,
        transparent 0 100px,
        #25283b22 100px 101px
      );
  }

  .container-homepage::before {
    position: absolute;
    width: min(1400px, 90vw);
    top: 10%;
    left: 50%;
    height: 90%;
    transform: translateX(-50%);
    content: "";
    /* background-image: url(images/bg.png); */
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: top center;
    pointer-events: none;
  }
  .banner {
    width: 100%;
    height: 100vh;
    text-align: center;
    overflow: hidden;
    position: relative;
  }
  .banner .slider {
    position: absolute;
    width: 200px;
    height: 250px;
    top: 10%;
    left: calc(50% - 100px);
    transform-style: preserve-3d;
    transform: perspective(1000px);
    animation: autoRun 20s linear infinite;
    z-index: 2;
  }
  @keyframes autoRun {
    from {
      transform: perspective(1000px) rotateX(-16deg) rotateY(0deg);
    }
    to {
      transform: perspective(1000px) rotateX(-16deg) rotateY(360deg);
    }
  }

  .banner .slider .item {
    position: absolute;
    inset: 0 0 0 0;
    transform: rotateY(
        calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
      )
      translateZ(550px);
  }
  .banner .slider .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .banner .content {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: min(1400px, 100vw);
    height: max-content;
    padding-bottom: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
  }
  .banner .content h1 {
    font-family: "ICA Rubrik";
    font-size: 16em;
    line-height: 1em;
    color: #9d174d;
    position: relative;
  }
  .banner .content h1::after {
    position: absolute;
    inset: 0 0 0 0;
    content: attr(data-content);
    z-index: 2;
    -webkit-text-stroke: 2px #d2d2d2;
    color: transparent;
  }
  .banner .content .author {
    font-family: Poppins;
    text-align: right;
    max-width: 200px;
    z-index: 3;
  }
  .banner .content h2 {
    font-size: 3em;
  }
  .banner .content h2 .logo-brand {
    display: inline;
    margin-right: -20px;
    transform: translateY(-3px);
  }

  .banner .content .model {
    width: 100%;
    height: 75vh;
    position: absolute;
    bottom: 0;
    left: 0;
    background-size: auto 130%;
    background-repeat: no-repeat;
    background-position: top center;
    z-index: 1;
  }
  /* From Uiverse.io by BHARGAVPATEL1244 */
  .banner .content .btn-get-started {
    outline: none;
    cursor: pointer;
    border: none;
    padding: 0.9rem 1rem;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    position: relative;
    display: inline-block;
    letter-spacing: 0.05rem;
    font-weight: 700;
    font-size: 17px;
    border-radius: 5px;
    overflow: hidden;
    background: #9d174d;
    color: ghostwhite;
    z-index: 3;
  }

  .banner .content .btn-get-started span {
    position: relative;
    z-index: 3;
    transition: color 0.4s;
  }

  .banner .content .btn-get-started:hover span {
    color: black;
  }

  .banner .content .btn-get-started::before,
  .banner .content .btn-get-started::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .banner .content .btn-get-started::before {
    content: "";
    background: #000;
    width: 120%;
    left: -10%;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
  }

  .banner .content .btn-get-started:hover::before {
    transform: translate3d(100%, 0, 0);
  }
  .copy-right {
    text-align: right;
    margin-bottom: -185px;
    margin-right: 30px;
    z-index: 3;
  }
  @media screen and (max-width: 1023px) {
    .copy-right {
      text-align: center;
      z-index: 5;
      margin-right: 0;
    }
    .banner .slider {
      width: 160px;
      height: 200px;
      left: calc(50% - 80px);
    }
    .banner .slider .item {
      transform: rotateY(
          calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
        )
        translateZ(300px);
    }
    .banner .content h1 {
      text-align: center;
      width: 100%;
      text-shadow: 0 10px 20px #000;
      font-size: 7em;
    }
    .banner .content .author {
      color: #fff;
      padding: 20px;
      text-shadow: 0 10px 20px #000;
      z-index: 2;
      max-width: unset;
      width: 100%;
      text-align: center;
      padding: 0 30px;
    }
    .banner .content h2 {
      margin-right: 15px;
    }
    .banner .content h2 .logo-brand {
      fill: #fff;
    }
    .banner .content .btn-get-started {
      color: #000;
    }
    .banner .content .btn-get-started::before {
      background: ghostwhite;
    }
    .banner .content .btn-get-started:hover span {
      color: ghostwhite;
    }
  }
  @media screen and (max-width: 767px) {
    .banner .slider {
      width: 100px;
      height: 150px;
      left: calc(50% - 50px);
    }
    .banner .slider .item {
      transform: rotateY(
          calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)
        )
        translateZ(180px);
    }
    .banner .content h1 {
      font-size: 5em;
    }
  }
</style>

<div class="container-homepage">

  <div class="banner">
    <div class="slider" style="--quantity: 10">
      <div class="item" style="--position: 1">
        <img src="images/resume_1.jpg" alt="" />
      </div>
      <div class="item" style="--position: 2">
        <img src="images/resume_2.jpg" alt="" />
      </div>
      <div class="item" style="--position: 3">
        <img src="images/resume_3.jpg" alt="" />
      </div>
      <div class="item" style="--position: 4">
        <img src="images/resume_4.jpg" alt="" />
      </div>
      <div class="item" style="--position: 5">
        <img src="images/resume_5.jpg" alt="" />
      </div>
      <div class="item" style="--position: 6">
        <img src="images/resume_6.jpg" alt="" />
      </div>
      <div class="item" style="--position: 7">
        <img src="images/resume_7.jpg" alt="" />
      </div>
      <div class="item" style="--position: 8">
        <img src="images/resume_8.jpg" alt="" />
      </div>
      <div class="item" style="--position: 9">
        <img src="images/resume_9.jpg" alt="" />
      </div>
      <div class="item" style="--position: 10">
        <img src="images/resume_10.jpg" alt="" />
      </div>
    </div>
    <div class="content">
      <h1 data-content="Resume AI">Resume AI</h1>
      <div class="author">
        <h2 class="font-bold">
          <svg
            class="logo-brand"
            version="1.1"
            viewBox="0 0 1024 1024"
            width="70"
            height="70"
            xmlns="http://www.w3.org/2000/svg">
            <path
              transform="translate(202,225)"
              d="m0 0h18l23 2 25 5 20 6 25 10 23 11 16 10 20 14 16 13 20 18 12
              12 9 11 10 13 9 14 7 14 3 14 8 16 5 7 1 4v34l-5-1-12-3h-13l-9 2-11
              6-3 3-4-1-24-24-7-8-25-25-1-4 7-14 2-7
              1-16-2-12-5-12-7-10-8-8-14-8-11-3h-22l-13 4-10 5-8 7-9 13-5 12-1
              5v21l3 12 7 12 8 9 10 7 8 4 13 3h18l15-4 4 1 62 62 3 4v19l4 11 6 9
              5 5 8 6 11 4 16 2-6 7-35 35-6 7-3 2-7-1-8-2-17-1-13 2-12 5-11 8-8
              10-8 16-2 5-4 3h-56l-1-5 5-20 7-16 8-14 8-10 9-10 11-10 15-10 15-8
              23-8-13-3-19-4-21-7-13-6-15-8-14-10-15-13-12-13-11-15-12-21-10-25-5-17-4-21-2-21v-109l2-5
              2-2z" />
            <path
              transform="translate(802,225)"
              d="m0 0h19l6 2 3 4v113l-2 21-5 24-8 24-10 21-10 16-10 13-12 13-11
              10-11 8-13 8-16 8-16 6-18 5-24 5 25 9 17 9 12 9 10 9 9 9 10 14 8
              14 7 19 3 12v7h-58l-3-2-7-17-8-11-7-7-14-8-10-3-8-1h-10l-15 3-7
              1-42-42-7-8v-1l19-3 12-6 9-8 7-12 2-8 1-19 11-12 43-43 1-2h2l2-4
              7-6 18 4h17l16-4 10-6 10-9 8-11 5-14
              1-7v-14l-3-13-8-14-9-10-13-8-9-3-5-1h-24l-14 5-12 8-8 9-8 16-3 16
              1 13 4 13 5 10-1 4-19 19-7 8-31 31-5-2-9-6-11-3h-14l-12 3-5
              1v-37l9-13 4-8 4-15 3-9 9-15 8-11 9-11 9-10 7-8 9-9 8-7 14-12 11-8
              24-16 18-10 23-10 22-8 23-6 23-4z" />
            <path
              transform="translate(551,652)"
              d="m0 0h34l2 2 4 15 5 10 9 10 8 7 14 7 11 2h15l14-3 11-6 7-6h2l2-4
              7-9 6-11 3-2h60l1 3-2 17-5 18-6 14-8 13-8 10-10 10-14 10-16 7-13
              4-13 2h-23l-20-4-16-6-16-9-11-9-13-13-9-13-8-15-4-14-1-7v-29z" />
            <path
              transform="translate(436,652)"
              d="m0 0h36v29l-3 15-6 15-6 10-10 13-12 12-13 9-17 9-15 5-17
              3h-24l-15-3-17-6-14-8-11-9-7-7-10-13-10-19-6-19-3-20 1-4h59l5 4 8
              14 9 10 11 7 12 5 7 1h17l12-3 12-6 10-9 6-7 6-12 4-15z" />
            <path
              transform="translate(500,430)"
              d="m0 0h23l1 3v309l-1 1h-23l-2-3v-306z" />
            <path
              transform="translate(616,187)"
              d="m0 0h31l17 3 2 1-2 4-8 10-8 17-6 16-6 10-9 10-9 7-12 6-11 3-7
              1h-9l1-5 8-16 9-14 11-13 7-6 1-2-28 8-20 7-10 4h-2l3-11 6-11 11-12
              10-7 13-6z" />
            <path
              transform="translate(374,187)"
              d="m0 0h32l15 3 14 6 11 8 9 9 8 14 3 11-9-3-40-13-11-3 7 8 8 8 10
              14 9 17 2 5v4l-15-1-16-5-12-7-12-12-9-16-7-19-7-13-8-10 2-2z" />
            <path
              transform="translate(506,768)"
              d="m0 0h11l10 3 9 7 6 8 3 8v16l-4 10-7 8-10 6-7
              2h-14l-12-5-9-9-4-8-2-9 1-11 4-10 8-9 6-4z" />
            <path
              transform="translate(639,614)"
              d="m0 0h13l9 3 8 6 6 7 4 12v9l-3 9-6 9-10 7-9
              3h-11l-10-3-9-7-6-10-2-6v-13l4-10 6-8 9-6z" />
            <path
              transform="translate(369,614)"
              d="m0 0h14l10 4 10 9 5 9 1 4v12l-4 11-9 10-10 5-4
              1h-12l-11-4-9-8-5-9-2-7v-8l3-10 5-8 8-7z" />
            <path
              transform="translate(707,333)"
              d="m0 0h10l10 3 8 6 6 7 3 7 1 11-2 9-5 8-5 5-5 4-8
              3h-16l-9-4-8-7-5-8-2-9 1-12 5-10 4-5 10-6z" />
            <path
              transform="translate(305,333)"
              d="m0 0h10l10 3 8 6 6 8 3 7v15l-4 10-4 5-9 6-8
              3h-15l-9-4-8-7-5-8-2-7v-10l4-11 7-9 9-5z" />
            <path
              transform="translate(504,343)"
              d="m0 0h14l10 4 8 7 5 10 1 4v10l-4 10-6 8-10 6-13
              2-9-2-10-6-6-7-4-11v-8l2-9 5-8 7-6z" />
            <path
              transform="translate(442,242)"
              d="m0 0 8 1 16 8 11 8 9 9 9 14 5 14 2 10v10l-5 3-11
              4h-4l-4-20-5-12-9-13-10-9-17-11 1-6z" />
            <path
              transform="translate(575,242)"
              d="m0 0h4l5 12 1 4-17 11-10 9-7 9-7 15-3 14-1
              7-6-1-12-4-2-2v-11l4-16 8-16 11-12 8-7 14-8z" />
            <path
              transform="translate(550,563)"
              d="m0 0 4 2 26 26 7 8 9 9 1 4-6 12h-40l-1-1z" />
            <path
              transform="translate(470,564)"
              d="m0 0h2v60h-41l-6-11 2-5 9-10z" />
            <path
              transform="translate(567,474)"
              d="m0 0h9l10 4 5 6 2 4v13l-5 8-5 4-7 3h-9l-10-5-5-8-1-4v-8l3-8
              8-7z" />
            <path
              transform="translate(446,474)"
              d="m0 0h8l8 3 7 7 2 6v11l-5 8-6 5-7 2h-8l-8-4-6-7-2-6v-7l3-9 5-5
              5-3z" />
          </svg>
          HER
        </h2>
        <p>
          <b>GPT AI Tool</b>
        </p>
        <p>
          Create a resume using AI, and condense the recruitment information
        </p>
        <div style="margin-top:20px">
          <button on:click={() => (goto('/'))}
            data-ripple-light="true"
            class="btn-get-started active:opacity-[0.85]"
            type="button">
            <span>>>> Get Started</span>
          </button>
        </div>
      </div>
      <div class="model" style="background-image: url(images/model.png)"/>
      <div class="copy-right w-full text-xs bottom-0 text-gray-800">
        © 2024 Her. All rights reserved.
      </div>
    </div>
  </div>
</div>

<!-- <script>
  import "$lib/css/homepage.css";
  import { afterUpdate, onMount, tick } from "svelte";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import Typed from "typed.js";
  import { Skeleton } from "svelte-loading-skeleton";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { svg } from "$lib/constants.js";
  import Logo from "$lib/components/Logo.svelte";
  export let data;

  let active = false;
  // let activeSlide = 0;

  onMount(async () => {
    const typed = new Typed(".typewriter", {
      strings: ["to her.ai"],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1500,
    });
    await tick();
    const video = document.querySelector(".video-slide");

    // Add the preload attribute dynamically
    video.setAttribute("preload", "auto");
  });

  $: pathname = $page.url.pathname;
</script><main class="main-homepage">
  <header>
    <a href="#" class="brand svg-brand">
      <Logo
        width={250}
        height={50}
        content={'her'}
        color={'#fff'}
        hoverColor={'#e50914'} />
    </a>
    <div class="menu-btn" class:active on:click={() => (active = !active)} />
    <div class="navigation" class:active>
      <div class="navigation-items">
        {#each data.navigation as { title, url }}
          <a
            rel={url.match('http') ? 'noopener noreferrer' : ''}
            data-sveltekit-prefetch={url.match('http') ? null : true}
            class:active={url !== '/homepage' ? pathname.match(url) : url === pathname}
            href="{base}{url}"
            data-sveltekit-preload-data>
            {title}
          </a>
        {/each}
      </div>
    </div>
  </header>
  {#if !browser}
    <Skeleton width="100%" height="100%" />
  {:else}
    <section class="home section-h-page">
      {@html data.video_slide}
      <div class="content active" style="position:relative">
        <div class="wrap-header-content" style="position:relative">
          <h1>
            Welcome
            <br />
            <span class="typewriter" />
          </h1>
        </div>
        <div class="message" style="width: 70%">
          <p>
            At her.ai, we use advanced AI technology to craft professional,
            standout resumes tailored to your career goals. Save time and get
            noticed with our personalized templates and smart content
            suggestions. Start building your perfect resume today!
          </p>
        </div>

        <button
          class="relative inline-block group"
          on:click={() => (window.location.href = '/')}>
          <span
            class="relative z-10 px-3.5 py-2 overflow-hidden font-medium
            leading-tight flex items-centrer justify-center text-red-700
            transition-colors duration-300 ease-out border-2 border-red-700
            rounded-lg group-hover:text-white">
            <span
              class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg
              bg-gray-50" />
            <span
              class="absolute left-0 w-40 h-40 -ml-2 transition-all duration-300
              origin-top-right -rotate-90 -translate-x-full translate-y-12
              bg-red-700 group-hover:-rotate-180 ease" />
            <span class="relative text-lg font-semibold">Get Started</span>
          </span>
          <span
            class="absolute bottom-0 right-0 w-full h-9 -mb-1 -mr-1
            transition-all duration-200 ease-linear bg-red-700 rounded-lg
            group-hover:mb-0 group-hover:mr-0 group-hover:mb-2"
            data-rounded="rounded-lg" />
        </button>
      </div>
      <div class="media-icons">
        {#each data.icons as { title, url }}
          <a href={url} data-sveltekit-preload-data>
            <i class={title} />
          </a>
        {/each}
      </div>

      {@html data.copyRight}
      <div class="slider-navigation">
      {#each [0, 1] as i}
        <div class="nav-btn {activeSlide === i ? 'active' : ''}" on:click={() => sliderNav(i)}></div>
      {/each}
      </div>
    </section>
  {/if}
</main> -->
