<script>
  let touchstartX = 0
  let touchstartY = 0
  let touchendX = 0
  let touchendY = 0

  export let direction

  const findSwipeDirection = () => {
    if (touchstartX - touchendX > 100) {
      direction = 'right'
      // console.log("Swiped Left");
    }

    if (touchendX - touchstartX > 100) {
      // console.log("Swiped Right");
      direction = 'left'

    }

    // if (touchstartY - touchendY > 60) {
    //     // console.log("Swiped Up");
    //     direction = "up";
    // }

    // if (touchendY - touchstartY > 60) {
    //     // console.log("Swiped Down");
    //     direction = "down";
    // }

    // if (touchendY === touchstartY) {
    //     // console.log("Tap");
    //     direction = "none";
    // }
  }
</script>

<svelte:window
  on:touchstart={(e) => {
    touchstartX = e.changedTouches[0].clientX
    touchstartY = e.changedTouches[0].clientY
  }}
  on:touchend={(e) => {
    touchendX = e.changedTouches[0].clientX
    touchendY = e.changedTouches[0].clientY
    findSwipeDirection()
  }} />
