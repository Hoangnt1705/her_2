import lottie from 'lottie-web';

export const lottieExport = (lottieContainer, path) => {
    lottie.loadAnimation({
        container: lottieContainer, // the DOM element to render the animation in
        renderer: 'svg', // choose svg for scalability
        loop: true, // animation loop
        autoplay: true, // auto-play the animation
        path: path,
    });
};