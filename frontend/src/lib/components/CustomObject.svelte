<!-- src/CustomObject.svelte -->
<script>
    export let src = '';
  </script>
  
  <div class="pdf-container">
    <object data={src} type="application/pdf" class="pdf-object"></object>
  </div>
  
  <style>
    .pdf-container {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc; /* Light grey border */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    }
  
    .pdf-object {
      width: 50%;
      height: 90%;
      border: none;
      background-color: white; /* White background for the PDF object */
    }
  </style>
  