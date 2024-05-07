<script>
  import '$lib/css/main.css';
  import TailwindCSS from '../TailwindCSS.svelte';
  import { getContext, onMount, setContext, tick, onDestroy } from 'svelte'
  import SidebarToggle from '$lib/components/SidebarToggle.svelte'
  import { svg } from '$lib/constants.js'
  import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col,
  } from '@sveltestrap/sveltestrap'
  import { Styles } from '@sveltestrap/sveltestrap'
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer" />
  <script
    src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js">

  </script>
</svelte:head>

<TailwindCSS />

<main class="main-page overflow-auto">
    <Container class="view new-func-view">
        <Row>
          <Col>
          </Col>
        </Row>
    </Container>
</main>
<!-- <Row>
            <Col xs="3">.col-3</Col>
            <Col xs="auto">.col-auto - variable width content</Col>
            <Col xs="3">.col-3</Col>
          </Row>
          <Row>
            <Col xs="6">.col-6</Col>
            <Col xs="6">.col-6</Col>
          </Row>
          <Row>
            <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
            <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
            <Col sm="4">.col-sm-4</Col>
          </Row>
          <Row>
            <Col sm={{ size: 6, order: 2, offset: 1 }}>
              .col-sm-6 .order-sm-2 .offset-sm-1
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              .col-sm-12 .col-md-6 .offset-md-3
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
            <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
          </Row>
          <Row cols={2}>
            <Col>col-1</Col>
            <Col>col-2</Col>
            <Col>col-3</Col>
            <Col>col-4</Col>
            <Col>col-5</Col>
            <Col>col-6</Col>
          </Row>
          <Row cols={{ lg: 3, md: 2, sm: 1 }}>
            <Col>col-1</Col>
            <Col>col-2</Col>
            <Col>col-3</Col>
            <Col>col-4</Col>
            <Col>col-5</Col>
            <Col>col-6</Col>
          </Row> -->

<!-- 
          <div class="model-selector">
            <button
            class="gpt-4"
            class:selected={selectedModel === 'gpt-4'}
            on:click={() => selectModel('gpt-4')}>
              <i class="fa fa-wand-magic-sparkles" />
              GPT-4
              <div class="model-info">
                <div class="model-info-box">
                  <p>Our most capable model, great for creative stuff.</p>
  
                  <p class="secondary">Available for Plus users.</p>
                </div>
              </div>
            </button>
            <button
              class="gpt-4"
              class:selected={selectedModel === 'gpt-4'}
              on:click={() => selectModel('gpt-4')}>
              <i class="fa fa-wand-magic-sparkles" />
              GPT-4
              <div class="model-info">
                <div class="model-info-box">
                  <p>Our most capable model, great for creative stuff.</p>
  
                  <p class="secondary">Available for Plus users.</p>
                </div>
              </div>
            </button>
          </div>
         -->

<!-- <div id="message-form">
          <div class="message-wrapper">
            <textarea
              id="message"
              rows="1"
              placeholder="Send a message"
              on:input={updateMessageBoxHeight} />
            <button class="send-button">
              <i class="fa fa-paper-plane" />
            </button>
          </div>
          <div class="disclaimer">
            Her can make mistakes. Consider checking important information.
          </div>
        </div> -->
