import { navigation, icons } from "$lib/constants.js";


export function load() {

  const video_slide = `<div><video class="video-slide active" src="/home/1.mp4" autoplay muted loop></video></div>`;
  const copyRight = `<div class="copy-right">
    <div>Copyright © 2024 Her</div>
    </div>`
  return {
    video_slide,
    icons,
    navigation,
    copyRight
  };
};