<script>
  import '$lib/css/homepage.css'
  import { onMount } from 'svelte'
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import Typed from 'typed.js'

  export let data

  let active = false
  // let activeSlide = 0;

  onMount(() => {
    const typed = new Typed('.typewriter', {
      strings: ['to Cover <br/> Letter A.I'],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1500,
    })
    const video = document.querySelector('.video-slide')

    // Add the preload attribute dynamically
    video.setAttribute('preload', 'auto')

    return () => {
      if (typed) {
        typed.destroy()
      }
    }
  })

  $: pathname = $page.url.pathname
</script>

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
<section class="home">
  {@html data.video_slide}
  <div class="content active">
    <div class="wrap-header-content">
      <h1>
        Welcome
        <br />
        <span class="typewriter" />
      </h1>
    </div>
    <p>
      Generate customized cover letters effortlessly using our ChatGPT AI tool.
      Simply upload your CV, and our advanced system will create tailored cover
      letters that highlight your qualifications and experiences. Improve your
      chances of landing an interview and save time with our intuitive
      interface. Experience the power of ChatGPT AI today!
    </p>
    <a href="/account/login/" data-sveltekit-preload-data>Get started</a>
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
