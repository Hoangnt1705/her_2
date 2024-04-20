<script>
  import { Application } from "@splinetool/runtime";
  let canvas;
  onMount(() => {
    canvas = document.getElementById("canvas3d");
    canvas.style.width = "50%"; // Initial width
    canvas.style.height = "auto"; // Maintain aspect ratio
    const app = new Application(canvas);
    app.load("https://prod.spline.design/NZREFpLnOIMAYL1j/scene.splinecode");
  });
</script>

<div style="position:absolute; z-index:999">
  <canvas id="canvas3d"></canvas>
</div>

<svelte:head>
  <script
    async
    src="https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js"
  ></script>
</svelte:head>
