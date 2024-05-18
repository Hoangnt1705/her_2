import { PUBLIC_APP_API_BASE_URL } from '$env/static/public';
export const navigation = [
    {
        title: 'Home',
        url: '/homepage',
    },
    {
        title: 'About',
        url: '/about',
    },
    {
        title: 'Policy',
        url: '/policy',
    },
    {
        title: 'Terms',
        url: '/terms',
    },
    {
        title: 'Contact',
        url: '/contact',
    }
]

export const icons = [
    {
        title: 'fab fa-facebook-f',
        url: '/',
    },
    {
        title: 'fab fa-instagram',
        url: '/',
    },
    {
        title: 'fab fa-twitter',
        url: '/',
    },

]

export const END_POINT = PUBLIC_APP_API_BASE_URL;

export const iconsNotification =
{
    error: `<svg height="24" width="24" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 512.001 512.001" xml:space="preserve">
            <path style="fill:#B3404A;" d="M427.826,365.485c-7.149-2.276-14.8,1.68-17.075,8.836
            c-21.012,66.089-81.768,110.492-151.182,110.492c-87.457,0-158.609-71.151-158.609-158.61c0-87.457,71.151-158.609,158.609-158.609
            c69.655,0,132.173,46.572,152.035,113.255c2.144,7.195,9.717,11.292,16.908,9.147c7.195-2.144,11.291-9.714,9.147-16.908
            c-9.929-33.337-29.539-63.678-55.779-86.705v-60.502C381.88,56.47,325.41,0,256,0c-15.482,0-30.605,2.781-44.951,8.268
            c-7.013,2.681-10.523,10.539-7.844,17.552c2.682,7.012,10.539,10.526,17.552,7.842c11.234-4.296,23.092-6.475,35.242-6.475
            c54.419,0,98.694,44.274,98.694,98.694v40.708c-28.664-17.166-61.165-26.183-95.124-26.183c-37.757,0-72.912,11.332-102.265,30.757
            v-45.281c0-19.692,5.779-38.7,16.711-54.969c4.188-6.231,2.53-14.677-3.7-18.864c-6.231-4.188-14.679-2.533-18.865,3.7
            c-13.957,20.767-21.333,45.02-21.333,70.133v67.189c-34.729,33.778-56.344,80.974-56.344,133.132
            c0,102.448,83.346,185.798,185.796,185.798c40.231,0,78.516-12.649,110.717-36.578c31.565-23.455,54.517-55.567,66.374-92.863
            C438.936,375.403,434.98,367.759,427.826,365.485z"/>
            <circle style="fill:#F4B2B0;" cx="256" cy="326.197" r="109.009"/>
            <g>
            <path style="fill:#B3404A;" d="M256,448.809c-67.605,0-122.607-55.001-122.607-122.607S188.395,203.596,256,203.596
                s122.607,55.001,122.607,122.607S323.605,448.809,256,448.809z M256,230.783c-52.615,0-95.419,42.806-95.419,95.419
                s42.804,95.419,95.419,95.419s95.419-42.806,95.419-95.419S308.615,230.783,256,230.783z"/>
            <path style="fill:#B3404A;" d="M275.224,322.838l24.511-24.511c5.308-5.308,5.308-13.916,0-19.224
                c-5.307-5.308-13.912-5.308-19.226,0l-24.511,24.511l-24.511-24.511c-5.31-5.308-13.915-5.308-19.226,0
                c-5.308,5.308-5.308,13.916,0,19.224l24.511,24.511l-24.511,24.511c-5.308,5.308-5.308,13.916,0,19.224
                c2.655,2.655,6.134,3.982,9.612,3.982s6.957-1.328,9.612-3.982l24.511-24.511l24.511,24.511c2.655,2.655,6.134,3.982,9.612,3.982
                c3.479,0,6.957-1.328,9.612-3.982c5.308-5.308,5.308-13.916,0-19.224L275.224,322.838z"/>
            </g>
            </svg>
    `,
    success: `<svg
            width="24"
            height="24"
            viewBox="0 0 1792 1792"
            fill="#44C997"
            xmlns="http://www.w3.org/2000/svg">
            <path
            d="M1299 813l-422 422q-19 19-45
            19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45
            19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19
            45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73
            273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103
            385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5
            103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
            </svg>`
}

