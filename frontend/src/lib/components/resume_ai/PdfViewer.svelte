<script>
  import { onMount } from "svelte";
  import * as pdfjs from "pdfjs-dist";
  import * as pdfWorker from "pdfjs-dist/build/pdf.worker.mjs";
  pdfjs.GlobalWorkerOptions.workerSrc =
    import.meta.url + "pdfjs-dist/build/pdf.worker.mjs";

  export let pdf_url;
  export let start_page_num = 1;
  export let scale = 1.5;
  export let css = {
    canvas: "#pdf-canvas",
    next: "#next",
    prev: "#prev",
    page_count: "#page-count",
    page_num: "#page-num",
  };

  let pdfDoc = null;
  let pageNum = start_page_num;
  let pageRendering = false;
  let pageNumPending = null;
  let canvas;
  let ctx;

  onMount(() => {
    canvas = document.querySelector(css.canvas);
    ctx = canvas.getContext("2d");

    pdfjsLib.getDocument(pdf_url).promise.then((pdfDoc_) => {
      pdfDoc = pdfDoc_;
      document.querySelector(css.page_count).textContent = pdfDoc.numPages;
      renderPage(pageNum);
    });
  });

  function renderPage(num) {
    pageRendering = true;

    pdfDoc.getPage(num).then((page) => {
      let viewport = page.getViewport({ scale: scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      let renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      let renderTask = page.render(renderContext);
      renderTask.promise.then(() => {
        pageRendering = false;
        if (pageNumPending !== null) {
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      });
    });

    document.querySelector(css.page_num).textContent = num;
  }

  function queueRenderPage(num) {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      renderPage(num);
    }
  }

  function onPrevPage() {
    if (pageNum <= 1) {
      return;
    }
    pageNum--;
    queueRenderPage(pageNum);
  }

  function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
      return;
    }
    pageNum++;
    queueRenderPage(pageNum);
  }
</script>

<style>
  #pdf-canvas {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    background: linear-gradient(145deg, #d1d9e6, #ffffff);
    box-shadow: inset 4px 4px 10px rgba(0, 0, 0, 0.2), inset -4px -4px 10px rgba(255, 255, 255, 0.7), 0 4px 15px rgba(0, 0, 0, 0.15);
    border: 1px solid #ccc;
    animation: shadowPulse 6s infinite;
  }

  @keyframes shadowPulse {
    0%, 100% {
      box-shadow: inset 4px 4px 10px rgba(0, 0, 0, 0.2), inset -4px -4px 10px rgba(255, 255, 255, 0.7), 0 4px 15px rgba(0, 0, 0, 0.15);
    }
    50% {
      box-shadow: inset 5px 5px 12px rgba(0, 0, 0, 0.25), inset -5px -5px 12px rgba(255, 255, 255, 0.8), 0 6px 20px rgba(0, 0, 0, 0.2);
    }
  }

  .controls {
    text-align: center;
    margin-top: 10px;
  }

  .page-info {
    text-align: center;
    margin-top: 5px;
  }
</style>


<div>
  <div class="flex row justify-center mb-4">
    <button
      id="prev"
      on:click={onPrevPage}
      data-ripple-light="true"
      style="box-shadow: 5px 5px rgba(0, 0, 0, 0.1);"
      class="align-middle select-none font-sans font-bold text-center uppercase
      transition-all disabled:opacity-50 disabled:shadow-none
      disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border
      border-gray-900 text-gray-900 hover:opacity-75 focus:ring
      focus:ring-gray-300 active:opacity-[0.85] rounded-r-none border-r-0"
      type="button">
      Previous
    </button>
    <div
      class="align-middle select-none font-sans font-bold text-center uppercase
      transition-all disabled:opacity-50 disabled:shadow-none
      disabled:pointer-events-none text-xs py-3 px-6 bg-gray-900 text-white rounded-r-none border-r-0
      rounded-l-none"
      type="button">
      <div>
        Page:
        <span id="page-num">{pageNum}</span>
        /
        <span id="page-count" />
      </div>
    </div>
    <button
      id="next"
      on:click={onNextPage}
      data-ripple-light="true"
      style="box-shadow: 5px 5px rgba(0, 0, 0, 0.1);"
      class="align-middle select-none font-sans font-bold text-center uppercase
      transition-all disabled:opacity-50 disabled:shadow-none
      disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border
      border-gray-900 text-gray-900 hover:opacity-75 focus:ring
      focus:ring-gray-300 active:opacity-[0.85] rounded-l-none"
      type="button">
      Next
    </button>
  </div>
</div>
<canvas id="pdf-canvas" class="h-auto w-full max-w-full" />

<svelte:head>
  <script src="//mozilla.github.io/pdf.js/build/pdf.js">

  </script>
</svelte:head>
