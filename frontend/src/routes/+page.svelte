<script>
	import { visible } from './../lib/stores.js';
  import ProtectedRoute from '$lib/components/ProtectedRoute.svelte'
  import '$lib/css/main.css'
  import { getContext, onMount, setContext, tick } from 'svelte'
  import Sidebar from '$lib/components/Sidebar.svelte'
  import { sidebar } from '$lib/stores.js'
  import { accessToken, user } from '$lib/stores.js'
  import { invalidateAll } from '$app/navigation'
  import SidebarToggle from '$lib/components/SidebarToggle.svelte'
  import { svg } from '$lib/constants.js';
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

  // $: console.log($myContext)
  let selectedModel = 'gpt-3'
  let messageBoxHeight = '30px'
  let translateXContent= '0px';

  $: $sidebar ? translateXContent = '0px': translateXContent = '259px';

  function selectModel(model) {
    selectedModel = model
  }

  function updateMessageBoxHeight() {
    const messageBox = document.getElementById('message')
    messageBoxHeight = `${messageBox.scrollHeight + 2}px`
    if (messageBoxHeight > '200px') {
      messageBoxHeight = '200px'
    }
  }
  
  let isOpen = false

  function handleUpdate(event) {
    isOpen = event.detail.isOpen
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer" />

</svelte:head>

<Styles />

<ProtectedRoute>
    <main class="main-page">
      <Navbar class="hide-navbar" light expand="md">
        <SidebarToggle visible={$sidebar ? 'visible' : 'hidden' }/>

        <Dropdown nav inNavbar class="drop remove-style-li">
          <DropdownToggle nav caret class="drop-menu-toggle">Intern AI</DropdownToggle>
          <DropdownMenu end class="drop-menu-main-page">
            <Dropdown class="titleSelectModelAi">
                <div>
                  Model
                </div>
            </Dropdown>
            <Dropdown class="intern-ai-drop">
              <Dropdown>
                {@html svg.internAi}
              </Dropdown>
              <Dropdown class="wrap-style-intern">
                <div class="bold-intern-ai-drop">
                  Intern AI
                </div>
                <div class="static-intern-ai-drop">
                  Great Content Analysis Functionality
                </div>
              </Dropdown>
              <Dropdown>
                {@html svg.activeModel}
              </Dropdown>
            </Dropdown>
            <Dropdown class="senior-ai-drop">
              <Dropdown>
                {@html svg.seniorAi}
              </Dropdown>
              <Dropdown class="wrap-style-senior">
                <div class="bold-senior-ai-drop">
                  Senior AI
                </div>
                <div class="static-senior-ai-drop" >
                  Great Content Analysis Functionality, Great Content Analysis Functionality, xin chào đây là chức năng normal, bạn có thể thấy
                  nếu muốn chọn, tôi sẽ chọn bạn, ailove, và bây giờ là những điều cần nói 
                </div>
                <Button class="update-to-senior">Upgrade to Senior</Button>
              </Dropdown>
              <Dropdown>
                {@html svg.activeModel}
              </Dropdown>
            </Dropdown>
          </DropdownMenu>
        </Dropdown>


        <NavItem class="new-write remove-style-li" style="padding:12px">
          {@html svg.newWrite}
        </NavItem>

      </Navbar>
      <Container class="view new-func-view">
      <Row>
        <Col>.col</Col>
      </Row>
      <Row>
        <Col>.col</Col>
        <Col>.col</Col>
        <Col>.col</Col>
        <Col>.col</Col>
        <Col>.col</Col>
        <Col>.col</Col>
        <Col>.col</Col>
        <Col>.col</Col>

      </Row>
      <Row>
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
      </Row>
    </Container>
    </main>

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

</ProtectedRoute>