export const svg = {
    openSidebarResponsive: `<svg fill="#444444" width="30px" height="30px" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/><path d="M21.86,18.73H9.18a2,2,0,0,1,0-4H21.86a2,2,0,0,1,0,4Z"/><path d="M54.82,18.73H34.88a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/><path d="M54.82,34H9.18a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/><path d="M54.82,49.27H30.07a2,2,0,0,1,0-4H54.82a2,2,0,0,1,0,4Z"/></svg>`
    , newWrite: `<svg fill="#444444" height="22px" width="22px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 511.999 511.999" xml:space="preserve">
   <g>
   <g>
       <path d="M489.194,474.529h-377.58l55.961-23.531c2.258-0.903,4.648-2.525,6.251-4.133l332.686-332.686
           c7.315-7.314,7.315-19.174,0-26.49L424.316,5.493c-7.314-7.314-19.175-7.314-26.49,0C391.77,11.549,74.956,328.364,65.14,338.179
           c-1.696,1.693-3.284,4.12-4.132,6.247L1.527,485.883c-5.281,12.299,3.787,26.109,17.218,26.109h470.449
           c10.345,0,18.731-8.387,18.731-18.731S499.538,474.529,489.194,474.529z M411.071,45.226l55.707,55.707l-40.787,40.787
           l-55.707-55.707L411.071,45.226z M343.795,112.503l55.707,55.707L160.582,407.13l-55.707-55.707L343.795,112.503z M84.848,384.376
           l42.78,42.781l-73.82,31.04L84.848,384.376z"/>
    </g>
    </g>
    </svg>`
    ,internAi: `<svg width="30px" height="30px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="#444444"><path d="M108.92 70.323a35.784 36.301 0 1 1 25.311 61.978c-19.77 0-28.157-19.055-38.213-36.301C85.28 77.6 77.576 59.699 57.805 59.699a35.784 36.301 0 1 0 25.045 62.209" class="a" style="fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none"/></svg>`
    ,seniorAi: `<svg width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g fill="none">
    <circle cx="16" cy="16" r="16" fill="#00FFBA"/>
    <g fill="#FFF">
    <path d="M10.871 10.904a1.707 1.707 0 00-.194 2.148 1.693 1.693 0 001.42.756 2.188 2.188 0 01-.001 4.377A6.086 6.086 0 017.819 7.767 6.084 6.084 0 0116 7.425a6.085 6.085 0 00-2.182 4.673 2.188 2.188 0 002.175 2.189 2.188 2.188 0 01-2.188-2.189 1.69 1.69 0 00-.29-.955 1.727 1.727 0 00-.754-.622 1.723 1.723 0 00-1.33 0 1.714 1.714 0 00-.56.383zm14.64 6.628a6.094 6.094 0 01-1.242 6.613 6.084 6.084 0 01-10.45-4.243 2.188 2.188 0 114.375 0 1.7 1.7 0 001.045 1.577c.43.18.913.178 1.341-.005a1.721 1.721 0 00.905-.918 1.717 1.717 0 00-.916-2.23 1.694 1.694 0 00-.665-.134 2.188 2.188 0 010-4.377 6.081 6.081 0 015.606 3.717z"/>
    <path d="M15.994 17.714c1.208 0 2.188.98 2.188 2.188a6.085 6.085 0 01-10.467 4.226 6.087 6.087 0 014.381-10.313 2.188 2.188 0 010 4.377c-.34-.001-.672.1-.954.29a1.726 1.726 0 00-.622.755 1.71 1.71 0 00.346 1.852v.002a1.706 1.706 0 002.184.23 1.7 1.7 0 00.755-1.42c0-1.207.98-2.187 2.189-2.187zm9.326-8.396a6.09 6.09 0 01-5.417 8.868 2.189 2.189 0 010-4.378 1.71 1.71 0 001.577-1.045 1.721 1.721 0 00-.054-1.444 1.705 1.705 0 00-2.477-.64 1.698 1.698 0 00-.756 1.42 2.188 2.188 0 11-4.375-.001 6.085 6.085 0 019.717-4.886l.004.003a6.103 6.103 0 011.78 2.103z" opacity=".7"/>
    </g>
    </g>
    </svg>`
    , activeModel: `<svg width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
    <g fill="#444444">
    <path d="M3.41 2.476a.75.75 0 01-.013 1.06A6.235 6.235 0 001.5 8c0 1.67.68 3.276 1.897 4.463a.75.75 0 01-1.048 1.074A7.735 7.735 0 010 8c0-2.08.847-4.072 2.35-5.537a.75.75 0 011.06.013zM12.59 2.476a.75.75 0 011.06-.013A7.735 7.735 0 0116 8c0 2.08-.847 4.072-2.35 5.537a.75.75 0 01-1.047-1.074A6.234 6.234 0 0014.5 8c0-1.67-.68-3.276-1.897-4.463a.75.75 0 01-.013-1.06zM7 8a1 1 0 011-1h.01a1 1 0 010 2H8a1 1 0 01-1-1z"/>
    <path d="M5.864 6.046a.75.75 0 10-1.028-1.092c-.42.395-.756.867-.987 1.39a4.1 4.1 0 000 3.307c.23.523.567.994.987 1.39a.75.75 0 001.028-1.093 2.774 2.774 0 01-.642-.902 2.6 2.6 0 010-2.098c.147-.334.365-.641.642-.902zM11.164 4.96a.75.75 0 10-1.028 1.092c.277.26.495.567.642.902a2.601 2.601 0 010 2.098 2.775 2.775 0 01-.642.902.75.75 0 101.028 1.092c.42-.395.756-.866.986-1.39a4.1 4.1 0 000-3.307 4.273 4.273 0 00-.986-1.39z"/>
    </g>
    </svg>`
    , downDrop: `
    <svg fill="#444444" version="1.1" style="margin: auto 0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
    <g>
	<path d="M33.027,51.458c1.361,1.862,2.769,3.787,4.091,5.705c1.238,1.798,2.503,3.581,3.767,5.362l1.308,1.845
		c2.081,3.052,3.878,5.688,7.682,5.688c3.949,0,6.032-3.186,7.663-5.684c0.261-0.368,0.519-0.742,0.777-1.116
		c0.313-0.454,0.627-0.908,0.945-1.352l0.089-0.123c2.649-3.687,5.39-7.499,7.996-11.297c0.418-0.608,0.845-1.219,1.273-1.831
		c0.916-1.309,1.864-2.662,2.739-4.024c0.222-0.345,0.507-0.711,0.805-1.098c1.34-1.74,3.583-4.843,1.785-8.008
		c-1.005-1.77-3.175-4.025-5.983-4.025H31.782c-3.215,0-6.302,2.903-6.605,5.995c-0.248,2.523,1.27,4.686,2.489,6.348
		c0.227,0.308,0.445,0.652,0.638,0.937C29.829,47.034,31.455,49.307,33.027,51.458z M31.782,35.5h36.182
		c0.842,0,1.919,0.969,2.505,2.001c0.416,0.73-0.119,1.735-1.476,3.497c-0.363,0.472-0.706,0.964-1.001,1.423
		c-0.832,1.295-1.757,2.639-2.65,3.917c-0.436,0.622-0.869,1.253-1.295,1.873c-2.582,3.763-5.31,7.563-7.947,11.233l-0.088,0.126
		c-0.333,0.463-0.661,0.939-0.989,1.414c-0.249,0.361-0.498,0.723-0.791,1.139c-1.778,2.721-2.83,3.936-4.357,3.936
		c-1.491,0-2.23-0.792-4.396-3.969l-1.33-1.878c-1.253-1.767-2.508-3.535-3.736-5.317c-1.353-1.964-2.777-3.912-4.154-5.796
		c-1.552-2.123-3.155-4.317-4.641-6.512c-0.22-0.324-0.468-0.663-0.726-1.015c-0.858-1.17-1.831-2.686-1.733-3.685
		C29.258,36.86,30.656,35.5,31.782,35.5z"/>
    </g>
    </svg>`
    ,btnParseRecruiter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 14C3 11.1911 3 9.78661 3.67412 8.77772C3.96596 8.34096 4.34096 7.96596 4.77772 7.67412C5.78661 7 7.19108 7 10 7C12.8089 7 14.2134 7 15.2223 7.67412C15.659 7.96596 16.034 8.34096 16.3259 8.77772C17 9.78661 17 11.1911 17 14C17 16.8089 17 18.2134 16.3259 19.2223C16.034 19.659 15.659 20.034 15.2223 20.3259C14.2134 21 12.8089 21 10 21C7.19108 21 5.78661 21 4.77772 20.3259C4.34096 20.034 3.96596 19.659 3.67412 19.2223C3 18.2134 3 16.8089 3 14Z" stroke="#F8FAFC" stroke-width="1.6" class="my-path"></path>
    <path d="M11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13" stroke="#F8FAFC" stroke-width="1.6" stroke-linecap="round" class="my-path"></path>
    </svg>`
    ,orMain: `<svg width="80px" height="80px" class="or-main" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    spinnerLoading: ` <svg
    class="animate-spin border-indigo-300"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 30 30"
    fill="none">
    <circle
      cx="15"
      cy="15"
      r="14"
      stroke="#F8FAFC"
      stroke-width="2"
      stroke-dasharray="6 6" />
    </svg>`,
    loadingTablePR: `<div class="grid gap-3 " style="margin-top: 100px">
    <div class="flex items-center justify-center gap-1.5">
      <div class="w-3 h-3 rounded-full bg-neutral-50 animate-BounceDelayOne"></div>
      <div class="w-3 h-3 rounded-full bg-neutral-50 animate-BounceDelayTwo"></div>
      <div class="w-3 h-3 rounded-full bg-neutral-50 animate-BounceDelayThree"></div>
    </div>
    </div>`
};

