<script>
  import '$lib/css/homepage.css'
  import { afterUpdate, onMount, tick } from 'svelte'
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import Typed from 'typed.js'
  import { Skeleton } from 'svelte-loading-skeleton'
  import { browser } from '$app/environment'
  import { goto } from '$app/navigation'

  export let data

  let active = false
  // let activeSlide = 0;
  
  onMount(async () => {
    const typed = new Typed('.typewriter', {
      strings: ['to Cover <br/> Letter A.I'],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1500,
    })
    await tick()
    const video = document.querySelector('.video-slide')

    // Add the preload attribute dynamically
    video.setAttribute('preload', 'auto')

   
  })

  $: pathname = $page.url.pathname
</script>

<main class="main-homepage">
  <header>
    <a href="#" class="brand">Her</a>
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
            Generate customized cover letters effortlessly using our ChatGPT AI
            tool. Simply upload your CV, and our advanced system will create
            tailored cover letters that highlight your qualifications and
            experiences. Improve your chances of landing an interview and save
            time with our intuitive interface. Experience the power of ChatGPT AI
            today!
          </p>
        </div>
        
          <button class="relative inline-block group" on:click={() => window.location.href="/" }>
            <span
              class="relative z-10 px-3.5 py-2 overflow-hidden font-medium leading-tight flex items-centrer justify-center text-red-700 transition-colors duration-300 ease-out border-2 border-red-700 rounded-lg group-hover:text-white">
              <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span
                class="absolute left-0 w-40 h-40 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-red-700 group-hover:-rotate-180 ease"></span>
              <span class="relative text-lg font-semibold">Get Started</span>
            </span>
            <span
              class="absolute bottom-0 right-0 w-full h-9 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-red-700 rounded-lg group-hover:mb-0 group-hover:mr-0 group-hover:mb-2"
              data-rounded="rounded-lg"></span>
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
      <!-- <div class="slider-navigation"> -->
      <!-- {#each [0, 1] as i}
        <div class="nav-btn {activeSlide === i ? 'active' : ''}" on:click={() => sliderNav(i)}></div>
      {/each} -->
      <!-- </div> -->
    </section>
  {/if}
</main>
