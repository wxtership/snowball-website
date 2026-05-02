// Prevent browser scroll restoration from jumping the page before content renders
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// ========================================================================
// CONFIGURATION
// ========================================================================
const CONFIG = {
    OWM_GEO_KEY: "d8d9e911b1a890f245ef77f1e53026a9",
    REFRESH_INTERVAL_WEATHER: 10 * 60 * 1000,
    REFRESH_INTERVAL_ALERTS: 1 * 60 * 1000,
    SEARCH_DELAY: 300,
  STATE_BOUNDARIES: {
    'AK': { minLat: 51.2,   maxLat: 71.4,   minLon: -179.1, maxLon: -129.9 },
    'AL': { minLat: 30.2,   maxLat: 35.0,   minLon: -88.5,  maxLon: -84.9  },
    'AZ': { minLat: 31.3,   maxLat: 37.0,   minLon: -114.8, maxLon: -109.0 },
    'CA': { minLat: 32.5,   maxLat: 42.0,   minLon: -124.5, maxLon: -114.0 },
    'CO': { minLat: 36.99,  maxLat: 41.01,  minLon: -109.07,maxLon: -102.04},
    'CT': { minLat: 40.9,   maxLat: 42.1,   minLon: -73.8,  maxLon: -71.8  },
    'DE': { minLat: 38.5,   maxLat: 39.9,   minLon: -75.8,  maxLon: -75.0  },
    'FL': { minLat: 24.5,   maxLat: 31.0,   minLon: -87.6,  maxLon: -80.0  },
    'GA': { minLat: 30.36,  maxLat: 35.00,  minLon: -85.61, maxLon: -80.84 },
    'ID': { minLat: 42.0,   maxLat: 49.0,   minLon: -117.2, maxLon: -111.0 },
    'IN': { minLat: 37.7,   maxLat: 41.8,   minLon: -88.1,  maxLon: -84.7  },
    'IL': { minLat: 37.0,   maxLat: 42.5,   minLon: -91.5,  maxLon: -87.5  },
    'KS': { minLat: 37.0,   maxLat: 40.0,   minLon: -102.1, maxLon: -94.6  },
    'KY': { minLat: 36.5,   maxLat: 39.1,   minLon: -89.6,  maxLon: -81.9  },
    'MA': { minLat: 41.2,   maxLat: 42.9,   minLon: -73.5,  maxLon: -69.9  },
    'MD': { minLat: 37.9,   maxLat: 39.7,   minLon: -79.5,  maxLon: -75.0  },
    'ME': { minLat: 42.9,   maxLat: 47.5,   minLon: -71.1,  maxLon: -66.9  },
    'MI': { minLat: 41.7,   maxLat: 48.2,   minLon: -90.5,  maxLon: -82.4  },
    'MN': { minLat: 43.5,   maxLat: 49.4,   minLon: -97.3,  maxLon: -89.5  },
    'MO': { minLat: 36.0,   maxLat: 40.6,   minLon: -95.8,  maxLon: -89.1  },
    'MS': { minLat: 30.2,   maxLat: 35.0,   minLon: -91.7,  maxLon: -88.1  },
    'NC': { minLat: 33.8,   maxLat: 36.6,   minLon: -84.3,  maxLon: -75.4  },
    'ND': { minLat: 45.9,   maxLat: 49.0,   minLon: -104.1, maxLon: -96.6  },
    'NH': { minLat: 42.7,   maxLat: 45.3,   minLon: -72.6,  maxLon: -70.6  },
    'NM': { minLat: 31.3,   maxLat: 37.0,   minLon: -109.1, maxLon: -103.0 },
    'NV': { minLat: 35.0,   maxLat: 42.0,   minLon: -120.0, maxLon: -114.0 },
    'NY': { minLat: 40.5,   maxLat: 45.0,   minLon: -79.8,  maxLon: -71.8  },
    'OH': { minLat: 38.40,  maxLat: 42.00,  minLon: -84.85, maxLon: -80.50 },
    'OK': { minLat: 33.6,   maxLat: 37.0,   minLon: -103.0, maxLon: -94.4  },
    'OR': { minLat: 41.9,   maxLat: 46.3,   minLon: -124.6, maxLon: -116.5 },
    'PA': { minLat: 39.7,   maxLat: 42.3,   minLon: -80.6,  maxLon: -74.7  },
    'RI': { minLat: 41.1,   maxLat: 42.1,   minLon: -71.9,  maxLon: -71.1  },
    'SC': { minLat: 32.0,   maxLat: 35.2,   minLon: -83.4,  maxLon: -78.5  },
    'TN': { minLat: 34.9,   maxLat: 36.7,   minLon: -90.3,  maxLon: -81.6  },
    'TX': { minLat: 25.8,   maxLat: 36.5,   minLon: -106.6, maxLon: -93.5  },
    'UT': { minLat: 37.0,   maxLat: 42.0,   minLon: -114.1, maxLon: -109.0 },
    'VA': { minLat: 36.5,   maxLat: 39.5,   minLon: -83.7,  maxLon: -75.2  },
    'VT': { minLat: 42.7,   maxLat: 45.0,   minLon: -73.5,  maxLon: -71.5  },
    'WA': { minLat: 45.5,   maxLat: 49.0,   minLon: -124.8, maxLon: -116.9 },
    'WI': { minLat: 42.5,   maxLat: 47.1,   minLon: -92.9,  maxLon: -86.8  }
},
    ICONS: {
        'clear-day': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="cd-sun" x1="26.75" y1="22.91" x2="37.25" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset="0.45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" stroke="#f8af18" stroke-miterlimit="10" stroke-width="0.5" fill="url(#cd-sun)"/><path d="M32,15.71V9.5m0,45V48.29M43.52,20.48l4.39-4.39M16.09,47.91l4.39-4.39m0-23-4.39-4.39M47.91,47.91l-4.39-4.39M15.71,32H9.5m45,0H48.29" fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"><animateTransform attributeName="transform" dur="45s" values="0 32 32; 360 32 32" repeatCount="indefinite" type="rotate"/></path></svg>`,
        'clear-night': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="cn-moon" x1="21.92" y1="18.75" x2="38.52" y2="47.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset="0.45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" type="rotate" values="5 32 32; -15 32 32; 5 32 32" dur="10s" repeatCount="indefinite"/></linearGradient></defs><path d="M46.66,36.2A16.66,16.66,0,0,1,29.88,19.65a16.29,16.29,0,0,1,.55-4.15A16.56,16.56,0,1,0,48.5,36.1C47.89,36.16,47.28,36.2,46.66,36.2Z" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" fill="url(#cn-moon)"><animateTransform attributeName="transform" type="rotate" values="-5 32 32; 15 32 32; -5 32 32" dur="10s" repeatCount="indefinite"/></path></svg>`,
        'partly-cloudy-day': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="pcd-sun" x1="16.5" y1="19.67" x2="21.5" y2="28.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset="0.45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="pcd-cloud" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#f5f5f5"/><stop offset="1" stop-color="#e0e0e0"/></linearGradient></defs><circle cx="19" cy="24" r="5" stroke="#f8af18" stroke-miterlimit="10" stroke-width="0.5" fill="url(#pcd-sun)"/><path d="M19,15.67V12.5m0,23V32.33m5.89-14.22,2.24-2.24M10.87,32.13l2.24-2.24m0-11.78-2.24-2.24M27.13,32.13l-2.24-2.24M7.5,24h3.17M30.5,24H27.33" fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"><animateTransform attributeName="transform" type="rotate" values="0 19 24; 360 19 24" dur="45s" repeatCount="indefinite"/></path><path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#ffffff" stroke-miterlimit="10" stroke-width="0.5" fill="url(#pcd-cloud)" opacity="0.9"/></svg>`,
        'partly-cloudy-night': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="pcn-moon" x1="13.58" y1="15.57" x2="24.15" y2="33.87" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset="0.45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" type="rotate" values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293" dur="10s" repeatCount="indefinite"/></linearGradient><linearGradient id="pcn-cloud" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#f5f5f5"/><stop offset="1" stop-color="#e0e0e0"/></linearGradient></defs><path d="M29.33,26.68A10.61,10.61,0,0,1,18.65,16.14,10.5,10.5,0,0,1,19,13.5,10.54,10.54,0,1,0,30.5,26.61,11.48,11.48,0,0,1,29.33,26.68Z" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" fill="url(#pcn-moon)"><animateTransform attributeName="transform" type="rotate" values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293" dur="10s" repeatCount="indefinite"/></path><path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#ffffff" stroke-miterlimit="10" stroke-width="0.5" fill="url(#pcn-cloud)" opacity="0.9"/></svg>`,
        'cloudy': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="cloudy-grad" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#f5f5f5"/><stop offset="1" stop-color="#e0e0e0"/></linearGradient></defs><path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#ffffff" stroke-miterlimit="10" stroke-width="0.5" fill="url(#cloudy-grad)" opacity="0.9"><animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="7s" repeatCount="indefinite"/></path></svg>`,
        'fog': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="fog-cloud" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#f5f5f5"/><stop offset="1" stop-color="#e0e0e0"/></linearGradient><linearGradient id="fog-line1" x1="27.5" y1="50.21" x2="36.5" y2="65.79" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset="0.45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="fog-line2" y1="44.21" y2="59.79" xlink:href="#fog-line1"/></defs><path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#ffffff" stroke-miterlimit="10" stroke-width="0.5" fill="url(#fog-cloud)" opacity="0.9"/><line x1="17" y1="58" x2="47" y2="58" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#fog-line1)"><animateTransform attributeName="transform" type="translate" values="-4 0; 4 0; -4 0" dur="5s" begin="0s" repeatCount="indefinite"/></line><line x1="17" y1="52" x2="47" y2="52" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" stroke="url(#fog-line2)"><animateTransform attributeName="transform" type="translate" values="-4 0; 4 0; -4 0" dur="5s" begin="-4s" repeatCount="indefinite"/></line></svg>`,
        'rain': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="rain-cloud" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#f5f5f5"/><stop offset="1" stop-color="#e0e0e0"/></linearGradient><linearGradient id="rain-drop1" x1="22.53" y1="42.95" x2="25.47" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset="0.45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="rain-drop2" x1="29.53" y1="42.95" x2="32.47" y2="48.05" xlink:href="#rain-drop1"/><linearGradient id="rain-drop3" x1="36.53" y1="42.95" x2="39.47" y2="48.05" xlink:href="#rain-drop1"/></defs><path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#ffffff" stroke-miterlimit="10" stroke-width="0.5" fill="url(#rain-cloud)" opacity="0.9"/><line x1="24.39" y1="43.03" x2="23.61" y2="47.97" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#rain-drop1)"><animateTransform attributeName="transform" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="0.7s" repeatCount="indefinite"/></line><line x1="31.39" y1="43.03" x2="30.61" y2="47.97" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#rain-drop2)"><animateTransform attributeName="transform" begin="-0.4s" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite"/><animate attributeName="opacity" begin="-0.4s" values="0;1;1;0" dur="0.7s" repeatCount="indefinite"/></line><line x1="38.39" y1="43.03" x2="37.61" y2="47.97" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke="url(#rain-drop3)"><animateTransform attributeName="transform" begin="-0.2s" type="translate" values="1 -5; -2 10" dur="0.7s" repeatCount="indefinite"/><animate attributeName="opacity" begin="-0.2s" values="0;1;1;0" dur="0.7s" repeatCount="indefinite"/></line></svg>`,
        'snow': `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="snow-cloud" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#f5f5f5"/><stop offset="1" stop-color="#e0e0e0"/></linearGradient><linearGradient id="snow-flake1" x1="30.12" y1="43.48" x2="31.88" y2="46.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset="0.45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient><linearGradient id="snow-flake1-detail" x1="29.67" y1="42.69" x2="32.33" y2="47.31" xlink:href="#snow-flake1"/><linearGradient id="snow-flake2" x1="23.12" y1="43.48" x2="24.88" y2="46.52" xlink:href="#snow-flake1"/><linearGradient id="snow-flake2-detail" x1="22.67" y1="42.69" x2="25.33" y2="47.31" xlink:href="#snow-flake1"/><linearGradient id="snow-flake3" x1="37.12" y1="43.48" x2="38.88" y2="46.52" xlink:href="#snow-flake1"/><linearGradient id="snow-flake3-detail" x1="36.67" y1="42.69" x2="39.33" y2="47.31" xlink:href="#snow-flake1"/></defs><path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#ffffff" stroke-miterlimit="10" stroke-width="0.5" fill="url(#snow-cloud)" opacity="0.9"/><g><circle cx="31" cy="45" r="1.25" fill="none" stroke-miterlimit="10" stroke="url(#snow-flake1)"/><path d="M33.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M31,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke="url(#snow-flake1-detail)"/><animateTransform attributeName="transform" type="translate" additive="sum" values="-1 -6; 1 12" dur="4s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="rotate" additive="sum" values="0 31 45; 360 31 45" dur="9s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;1;0" dur="4s" repeatCount="indefinite"/></g><g><circle cx="24" cy="45" r="1.25" fill="none" stroke-miterlimit="10" stroke="url(#snow-flake2)"/><path d="M26.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M24,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke="url(#snow-flake2-detail)"/><animateTransform attributeName="transform" type="translate" additive="sum" values="1 -6; -1 12" begin="-2s" dur="4s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="rotate" additive="sum" values="0 24 45; 360 24 45" dur="9s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;1;0" begin="-2s" dur="4s" repeatCount="indefinite"/></g><g><circle cx="38" cy="45" r="1.25" fill="none" stroke-miterlimit="10" stroke="url(#snow-flake3)"/><path d="M40.17,46.25l-1.09-.63m-2.16-1.24-1.09-.63M38,42.5v1.25m0,3.75V46.25m-1.08-.63-1.09.63m4.34-2.5-1.09.63" fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke="url(#snow-flake3-detail)"/><animateTransform attributeName="transform" type="translate" additive="sum" values="1 -6; -1 12" begin="-1s" dur="4s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="rotate" additive="sum" values="0 38 45; 360 38 45" dur="9s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;1;0" begin="-1s" dur="4s" repeatCount="indefinite"/></g></svg>`,
        'thunderstorms': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="thunder-cloud" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#f5f5f5"/><stop offset="1" stop-color="#e0e0e0"/></linearGradient><linearGradient id="thunder-bolt" x1="26.74" y1="37.88" x2="35.76" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset="0.45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#ffffff" stroke-miterlimit="10" stroke-width="0.5" fill="url(#thunder-cloud)" opacity="0.9"/><polygon points="30 36 26 48 30 48 28 58 38 44 32 44 36 36 30 36" stroke="#f6a823" stroke-miterlimit="10" stroke-width="0.5" fill="url(#thunder-bolt)"><animate attributeName="opacity" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1" dur="2s" repeatCount="indefinite"/></polygon></svg>`
    }
};

// ========================================================================
// APPLICATION STATE
// ========================================================================
function loadPreferences() {
    try {
        const saved = localStorage.getItem('weatherAppPreferences');
        if (saved) {
            const prefs = JSON.parse(saved);
            return prefs.units || { temp: 'F', speed: 'mph', distance: 'mi', pressure: 'mb' };
        }
    } catch (e) {}
    return { temp: 'F', speed: 'mph', distance: 'mi', pressure: 'mb' };
}

function savePreferences(units) {
    try {
        localStorage.setItem('weatherAppPreferences', JSON.stringify({ units }));
    } catch (e) {}
}

const STATE_ABBR = {
    'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA',
    'Colorado':'CO','Connecticut':'CT','Delaware':'DE','Florida':'FL','Georgia':'GA',
    'Hawaii':'HI','Idaho':'ID','Illinois':'IL','Indiana':'IN','Iowa':'IA',
    'Kansas':'KS','Kentucky':'KY','Louisiana':'LA','Maine':'ME','Maryland':'MD',
    'Massachusetts':'MA','Michigan':'MI','Minnesota':'MN','Mississippi':'MS','Missouri':'MO',
    'Montana':'MT','Nebraska':'NE','Nevada':'NV','New Hampshire':'NH','New Jersey':'NJ',
    'New Mexico':'NM','New York':'NY','North Carolina':'NC','North Dakota':'ND','Ohio':'OH',
    'Oklahoma':'OK','Oregon':'OR','Pennsylvania':'PA','Rhode Island':'RI','South Carolina':'SC',
    'South Dakota':'SD','Tennessee':'TN','Texas':'TX','Utah':'UT','Vermont':'VT',
    'Virginia':'VA','Washington':'WA','West Virginia':'WV','Wisconsin':'WI','Wyoming':'WY',
    'District of Columbia':'DC','Puerto Rico':'PR'
};

const AppState = {
    lat: null,
    lon: null,
    cameras: [],
    nearestCameras: [],
    activeAlerts: [],
    hourly: null,
    hourlyCache: null,
    units: loadPreferences(),
    bgUrl: '',
    lifestyleBgUrl: '',
    lastVisualKey: '',
    alertRank: 0,
    usingGPS: false,
    searchTimeout: null,
    intervals: { weather: null, alerts: null }
};

// ========================================================================
// UNITS DISPLAY INITIALIZATION
// ========================================================================
function initializeUnitsDisplay() {
    const deskDisplay = document.getElementById('units-display');
    const mobileDisplay = document.getElementById('mobile-units-display');

    if (AppState.units.temp === 'C') {
        if (deskDisplay) deskDisplay.textContent = '°C';
        if (mobileDisplay) mobileDisplay.textContent = 'Use Imperial Units';
    } else {
        if (deskDisplay) deskDisplay.textContent = '°F';
        if (mobileDisplay) mobileDisplay.textContent = 'Use Metric Units';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeUnitsDisplay);
} else {
    initializeUnitsDisplay();
}

// ========================================================================
// UNITS CONVERSION
// ========================================================================
function convertTemp(tempF, toUnit) {
    if (tempF === null || tempF === undefined || tempF === '--') return '--';
    const num = parseFloat(tempF);
    if (isNaN(num)) return '--';
    return toUnit === 'C' ? ((num - 32) * 5 / 9).toFixed(0) : num.toFixed(0);
}

function convertSpeed(speedMph, toUnit) {
    if (speedMph === null || speedMph === undefined || speedMph === '--') return '--';
    const num = parseFloat(speedMph);
    if (isNaN(num)) return '--';
    return toUnit === 'kmh' ? (num * 1.60934).toFixed(0) : num.toFixed(0);
}

function convertDistance(distMi, toUnit) {
    if (distMi === null || distMi === undefined || distMi === '--') return '--';
    const num = parseFloat(distMi);
    if (isNaN(num)) return '--';
    return toUnit === 'km' ? (num * 1.60934).toFixed(1) : num.toFixed(1);
}

function convertPressure(pressureMb, toUnit) {
    if (pressureMb === null || pressureMb === undefined || pressureMb === '--') return '--';
    const num = parseFloat(pressureMb);
    if (isNaN(num)) return '--';
    return toUnit === 'inHg' ? (num * 0.02953).toFixed(2) : num.toFixed(2);
}



let scrollY = 0;

// SIMPLER SCROLL LOCK - No position:fixed = no flash
function lockScroll() {
    scrollY = window.scrollY;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
}

function unlockScroll() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    scrollY = 0;
}
// ========================================================================
// SHARE FEATURE & META TAGS
// ========================================================================
function updateMetaTags(locationName, temp, condition) {
    const title = `${locationName} - Xtreme Weather`;
    const description = `Weather in ${locationName}: ${temp}, ${condition}. Get real-time forecasts and alerts.`;
    const shareUrl = `${window.location.origin}${window.location.pathname}?lat=${AppState.lat}&lon=${AppState.lon}&utm_medium=social&utm_source=xw_share`;

    document.getElementById('page-title').textContent = title;
    document.getElementById('og-title').setAttribute('content', title);
    document.getElementById('og-description').setAttribute('content', description);
    document.getElementById('og-url').setAttribute('content', shareUrl);
    document.getElementById('twitter-title').setAttribute('content', title);
    document.getElementById('twitter-description').setAttribute('content', description);
}

function shareWeather() {
    if (!window.lastWeatherData || !AppState.lat || !AppState.lon) return;

    const modal = document.getElementById('share-modal');
    modal.classList.add('active');
    lockScroll();
}

function closeShareModal(event) {
    if (event && event.target.id !== 'share-modal') return;

    const modal = document.getElementById('share-modal');
    
    // Add closing class FIRST
    modal.classList.add('modal-closing');

    setTimeout(() => {
        modal.classList.remove('active', 'modal-closing');
        unlockScroll();
    }, 150);
}
function capitalizeLocation(location) {
    return location.split(' ').map(word => {
        if (word.length === 2 && word === word.toUpperCase()) {
            return word.toUpperCase();
        }
        return word.split('-').map(part =>
            part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        ).join('-');
    }).join(' ');
}

function getShareData() {
    const data = window.lastWeatherData;
    const locationName = data.location?.city || 'Unknown Location';
    const temp = data.current?.Temp ? `${convertTemp(data.current.Temp, AppState.units.temp)}°${AppState.units.temp}` : '--';
    const condition = data.current?.Weather || 'Unknown';

    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?lat=${AppState.lat}&lon=${AppState.lon}&utm_medium=social&utm_source=xw_share`;

    const capitalizedLocation = capitalizeLocation(locationName);
    const shareText = `Weather for ${capitalizedLocation}`;

    return { shareUrl, shareText, locationName: capitalizedLocation, temp, condition };
}

function shareToX() {
    const { shareUrl, shareText } = getShareData();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    closeShareModal();
}

function shareToFacebook() {
    const { shareUrl } = getShareData();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
    closeShareModal();
}

function shareToReddit() {
    const { shareUrl, shareText } = getShareData();
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
    window.open(redditUrl, '_blank', 'width=550,height=420');
    closeShareModal();
}

function shareToWhatsApp() {
    const { shareUrl, shareText } = getShareData();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
    closeShareModal();
}

async function shareNative() {
    const { shareUrl, shareText, locationName } = getShareData();

    if (navigator.share) {
        try {
            await navigator.share({
                title: `Weather in ${locationName}`,
                text: shareText,
                url: shareUrl
            });
            closeShareModal();
        } catch (err) {}
    }
}

function toggleUnits() {
    const deskDisplay = document.getElementById('units-display');
    const mobileDisplay = document.getElementById('mobile-units-display');
    const isFahrenheit = (AppState.units.temp === 'F');

    if (isFahrenheit) {
        AppState.units = { temp: 'C', speed: 'kmh', distance: 'km', pressure: 'mb' };
        if (deskDisplay) deskDisplay.textContent = '°C';
    } else {
        AppState.units = { temp: 'F', speed: 'mph', distance: 'mi', pressure: 'mb' };
        if (deskDisplay) deskDisplay.textContent = '°F';
    }

    savePreferences(AppState.units);

    if (window.lastWeatherData) {
        renderWeather(window.lastWeatherData, AppState.alertRank);
    }

    if (mobileDisplay) {
        setTimeout(() => {
            if (isFahrenheit) {
                mobileDisplay.textContent = 'Use Imperial Units';
            } else {
                mobileDisplay.textContent = 'Use Metric Units';
            }
        }, 400);
    }
}

// ========================================================================
// GREETING PHRASES
// ========================================================================
const greetingPhrases = {
    alerts: {
        warning: [
            "This is not a drill",
            "Hunker down now",
            "Seek shelter immediately",
            "Dangerous conditions active",
            "Stay off the roads",
            "Conditions are critical",
            "Mother Nature is angry"
        ],
        watch: [
            "Conditions are brewing",
            "Keep your head on a swivel",
            "Don't let your guard down",
            "Be ready to act",
            "Storms are possible",
            "Keep an eye on the sky"
        ],
        advisory: [
            "Heads up, it's messy",
            "Drive slow, arrive safe",
            "Slick spots possible",
            "Take it easy out there",
            "Weather is being difficult",
            "Watch your step today"
        ]
    },
    snow: {
        day: ["Winter wonderland", "Bundle up tight", "Fresh powder out there", "Snow day vibes", "Watch your step"],
        night: ["Frosty night", "Snow falling softly", "Silent snowy night", "Stay warm inside", "Ice cold evening"]
    },
    rain: {
        day: ["Grab the umbrella", "Rainy day vibes", "Wet commute ahead", "Patter on the window", "Gray & rainy"],
        night: ["Rainy night in", "Slick roads tonight", "Listen to the rain", "Wet evening", "Stormy dark skies"]
    },
    thunderstorm: {
        day: ["Thunder rolling in", "Stay dry out there", "Sky is growling", "Dark clouds looming"],
        night: ["Lightning show tonight", "Thunder in the dark", "Cozy up, it's stormy", "Nature's fireworks"]
    },
    fog: {
        day: ["Spooky morning", "Zero visibility", "Misty vibes", "Headlights on!"],
        night: ["Thick fog tonight", "Misty darkness", "Creepy evening", "Can't see a thing"]
    },
    clear: {
        day: ["Beautiful sunshine", "Blue skies today", "Soak up the sun", "Perfect lighting", "Bright & Clear"],
        night: ["Starry night", "Clear skies above", "Moonlight vibes", "Crisp night air", "Look up at the stars"]
    },
    cloudy: {
        day: ["Gray skies today", "Overcast vibes", "Soft light today", "Cloudy & cool"],
        night: ["Cloudy night", "Blanket of clouds", "No stars tonight", "Muted evening"]
    },
    time: {
        lateNight: ["Burning the midnight oil?", "Night owl mode", "The world sleeps", "Late night tracking"],
        earlyMorning: ["Rise and shine!", "Early bird special", "Beat the sunrise", "Coffee time"],
        morning: ["Good morning", "Morning sunshine", "Start the day right", "Fresh start"],
        afternoon: ["Good afternoon", "Midday check-in", "Afternoon energy", "Sun's high up"],
        evening: ["Good evening", "Winding down?", "Golden hour", "Relaxing evening"]
    }
};

function getGreeting(lat, lon, condition, isDay, alerts) {
    if (alerts && alerts.length > 0) {
        const allEvents = alerts.map(a => a.properties.event.toLowerCase()).join(' ');

        if (allEvents.includes('warning')) {
            const pool = greetingPhrases.alerts.warning;
            return pool[Math.floor(Math.random() * pool.length)];
        }
        if (allEvents.includes('watch')) {
            const pool = greetingPhrases.alerts.watch;
            return pool[Math.floor(Math.random() * pool.length)];
        }
        if (allEvents.includes('advisory')) {
            const pool = greetingPhrases.alerts.advisory;
            return pool[Math.floor(Math.random() * pool.length)];
        }
    }

    const tz = getTimezone(lat, lon);
    let hour;
    try {
        const hourStr = new Date().toLocaleString('en-US', { timeZone: tz, hour: 'numeric', hour12: false });
        hour = parseInt(hourStr);
    } catch (e) {
        hour = new Date().getHours();
    }

    const parsed = parseCondition(condition);
    const type = parsed.type;

    let pool = [];
    let searchType = type;

    if (type === 'partlyCloudy' || type === 'mostlyCloudy') searchType = 'cloudy';

    if (greetingPhrases[searchType] && greetingPhrases[searchType][isDay ? 'day' : 'night']) {
        pool = greetingPhrases[searchType][isDay ? 'day' : 'night'];
    } else {
        if (hour >= 0 && hour < 4) pool = greetingPhrases.time.lateNight;
        else if (hour >= 4 && hour < 6) pool = greetingPhrases.time.earlyMorning;
        else if (hour >= 6 && hour < 12) pool = greetingPhrases.time.morning;
        else if (hour >= 12 && hour < 17) pool = greetingPhrases.time.afternoon;
        else if (hour >= 17 && hour < 21) pool = greetingPhrases.time.evening;
        else pool = greetingPhrases.time.lateNight;
    }

    return pool[Math.floor(Math.random() * pool.length)];
}

// ========================================================================
// ALERTS
// ========================================================================
async function fetchAlerts(lat, lon, weatherData = null, skipUI = false) {
    const safeLat = parseFloat(lat).toFixed(4);
    const safeLon = parseFloat(lon).toFixed(4);

    try {
        if (weatherData && weatherData.hazard && Array.isArray(weatherData.hazard) && weatherData.hazard.length === 0) {
            AppState.activeAlerts = [];
            AppState.alertRank = 0;
            if (!skipUI) flushAlertBanner();
            return 0;
        }

        const res = await fetch(`https://secureproxy.xtremewx.com/weather/alerts?lat=${safeLat}&lon=${safeLon}`);
        const data = await res.json();

        AppState.activeAlerts = [];
        AppState.alertRank = 0;

        if (!data.features || data.features.length === 0) {
            if (!skipUI) flushAlertBanner();
            return 0;
        }

        const getRank = (event) => {
            const e = event.toLowerCase();
            if (e.includes('warning')) return 3;
            if (e.includes('watch')) return 2;
            return 1;
        };

        AppState.activeAlerts = data.features.sort((a, b) => {
            const rankA = getRank(a.properties.event);
            const rankB = getRank(b.properties.event);
            if (rankA !== rankB) return rankB - rankA;
            return new Date(a.properties.expires).getTime() - new Date(b.properties.expires).getTime();
        });

        const topRank = getRank(AppState.activeAlerts[0].properties.event);
        AppState.alertRank = topRank;

        if (!skipUI) flushAlertBanner();
        return topRank;

    } catch (error) {
        return 0;
    }
}

// Applies the alert banner DOM state from AppState.activeAlerts — called explicitly
// after transitions so the banner never moves while old cards are still visible.
function flushAlertBanner() {
    const banner = document.getElementById('alert-banner');
    const content = document.getElementById('main-content');

    if (!AppState.activeAlerts || AppState.activeAlerts.length === 0) {
        if (banner.classList.contains('active')) {
            banner.classList.remove('active');
            content.classList.remove('has-alert');
            banner.onclick = null;
            setTimeout(() => { banner.className = 'alert-banner'; }, 500);
        }
        return;
    }

    const getRank = e => e.toLowerCase().includes('warning') ? 3 : e.toLowerCase().includes('watch') ? 2 : 1;
    const count = AppState.activeAlerts.length;
    const topAlert = AppState.activeAlerts[0].properties;
    const topRank = getRank(topAlert.event);
    const severityClass = topRank === 3 ? 'warning' : topRank === 2 ? 'watch' : 'advisory';

    banner.classList.remove('warning', 'watch', 'advisory');
    banner.classList.add(severityClass);
    banner.onclick = openAlertModal;

    let bannerText = topAlert.event || 'Weather Alert';
    if (count > 1) bannerText = `${bannerText} + ${count - 1} MORE`;

    banner.innerHTML = `
        <div class="alert-content-wrapper">
            <i class="fas fa-triangle-exclamation"></i>
            <span class="alert-banner-text">${bannerText}</span>
            <div class="alert-view-btn"><i class="fas fa-arrow-right"></i></div>
        </div>
    `;

    if (!banner.classList.contains('active')) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
            banner.classList.add('active');
            content.classList.add('has-alert');
        }));
    } else {
        content.classList.add('has-alert');
    }
}

function updateLifestyleBackground(aqi, uv, pollen) {
    const section = document.getElementById('lifestyle-section');
    if (!section) return;

    let severity = 0;
    if (aqi > 300) severity = 4;
    else if (aqi > 200) severity = 3;
    else if (aqi > 100) severity = 2;
    else if (aqi > 50) severity = 1;

    if (uv >= 11) severity = Math.max(severity, 4);
    else if (uv >= 8) severity = Math.max(severity, 3);
    else if (uv >= 6) severity = Math.max(severity, 2);
    else if (uv >= 3) severity = Math.max(severity, 1);
}

function renderPollen(grass, tree, weed) {
    const getLabel = (count, type) => {
        let low, med, high;

        if (type === 'tree') { low = 15; med = 90; high = 1500; }
        else if (type === 'grass') { low = 5; med = 20; high = 200; }
        else { low = 10; med = 50; high = 500; }

        if (count <= low) return { t: 'Low', c: '#10b981' };
        if (count <= med) return { t: 'Moderate', c: '#facc15' };
        if (count <= high) return { t: 'High', c: '#f97316' };
        return { t: 'Very High', c: '#ef4444' };
    };

    const g = getLabel(grass, 'grass');
    const t = getLabel(tree, 'tree');
    const w = getLabel(weed, 'weed');

    const setHtml = (id, obj) => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = obj.t;
            el.style.color = obj.c;
        }
    };

    setHtml('pol-grass', g);
    setHtml('pol-tree', t);
    setHtml('pol-weed', w);

    const maxVal = Math.max(grass, tree, weed);
    const sumEl = document.getElementById('pol-summary');
    if (sumEl) {
        if (maxVal > 50) sumEl.textContent = "Allergy sufferers should stay indoors.";
        else if (maxVal > 10) sumEl.textContent = "Sensitive groups may feel symptoms.";
        else sumEl.textContent = "Great day for outdoor activities.";
    }
}

function renderAQI(val) {
    const elVal = document.getElementById('life-aqi-val');
    const elText = document.getElementById('life-aqi-status');
    const elBar = document.getElementById('life-aqi-bar');

    if (!elVal) return;

    elVal.textContent = val;

    let status = 'Good';
    let color = '#10b981';

    if (val > 50) { status = 'Moderate'; color = '#facc15'; }
    if (val > 100) { status = 'Unhealthy (Sens.)'; color = '#f97316'; }
    if (val > 150) { status = 'Unhealthy'; color = '#ef4444'; }
    if (val > 200) { status = 'Very Unhealthy'; color = '#a855f7'; }
    if (val > 300) { status = 'Hazardous'; color = '#7f1d1d'; }

    elText.textContent = status;
    elText.style.color = color;
    elBar.style.background = color;

    const pct = Math.min((val / 300) * 100, 100);
    elBar.style.width = `${pct}%`;
}

function renderUV(val) {
    const elVal = document.getElementById('life-uv-val');
    const elText = document.getElementById('life-uv-status');
    const elBar = document.getElementById('life-uv-bar');

    if (!elVal) return;

    elVal.textContent = val;

    let status = 'Low';
    let color = '#10b981';
    let pct = Math.min((val / 11) * 100, 100);

    if (val >= 3) { status = 'Moderate'; color = '#facc15'; }
    if (val >= 6) { status = 'High'; color = '#f97316'; }
    if (val >= 8) { status = 'Very High'; color = '#ef4444'; }
    if (val >= 11) { status = 'Extreme'; color = '#a855f7'; }

    elText.textContent = status;
    elText.style.color = color;
    elBar.style.background = color;
    elBar.style.width = `${pct}%`;
}

function getMoonPhaseName(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 3) { year--; month += 12; }
    ++month;
    let c = 365.25 * year;
    let e = 30.6 * month;
    let jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    let b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);

    if (b >= 8) b = 0;

    switch (b) {
        case 0: return 'New Moon';
        case 1: return 'Waxing Crescent';
        case 2: return 'First Quarter';
        case 3: return 'Waxing Gibbous';
        case 4: return 'Full Moon';
        case 5: return 'Waning Gibbous';
        case 6: return 'Last Quarter';
        case 7: return 'Waning Crescent';
        default: return 'Moon Phase';
    }
}

function renderSunGraphic(astroData) {
    if (!astroData) return;

    const { sunrise, sunset, moonrise, moonset, moon_phase, moon_illumination } = astroData;

    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
        const getMins = (str) => {
            if (!str || str === '--') return null;
            const [time, period] = str.split(' ');
            let [h, m] = time.split(':').map(Number);
            if (period === 'PM' && h !== 12) h += 12;
            if (period === 'AM' && h === 12) h = 0;
            return (h * 60) + m;
        };

        const now = new Date();
        const nowMins = (now.getHours() * 60) + now.getMinutes();
        const riseMins = getMins(sunrise);
        const setMins = getMins(sunset);
        let moonriseMins = getMins(moonrise);
        let moonsetMins = getMins(moonset);

        if (moonriseMins === null) moonriseMins = getMins('8:30 PM');
        if (moonsetMins === null) moonsetMins = getMins('7:15 AM');

        let text = "";

        const isDay = (riseMins !== null && setMins !== null) ? (nowMins >= riseMins && nowMins < setMins) : true;

        if (!isDay) {
            const sunriseEl = document.getElementById('life-sunrise');
            const sunsetEl = document.getElementById('life-sunset');
            if (sunriseEl) sunriseEl.textContent = moonrise || '--';
            if (sunsetEl) sunsetEl.textContent = moonset || '--';

            let moonUpStart = moonriseMins;
            let moonUpEnd = moonsetMins;
            if (moonUpEnd < moonUpStart) moonUpEnd += 1440;

            let nowAdjusted = nowMins;
            if (nowMins < moonUpEnd - 1440) nowAdjusted += 1440;

            if (nowAdjusted < moonUpStart) {
                const minsUntil = moonUpStart - nowMins;
                text = `Moonrise in ${Math.floor(minsUntil / 60)}h ${minsUntil % 60}m`;
            } else if (nowAdjusted > moonUpEnd) {
                text = `${moon_phase || 'Moon'} has set`;
            } else {
                text = `${moon_phase || 'Moon'} • ${moon_illumination || 0}% illuminated`;
            }
        } else {
            showMoon = false;
            const sunriseEl = document.getElementById('life-sunrise');
            const sunsetEl = document.getElementById('life-sunset');
            if (sunriseEl) sunriseEl.textContent = sunrise || '--';
            if (sunsetEl) sunsetEl.textContent = sunset || '--';

            if (riseMins === null || setMins === null) {
                text = "Sun data unavailable";
            } else {
                const left = setMins - nowMins;
                text = `${Math.floor(left / 60)}h ${left % 60}m daylight remaining`;
            }
        }

        const sunTextEl = document.getElementById('sun-text');
        if (sunTextEl) sunTextEl.textContent = text;

        const riseIcon = document.getElementById('rise-icon');
        const setIcon = document.getElementById('set-icon');
        if (riseIcon) riseIcon.className = 'fas fa-arrow-up';
        if (setIcon) setIcon.className = 'fas fa-arrow-down';
    });
}

// ========================================================================
// PERFORMANCE: DEBOUNCE RESIZE EVENTS
// ========================================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showGlobalError(title, message) {
    const currentCard = document.getElementById('current-card');

    const fallbackBg = 'https://xtremewx.com/new/backgrounds/regular/Cloudy-day_1.webp';
    const bgEl = document.getElementById('hero-bg');

    if (AppState.bgUrl !== fallbackBg) {
        AppState.bgUrl = fallbackBg;
        const img = new Image();
        img.onload = () => {
            bgEl.style.backgroundImage = `url(${fallbackBg})`;
            bgEl.classList.add('loaded');
        };
        img.src = fallbackBg;
    }

    currentCard.innerHTML = `
        <div class="glass-error">
            <i class="fas fa-cloud-showers-heavy"></i>
            <div class="glass-error-title">${title}</div>
            <div class="glass-error-text">${message}</div>
        </div>
    `;

    document.getElementById('today-forecast').innerHTML = '<span style="opacity:0.6">Forecast data unavailable.</span>';
    transitionContent(true);
}

// ========================================================================
// FAVORITES SYSTEM
// ========================================================================
function updateFavoriteBtnState() {
    const saved = getFavorites();
    const btn = document.getElementById('fav-btn');
    const icon = btn.querySelector('i');

    const isSaved = saved.some(f =>
        Math.abs(f.lat - AppState.lat) < 0.005 &&
        Math.abs(f.lon - AppState.lon) < 0.005
    );

    if (isSaved) {
        btn.classList.add('active');
        icon.classList.remove('far');
        icon.classList.add('fas');
    } else {
        btn.classList.remove('active');
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}

function toggleFavorite() {
    let saved = getFavorites();
    const btn = document.getElementById('fav-btn');

    const existingIndex = saved.findIndex(f =>
        Math.abs(f.lat - AppState.lat) < 0.005 &&
        Math.abs(f.lon - AppState.lon) < 0.005
    );

    if (existingIndex > -1) {
        saved.splice(existingIndex, 1);
    } else {
        let nameToSave = AppState.currentLocationName;

        if (!nameToSave) {
            const uiText = document.getElementById('location-text').querySelector('span').textContent;
            nameToSave = uiText.replace('(Precise)', '').trim();
        }

        if (!nameToSave || nameToSave === 'Loading...') {
            return;
        }

        saved.push({
            name: nameToSave,
            lat: AppState.lat,
            lon: AppState.lon,
            timestamp: Date.now()
        });
    }

    localStorage.setItem('xtreme_favorites', JSON.stringify(saved));
    updateFavoriteBtnState();
    renderFavoritesList();
}

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem('xtreme_favorites')) || [];
    } catch { return []; }
}

async function renderFavoritesList() {
    const list = document.getElementById('favorites-list');
    const section = document.getElementById('favorites-section');
    const favorites = getFavorites();

    if (favorites.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    list.innerHTML = favorites.map((fav, index) => `
        <div class="fav-item" data-lat="${fav.lat}" data-lon="${fav.lon}" data-name="${fav.name.replace(/"/g, '&quot;')}">
            <div class="fav-left-content">
                <i class="fas fa-triangle-exclamation fav-alert-badge" id="fav-alert-${index}"></i>
                <div class="fav-name">${fav.name}</div>
            </div>
            <div class="fav-actions">
                <i class="fas fa-times fav-delete" 
                   onclick="event.stopPropagation(); removeFavoriteAtIndex(${index})"></i>
            </div>
        </div>
    `).join('');

    // UPDATED: Add smooth click handlers
    list.querySelectorAll('.fav-item').forEach(item => {
        item.addEventListener('click', async function(e) {
            if (e.target.classList.contains('fav-delete') || e.target.closest('.fav-delete')) {
                return;
            }
            
            // Prevent multiple clicks
            if (this.classList.contains('selecting')) return;
            this.classList.add('selecting');
            
            // Visual feedback
            this.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
            this.style.transform = 'scale(0.95)';
            this.style.opacity = '0.6';
            
            // Small delay for visual feedback
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Select location
            selectLocation(
                parseFloat(this.dataset.lat),
                parseFloat(this.dataset.lon),
                this.dataset.name
            );
        });
    });

    checkFavoritesForWarnings(favorites);
}

function removeFavoriteAtIndex(index) {
    let saved = getFavorites();
    saved.splice(index, 1);
    localStorage.setItem('xtreme_favorites', JSON.stringify(saved));
    renderFavoritesList();
    updateFavoriteBtnState();
}

function showPartialDataWarning(message) {
    const container = document.getElementById('partial-warning-container');
    container.innerHTML = `
        <div class="partial-data-warning">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        </div>
    `;
}

function hidePartialDataWarning() {
    document.getElementById('partial-warning-container').innerHTML = '';
}

async function checkFavoritesForWarnings(favorites) {
    favorites.forEach(async (fav, index) => {
        try {
            const res = await fetch(`https://api.weather.gov/alerts/active?point=${fav.lat},${fav.lon}`);
            if (!res.ok) return;

            const data = await res.json();
            if (data.features && data.features.length > 0) {
                let highestSeverity = '';
                const events = data.features.map(f => f.properties.event.toLowerCase());

                if (events.some(e => e.includes('warning'))) highestSeverity = 'warning';
                else if (events.some(e => e.includes('watch'))) highestSeverity = 'watch';
                else if (events.some(e => e.includes('advisory'))) highestSeverity = 'advisory';

                if (highestSeverity) {
                    const badge = document.getElementById(`fav-alert-${index}`);
                    if (badge) {
                        badge.classList.add('visible', highestSeverity);
                        badge.title = data.features[0].properties.event;
                    }
                }
            }
        } catch (e) {}
    });
}

// ========================================================================
// PERFORMANCE: INTERSECTION OBSERVER FOR LAZY RENDERING
// ========================================================================
function setupLazyRendering() {
    if (!('IntersectionObserver' in window)) return;
    
    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.01
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Trigger section-specific loading
                if (section.classList.contains('lifestyle-section')) {
                    section.classList.add('is-visible');
                }
                
                if (section.classList.contains('dive-deeper-section')) {
                    section.classList.add('is-visible');
                }
                
                // Stop observing once loaded
                observer.unobserve(section);
            }
        });
    }, options);
    
    // Observe heavy sections
    const lifestyleSection = document.querySelector('.lifestyle-section');
    const diveSection = document.querySelector('.dive-deeper-section');
    
    if (lifestyleSection) observer.observe(lifestyleSection);
    if (diveSection) observer.observe(diveSection);
}

function formatCityState(displayName) {
    if (!displayName) return "Unknown Location";

    const parts = displayName.split(',').map(p => p.trim());

    const getStateAbbrLoose = (text) => {
        const t = text.toLowerCase();
        for (const [full, abbr] of Object.entries(US_STATE_TO_ABBR)) {
            if (full.toLowerCase() === t) return abbr;
            if (abbr.toLowerCase() === t) return abbr;
        }
        return null;
    };

    let stateAbbr = "";
    let stateIndex = -1;

    for (let i = 0; i < parts.length; i++) {
        const foundAbbr = getStateAbbrLoose(parts[i]);
        if (foundAbbr) {
            stateAbbr = foundAbbr;
            stateIndex = i;
            break;
        }
    }

    if (!stateAbbr) return parts[0];

    let city = "";
    if (stateIndex > 0) {
        for (let i = stateIndex - 1; i >= 0; i--) {
            const part = parts[i];
            const lower = part.toLowerCase();

            if (lower.includes('county') ||
                lower === 'united states' ||
                lower === 'usa' ||
                !isNaN(parseInt(lower))) {
                continue;
            }

            city = part;
            break;
        }
    }

    if (city) {
        return `${city}, ${stateAbbr}`;
    }

    return parts[0];
}

// ========================================================================
// ALERT MODAL
// ========================================================================
function openAlertModal() {
    const modal = document.getElementById('alert-modal');
    const list = document.getElementById('alert-list');
    const countSpan = document.getElementById('alert-modal-count');

    if (!AppState.activeAlerts || AppState.activeAlerts.length === 0) return;

    countSpan.textContent = `${AppState.activeAlerts.length} Active Alert${AppState.activeAlerts.length > 1 ? 's' : ''}`;

    list.innerHTML = AppState.activeAlerts.map(feature => {
        const props = feature.properties;

        const eventName = props.event;
        const lowerEvent = eventName.toLowerCase();
        let severityClass = 'advisory';
        if (lowerEvent.includes('warning')) severityClass = 'warning';
        else if (lowerEvent.includes('watch')) severityClass = 'watch';

        const endIso = props.ends || props.expires;
        const expires = endIso ? new Date(endIso).toLocaleString('en-US', {
            weekday: 'short', hour: 'numeric', minute: '2-digit'
        }) : 'Until further notice';

        const descriptionHTML = formatNWSBody(props.description);
        const instructionHTML = props.instruction ? formatNWSBody(props.instruction) : null;
        const areasHTML = (props.areaDesc || "See description.").replace(/;/g, ', ');

        return `
            <div class="alert-item ${severityClass}">
                <div class="alert-item-header">
                    <div class="alert-item-title">${eventName}</div>
                </div>
                <div class="alert-item-meta">
                    <i class="far fa-clock"></i> Ends: ${expires}
                </div>
                <div class="alert-body">
                    <div class="alert-section">
                        <div class="alert-section-label">Description</div>
                        <div class="alert-text">${descriptionHTML}</div>
                    </div>
                    ${instructionHTML ? `
                        <div class="alert-section">
                            <div class="alert-section-label">Action Recommended</div>
                            <div class="alert-text alert-action-box">${instructionHTML}</div>
                        </div>
                    ` : ''}
                    <div class="alert-section">
                        <div class="alert-section-label">Areas Impacted</div>
                        <div class="alert-text" style="opacity: 0.7; font-size: 0.85rem;">
                            ${areasHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    modal.classList.add('active');
    lockScroll();
}

function closeAlertModal(event) {
    if (event && event.target.id !== 'alert-modal') return;

    const modal = document.getElementById('alert-modal');
    
    // Add closing class FIRST
    modal.classList.add('modal-closing');
    
    // Then remove active and unlock after animation
    setTimeout(() => {
        modal.classList.remove('active', 'modal-closing');
        unlockScroll();
    }, 150);
}

function transitionContent(show) {
    const animatedItems = document.querySelectorAll('.current-card, .info-card, .greeting, .location-controls');
    const hourlySection = document.getElementById('hourly-forecast-section');

    if (show) {
        animatedItems.forEach(el => {
            el.classList.remove('is-loading');
            el.classList.add('is-loaded');
        });
        if (hourlySection && hourlySection.style.display === 'block') {
            hourlySection.classList.add('is-loaded');
        }
    } else {
        animatedItems.forEach(el => el.classList.remove('is-loaded'));
        if (hourlySection) hourlySection.classList.remove('is-loaded');
    }
}

// ========================================================================
// TIMEZONE & SUN CALCULATIONS
// ========================================================================
function getTimezone(lat, lon) {
    if (lon > 143 && lon < 147 && lat > 10 && lat < 21) return 'Pacific/Guam';
    if (lon < -168 && lon > -173) return 'Pacific/Pago_Pago';
    if (lon < -154 && lon > -162 && lat > 18 && lat < 23) return 'Pacific/Honolulu';
    if (lon < -163 && lat > 50) return 'America/Adak';
    if (lat > 50 && lon < -129) return 'America/Anchorage';
    if (lon > -68 && lon < -64 && lat > 17 && lat < 19) return 'America/Puerto_Rico';
    if (lon < -114) return 'America/Los_Angeles';
    if (lon < -102) return 'America/Denver';
    if (lon < -86) return 'America/Chicago';
    return 'America/New_York';
}

function isDaytime(sunriseStr, sunsetStr) {
    if (!sunriseStr || !sunsetStr) return true;

    const parseTime = (str) => {
        const [time, period] = str.split(' ');
        let [h, m] = time.split(':').map(Number);
        if (period === 'PM' && h !== 12) h += 12;
        if (period === 'AM' && h === 12) h = 0;
        return h * 60 + m;
    };

    const tz = getTimezone(AppState.lat, AppState.lon);
    let nowMins;
    try {
        const hourStr = new Date().toLocaleString('en-US', { timeZone: tz, hour: 'numeric', hour12: false });
        const minStr = new Date().toLocaleString('en-US', { timeZone: tz, minute: 'numeric' });
        nowMins = (parseInt(hourStr) * 60) + parseInt(minStr);
    } catch (e) {
        const now = new Date();
        nowMins = now.getHours() * 60 + now.getMinutes();
    }

    const riseMins = parseTime(sunriseStr);
    const setMins = parseTime(sunsetStr);

    return nowMins >= riseMins && nowMins < setMins;
}

// ========================================================================
// WEATHER PARSING
// ========================================================================
function parseCondition(condition) {
    if (!condition) return { type: 'cloudy' };
    const lower = condition.toLowerCase();

    if (lower.includes('thunder') || lower.includes('storm')) return { type: 'thunderstorm' };
    if (lower.includes('snow')) return { type: 'snow' };
    if (lower.includes('rain') || lower.includes('shower')) return { type: 'rain' };
    if (lower.includes('fog')) return { type: 'fog' };
    if (lower.includes('sunny') || lower.includes('clear') || lower.includes('fair')) return { type: 'clear' };
    if (lower.includes('partly') && lower.includes('cloud')) return { type: 'partlyCloudy' };
    if (lower.includes('mostly') && lower.includes('cloud')) return { type: 'mostlyCloudy' };
    return { type: 'cloudy' };
}

function getBackgroundUrl(condition, hasWarning, isDay, windSpeed = null) {
    const folder = hasWarning ? 'severe' : 'regular';
    const suffix = hasWarning ? '_severe' : '';
    const parsed = parseCondition(condition);
    const isWindy = windSpeed !== null && windSpeed > 15;

    const mapping = {
        clear: isDay ? 'Sunny-day' : 'Clear-night',
        partlyCloudy: isDay ? 'PartlyCloudy-day' : 'PartlyCloudy-night',
        mostlyCloudy: isDay ? 'MostlyCloudy-day' : 'MostlyCloudy-night',
        cloudy: isDay ? 'Cloudy-day' : 'Cloudy-night',
        rain: isDay ? 'Rain-day' : 'Rain-night',
        snow: isDay ? 'SnowShowers-day' : 'SnowShowers-night',
        thunderstorm: isDay ? 'StrongStorms-day' : 'StrongStorms-night',
        fog: isDay ? 'Foggy-day' : 'Foggy-night'
    };

    let imageName = mapping[parsed.type] || (isDay ? 'Cloudy-day' : 'Cloudy-night');
    if (isWindy && !['rain', 'snow', 'thunderstorm'].includes(parsed.type)) {
        imageName = isDay ? 'Cloudy-day' : 'Cloudy-night';
    }

    let variant = '_1';
    if (imageName.includes('Sunny')) {
        const variants = ['_1', '_2', '_3', '_4'];
        variant = variants[Math.floor(Math.random() * 4)];
    } else {
        const rand = Math.random() > 0.5 ? 2 : 1;
        variant = `_${rand}`;
    }

    return `https://xtremewx.com/new/backgrounds/${folder}/${imageName}${variant}${suffix}.webp`;
}

function getIconKey(condition, isDay, windSpeed = null) {
    const parsed = parseCondition(condition);
    const isWindy = windSpeed !== null && windSpeed > 15;

    const mapping = {
        'clear': isDay ? 'clear-day' : 'clear-night',
        'partlyCloudy': isDay ? 'partly-cloudy-day' : 'partly-cloudy-night',
        'mostlyCloudy': 'cloudy',
        'cloudy': 'cloudy',
        'rain': 'rain',
        'snow': 'snow',
        'thunderstorm': 'thunderstorms',
        'fog': 'fog'
    };

    if (isWindy && !['rain', 'snow', 'thunderstorm'].includes(parsed.type)) {
        return 'wind';
    }

    return mapping[parsed.type] || 'cloudy';
}

// ========================================================================
// UTILITY FUNCTIONS
// ========================================================================
function isEmpty(val) {
    if (val === undefined || val === null) return true;
    if (typeof val === 'string') {
        const trimmed = val.trim();
        return trimmed === '' || trimmed === 'NA' || trimmed === 'null' || trimmed === '--';
    }
    if (typeof val === 'number') return isNaN(val);
    return false;
}

function getCardinalDirection(degree) {
    if (isEmpty(degree) || isNaN(parseInt(degree))) return null;
    const val = Math.floor((parseInt(degree) / 22.5) + 0.5);
    const arr = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return arr[(val % 8)];
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

async function getLocation() {
    const CACHE_KEY = 'cached_coords';
    const CACHE_DURATION = 4 * 60 * 60 * 1000;

    try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
            const cache = JSON.parse(cachedRaw);
            const age = Date.now() - cache.timestamp;

            if (age < CACHE_DURATION && cache.data && cache.data.lat) {
                return cache.data;
            } else {
                localStorage.removeItem(CACHE_KEY);
            }
        }
    } catch (e) {
        localStorage.removeItem(CACHE_KEY);
    }

    const providers = [
        { url: 'https://ipapi.co/json/', type: 'ipapi' },
        { url: 'https://api.geoapify.com/v1/ipinfo?&apiKey=4ef848bdb4d8432286a34854a402f5f0', type: 'geoapify' }
    ];

    for (const provider of providers) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const response = await fetch(provider.url, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!response.ok) throw new Error(`${provider.type} failed`);
            const data = await response.json();

            let lat, lon, name;
            if (provider.type === 'geoapify') {
                if (data.location) {
                    lat = parseFloat(data.location.latitude);
                    lon = parseFloat(data.location.longitude);
                    let cityName = data.city ? data.city.name : 'Unknown City';
                    let stateAbbr = (data.state && data.state.iso_code) ? data.state.iso_code : '';
                    name = stateAbbr ? `${cityName}, ${stateAbbr}` : cityName;
                }
            } else {
                lat = parseFloat(data.latitude);
                lon = parseFloat(data.longitude);
                let cityName = data.city || 'Unknown City';
                let stateAbbr = data.region_code || '';
                name = stateAbbr ? `${cityName}, ${stateAbbr}` : cityName;
            }

            if (!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
                const result = { lat, lon, name };

                if (provider.type === 'ipapi') {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        data: result,
                        timestamp: Date.now()
                    }));
                }
                return result;
            }
        } catch (err) { continue; }
    }
    throw new Error("All location providers failed");
}

async function triggerSearchGPS() {
    const btn = document.getElementById('search-gps-btn');
    const span = btn.querySelector('span');
    const icon = btn.querySelector('i');

    const originalText = "Use Current Location";
    span.textContent = "Locating...";
    icon.className = "fas fa-circle-notch fa-spin";
    btn.style.opacity = "0.7";

    if (!navigator.geolocation) {
        showGpsError("Not Supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            try {
                span.textContent = "Finding place name...";
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                const res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${CONFIG.OWM_GEO_KEY}`);
                if (!res.ok) throw new Error("Geocoding failed");
                const data = await res.json();
                const place = Array.isArray(data) ? data[0] : data;
                const abbr = STATE_ABBR[place?.state] || place?.state || '';
                const cleanName = place ? (abbr ? `${place.name}, ${abbr}` : place.name) : `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
                AppState.usingGPS = true;

                await selectLocation(lat, lon, cleanName);

                setTimeout(() => {
                    span.textContent = "Using Precise Location";
                    icon.className = "fas fa-check";
                    btn.style.opacity = "1";
                }, 500);

            } catch (e) {
                showGpsError("Address lookup failed");
            }
        },
        (err) => {
            if (err.code === 1) showGpsError("Permission Denied");
            else if (err.code === 2) showGpsError("Position Unavailable");
            else showGpsError("GPS Timeout");
        },
        { timeout: 10000, enableHighAccuracy: true }
    );

    function showGpsError(msg) {
        btn.classList.add('error');
        span.textContent = msg;
        icon.className = "fas fa-exclamation-triangle";
        btn.style.opacity = "1";
        setTimeout(() => {
            btn.classList.remove('error');
            span.textContent = originalText;
            icon.className = "fas fa-location-arrow";
        }, 3000);
    }
}

// ========================================================================
// WEATHER DATA FETCHING
// ========================================================================
async function fetchWeather(lat, lon) {
    const CACHE_KEY = `weather_${lat}_${lon}`;
    const CACHE_DURATION = 10 * 60 * 1000;

    try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
            const cache = JSON.parse(cachedRaw);
            const age = Date.now() - cache.timestamp;
            if (age < CACHE_DURATION) {
                return cache.data;
            }
        }
    } catch (e) {}

    try {
        const proxyUrl = `https://secureproxy.xtremewx.com/weather?lat=${lat}&lon=${lon}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error(`Weather service unavailable`);

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        const currentObs = data.currentobservation || {};
        const location = data.location || {};

        const result = {
            location: {
                city: location.areaDescription || 'Unknown',
                state: ''
            },
            station: currentObs.name || 'an unknown station',
            obsDateString: currentObs.Date || null,
            current: {
                Temp: currentObs.Temp,
                Dewp: currentObs.Dewp,
                Relh: currentObs.Relh,
                Winds: currentObs.Winds,
                Windd: currentObs.Windd,
                Gust: currentObs.Gust,
                Weather: currentObs.Weather ? currentObs.Weather.trim() : null,
                Visibility: currentObs.Visibility,
                SLP: currentObs.SLP,
                WindChill: currentObs.WindChill || currentObs.Windchill || null,
                HeatIndex: currentObs.HeatIndex || null
            },
            creationDate: data.creationDate,
            forecast: data.data || [],
            dataComplete: !isEmpty(currentObs.Temp),
            hazard: data.data?.hazard || [],
            lifestyle: data.lifestyle || null
        };

        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: result
            }));
        } catch (e) {}

        return result;

    } catch (error) {
        throw new Error(`Weather fetch failed: ${error.message}`);
    }
}

async function fetchHourlyForecast(lat, lon) {
    const CACHE_KEY = `hourly_${lat.toFixed(3)}_${lon.toFixed(3)}`;
    const CACHE_DURATION = 30 * 60 * 1000;

    try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
            const cache = JSON.parse(cachedRaw);
            const age = Date.now() - cache.timestamp;
            if (age < CACHE_DURATION) {
                return cache.data;
            }
        }
    } catch (e) {}

    try {
        const url = `https://secureproxy.xtremewx.com/weather/hourly?lat=${lat}&lon=${lon}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        if (!data || !Array.isArray(data.periods)) {
            throw new Error('Invalid data structure from proxy');
        }

        const periods = data.periods;

        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: periods
            }));
        } catch (e) {}

        return periods;
    } catch (error) {
        return null;
    }
}

function renderHourlyGraph(periods) {
    const section = document.getElementById('hourly-forecast-section');
    if (!section) return;

    section.style.display = 'block';

    if (!periods || periods.length === 0) {
        const container = document.getElementById('hourly-cards-grid');
        if (container) {
            container.innerHTML = `
                <div class="hourly-unavailable">
                    <i class="fas fa-times-circle"></i>
                    <span>Hourly data not available</span>
                </div>`;
        }
        const diveDeeper = document.querySelector('.dive-deeper-section');
        if (diveDeeper) diveDeeper.classList.add('loaded');
        requestAnimationFrame(() => { section.classList.add('is-loaded'); });
        return;
    }

    const next6Hours = periods.slice(0, 6);
    renderHourlyCards(next6Hours);

    const diveDeeper = document.querySelector('.dive-deeper-section');
    if (diveDeeper) diveDeeper.classList.add('loaded');

    requestAnimationFrame(() => {
        section.classList.add('is-loaded');
    });
}

function renderHourlyCards(periods) {
    const container = document.getElementById('hourly-cards-grid');
    if (!container) return;

    container.innerHTML = periods.map(period => {
        const timeLabel = period.name;
        const isDay = period.isDaytime;

        const rawTemp = period.temperature ?? null;
        const temp = rawTemp !== null ? convertTemp(rawTemp, AppState.units.temp) : '--';

        const condition = period.shortForecast || 'Unknown';
        const formattedCondition = formatHourlyCondition(condition);

        const iconName = getWeatherIcon(condition, isDay);
        const iconSvg = CONFIG.ICONS[iconName] || CONFIG.ICONS['cloudy'];

        return `
            <div class="hourly-card">
                <div class="hourly-card-time">${timeLabel}</div>
                <div class="hourly-card-icon" style="font-size: 2rem; line-height: 1; margin: 0.5rem 0;">
                    ${iconSvg}
                </div>
                <div class="hourly-card-temp">${temp}°${AppState.units.temp}</div>
                <div class="hourly-card-condition" style="font-size: 0.85rem; opacity: 0.9;">
                    ${formattedCondition}
                </div>
            </div>
        `;
    }).join('');
}

function formatHourlyCondition(raw) {
    if (!raw) return 'Unknown';
    let cond = raw.trim();

    if (cond.includes('T-storms') || cond.includes('T-Storms') || cond.includes('TSTM')) {
        cond = cond.replace(/T[- ]?storms/gi, 'thunderstorms')
            .replace(/T[- ]?Storms/gi, 'thunderstorms')
            .replace(/TSTM/gi, 'thunderstorms');
    }

    if (cond.startsWith('Slight Chance')) {
        cond = 'A slight chance of ' + cond.slice(13).toLowerCase();
    } else if (cond.startsWith('Chance')) {
        cond = 'A chance of ' + cond.slice(6).toLowerCase();
    } else {
        cond = cond.toLowerCase();
    }

    cond = cond.charAt(0).toUpperCase() + cond.slice(1);
    cond = cond.replace(/\.$/, '').trim();

    return cond;
}

function getWeatherIcon(condition, isDay) {
    if (!condition) return isDay ? 'clear-day' : 'clear-night';

    const cond = condition.toLowerCase();

    if (cond.includes('sunny') || cond === 'clear' || cond.includes('fair')) {
        return isDay ? 'clear-day' : 'clear-night';
    }
    if (cond.includes('partly cloudy') || cond.includes('mostly sunny')) {
        return isDay ? 'partly-cloudy-day' : 'partly-cloudy-night';
    }
    if (cond.includes('mostly cloudy') || cond.includes('overcast')) {
        return 'cloudy';
    }
    if (cond.includes('cloudy')) {
        return 'cloudy';
    }
    if (cond.includes('thunder') || cond.includes('storm')) return 'thunderstorms';
    if (cond.includes('rain') || cond.includes('shower') || cond.includes('drizzle')) return 'rain';
    if (cond.includes('snow') || cond.includes('flurries') || cond.includes('sleet')) return 'snow';
    if (cond.includes('fog') || cond.includes('mist')) return 'fog';

    return 'cloudy';
}

function closeMobileMenu(event) {
    if (event.target.id === 'mobile-menu') {
        toggleMobileMenu();
    }
}

// ========================================================================
// VIDEO.JS LAZY LOADING
// ========================================================================
let videojsLoaded = false;

async function loadVideoJS() {
    if (videojsLoaded) return;

    await new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://vjs.zencdn.net/8.10.0/video-js.css';
        link.onload = resolve;
        document.head.appendChild(link);
    });

    await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://vjs.zencdn.net/8.10.0/video.min.js';
        script.onload = () => {
            videojsLoaded = true;
            resolve();
        };
        document.head.appendChild(script);
    });
}

let activePlayer = null;
let gridPlayers = [];
let modalImageInterval = null;
const CAMERA_PROXY_BASE = 'https://secureproxy.xtremewx.com';
const CAMERA_FRAME_BASE = 'https://secureproxy.xtremewx.com';

function isLikelyStreamUrl(url = '') {
    const value = String(url).toLowerCase();
    return value.includes('.m3u8') || value.includes('playlist') || value.includes('rtplive');
}

function getCameraStreamSource(cam) {
    const primary = cam?.url || '';
    const preview = cam?.preview || '';
    if (isLikelyStreamUrl(primary)) return primary;
    if (isLikelyStreamUrl(preview)) return preview;
    return primary || preview;
}

function getCameraThumbCandidates(cam) {
    const preview = cam?.preview || '';
    const primary = cam?.url || '';
    const isVideo = cam?.type === 'video' || isLikelyStreamUrl(preview) || isLikelyStreamUrl(primary);
    const candidates = [];

    if (isVideo) {
        const streamSource = getCameraStreamSource(cam);
        if (streamSource) {
            candidates.push(
                `${CAMERA_FRAME_BASE}/camera/frame?url=${encodeURIComponent(streamSource)}&at=0.5&width=640`
            );
        }
        // Fallback for video cams that provide a static preview URL
        if (preview && !isLikelyStreamUrl(preview)) {
            candidates.push(
                `${CAMERA_PROXY_BASE}/camera/image?url=${encodeURIComponent(preview)}&optimize=1&width=320`
            );
        }
    } else {
        const imageUrl = preview || primary;
        if (imageUrl) {
            candidates.push(
                `${CAMERA_PROXY_BASE}/camera/image?url=${encodeURIComponent(imageUrl)}&optimize=1&width=320`
            );
        }
    }

    return candidates;
}

async function loadNearbyCameras(lat, lon) {
    const container = document.getElementById('cameras-container');
    const countLabel = document.getElementById('camera-count');

    if (!container) return;

    if (window.thumbRefreshIntervals) {
        window.thumbRefreshIntervals.forEach(i => clearInterval(i));
    }
    window.thumbRefreshIntervals = [];

    if (window.gridPlayers) {
        window.gridPlayers.forEach(p => { if (p) try { p.dispose(); } catch(e) {} });
        window.gridPlayers = [];
    }

    let gridInner = document.getElementById('grid-inner');
    if (!gridInner) {
        container.innerHTML = `<div class="cameras-grid" id="grid-inner"></div>`;
        gridInner = document.getElementById('grid-inner');
    }

    if (countLabel) countLabel.textContent = 'Scanning...';

    const skeletonSlots = [];
    gridInner.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const skel = document.createElement('div');
        skel.className = 'skeleton-cam';
        gridInner.appendChild(skel);
        skeletonSlots.push(skel);
    }

    let nearest = [];
    let totalFound = 0;

    try {
        const EXTENDED_BOUNDARIES = {
            ...CONFIG.STATE_BOUNDARIES,
            'PA': { minLat: 39.7, maxLat: 42.3, minLon: -80.6, maxLon: -74.7 },
            'OH': { minLat: 38.4, maxLat: 42.0, minLon: -84.9, maxLon: -80.5 },
            'VA': { minLat: 36.5, maxLat: 39.6, minLon: -83.7, maxLon: -75.2 }
        };

        const promises = [];
        const statesToCheck = Object.keys(EXTENDED_BOUNDARIES).filter(state => {
    const bounds = EXTENDED_BOUNDARIES[state];
    // Only check states within ~1 degree of user location
    return lat >= (bounds.minLat - 1) && lat <= (bounds.maxLat + 1) &&
           lon >= (bounds.minLon - 1) && lon <= (bounds.maxLon + 1);
});

        for (const state of statesToCheck) {
            const bounds = EXTENDED_BOUNDARIES[state];
            if (!bounds) continue;

            if (lat >= (bounds.minLat - 0.5) && lat <= (bounds.maxLat + 0.5) &&
                lon >= (bounds.minLon - 0.5) && lon <= (bounds.maxLon + 0.5)) {

                promises.push(
                    fetch(`https://secureproxy.xtremewx.com/camera/list?state=${state}`)
                        .then(r => r.json())
                        .catch(e => [])
                );
            }
        }

        const results = await Promise.all(promises);
        const allWithDist = results.flat()
            .filter(c => c && c.lat && c.lon)
            .map(c => ({ ...c, distance: calculateDistance(lat, lon, c.lat, c.lon) }))
            .filter(c => c.distance <= 100);

        totalFound = allWithDist.length;
        nearest = allWithDist.sort((a, b) => a.distance - b.distance).slice(0, 4);

        if (nearest.length === 0) throw new Error("No cams");
        AppState.nearestCameras = nearest;

        if (countLabel) countLabel.textContent = `${totalFound} Nearby`;

    } catch (error) {
        if (countLabel) countLabel.textContent = 'None Nearby';

        gridInner.innerHTML = `
            <div class="no-cams-box">
                <i class="fas fa-video-slash"></i>
                <span>No cameras found in this area.</span>
            </div>
        `;
        return;
    }

    const finalBoxes = [];

    for (let i = 0; i < nearest.length; i++) {
        const cam = nearest[i];
        const slot = skeletonSlots[i];

        const box = document.createElement('div');
        box.className = 'camera-thumb camera-content-hidden';
        box.style.cssText = 'position: absolute; top:0; left:0; width:100%; height:100%; z-index:10; cursor:pointer; border-radius:12px; overflow:hidden; background: #000;';
        box.style.aspectRatio = (cam.state === 'MD') ? '4/3' : '16/9';
        box.onclick = () => openCameraModal(i);

        // Create image element for thumbnail
const img = document.createElement('img');
img.alt = cam.name;
img.loading = 'lazy'; // ADD THIS LINE
img.decoding = 'async'; // ADD THIS LINE
img.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; z-index:2; transition: opacity 0.5s ease; opacity: 0;';
box.appendChild(img);

        const thumbCandidates = getCameraThumbCandidates(cam);
        let activeThumbBase = '';
        let candidateIndex = 0;

        img.onload = function () {
            this.style.display = '';
            this.style.opacity = '1';
        };

        img.onerror = function () {
            if (candidateIndex >= thumbCandidates.length) {
                this.style.display = 'none';
                showThumbError(box);
                return;
            }
            activeThumbBase = thumbCandidates[candidateIndex++];
            this.src = activeThumbBase;
        };

        if (thumbCandidates.length > 0) {
            activeThumbBase = thumbCandidates[candidateIndex++];
            img.src = activeThumbBase;
        } else {
            img.style.display = 'none';
            showThumbError(box);
        }

        // Refresh every 60 seconds
        const refreshInterval = setInterval(() => {
            if (img.style.display !== 'none' && img.style.opacity === '1' && activeThumbBase) {
                gracefulImageRefresh(img, activeThumbBase);
            }
        }, 60000);

        window.thumbRefreshIntervals.push(refreshInterval);

        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'camera-thumb-overlay';
        overlay.style.zIndex = '20';
        
        const videoIcon = cam.type === 'video' ? '<i class="fa-solid fa-video" style="font-size: 0.6rem; opacity: 0.7; margin-right: 4px;"></i>' : '';
        
        overlay.innerHTML = `
            <div class="camera-thumb-overlay-text">${videoIcon}${cam.name}</div>
            <div class="camera-thumb-distance">
                <i class="fas fa-location-arrow"></i> 
                ${convertDistance(cam.distance, AppState.units.distance)} ${AppState.units.distance}
            </div>
        `;
        box.appendChild(overlay);

        // Add to DOM immediately
        if (slot) slot.appendChild(box);
        finalBoxes.push(box);
    }

    // Reveal boxes
    setTimeout(() => {
        finalBoxes.forEach(b => {
            b.classList.remove('camera-content-hidden');
            b.classList.add('camera-content-visible');
        });
        for (let i = nearest.length; i < 4; i++) {
            if (skeletonSlots[i]) skeletonSlots[i].style.display = 'none';
        }
    }, 100);

}
function captureVideoFrame(videoUrl, imgElement, boxElement) {
    // ADD THESE 6 LINES AT THE TOP:
    if (!window.activeVideoCaptures) window.activeVideoCaptures = 0;
    if (window.activeVideoCaptures >= 4) {
        showThumbError(boxElement);
        return;
    }
    window.activeVideoCaptures++;
    
    const proxyUrl = `https://secureproxy.xtremewx.com/camera/video?url=${encodeURIComponent(videoUrl)}`;
    // ... rest of your existing code
    const vid = document.createElement('video');
    vid.className = 'video-js vjs-default-skin';
    vid.setAttribute('playsinline', '');
    vid.setAttribute('muted', '');
    vid.muted = true;
    vid.crossOrigin = 'anonymous';
    vid.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%; z-index:1; object-fit:cover;';
    
    boxElement.appendChild(vid);

    let captured = false;
    let disposed = false;
    let player = null;

 const cleanup = () => {
    if (disposed) return;
    disposed = true;
    window.activeVideoCaptures--; // ADD THIS LINE
    if (player) {
        try { player.dispose(); } catch(e) {}
        player = null;
    }
};

    const showError = () => {
        if (captured) return;
        captured = true;
        cleanup();
        imgElement.style.display = 'none';
        showThumbError(boxElement);
    };

    const captureFrame = () => {
        if (captured || disposed) return false;
        
        try {
            const techEl = boxElement.querySelector('.vjs-tech') || boxElement.querySelector('video');
            if (techEl && techEl.readyState >= 2 && techEl.videoWidth > 0) {
                const canvas = document.createElement('canvas');
                canvas.width = techEl.videoWidth;
                canvas.height = techEl.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(techEl, 0, 0);
                
                const imageData = ctx.getImageData(0, 0, Math.min(50, canvas.width), Math.min(50, canvas.height));
                let sum = 0;
                for (let i = 0; i < imageData.data.length; i += 4) {
                    sum += imageData.data[i] + imageData.data[i+1] + imageData.data[i+2];
                }
                
                if (sum < 1000) {
                    return false;
                }
                
                captured = true;
                
                imgElement.src = canvas.toDataURL('image/jpeg', 0.85);
                imgElement.style.opacity = '1';
                imgElement.style.display = '';
                
                setTimeout(cleanup, 100);
                
                return true;
            }
        } catch (e) {}
        return false;
    };

    const timeout = setTimeout(showError, 15000);

    try {
        player = videojs(vid, {
            controls: false,
            autoplay: 'muted',
            muted: true,
            preload: 'auto',
            errorDisplay: false,
            html5: { 
                vhs: { 
                    enableLowInitialPlaylist: true,
                    overrideNative: true
                },
                nativeAudioTracks: false,
                nativeVideoTracks: false
            },
            sources: [{ src: proxyUrl, type: 'application/x-mpegURL' }]
        });

        player.on('error', () => {
            clearTimeout(timeout);
            showError();
        });

        player.on('timeupdate', function() {
            if (captured || disposed || !player) return;
            if (this.currentTime() > 0.1) {
                if (captureFrame()) {
                    clearTimeout(timeout);
                }
            }
        });

        player.on('playing', function() {
            setTimeout(() => {
                if (!captured && !disposed && player && captureFrame()) {
                    clearTimeout(timeout);
                }
            }, 500);
        });

        player.ready(function() {
            if (disposed || !player) return;
            const playPromise = player.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    if (disposed || !player) return;
                    try {
                        player.muted(true);
                        player.play().catch(() => {});
                    } catch(e) {}
                });
            }
        });

    } catch (e) {
        clearTimeout(timeout);
        showError();
    }
}

function showThumbError(box) {
    if (box.querySelector('.camera-error-overlay')) return;
    
    const errorOverlay = document.createElement('div');
    errorOverlay.className = 'camera-error-overlay';
    errorOverlay.innerHTML = `
        <i class="fa-solid fa-video-slash"></i>
        <span>Unavailable</span>
    `;
    box.appendChild(errorOverlay);
}

async function openCameraModal(index) {
    const cam = AppState.nearestCameras[index];
    if (!cam) return;

    document.getElementById('modal-camera-name').textContent = cam.name;
    document.getElementById('modal-camera-distance').textContent =
        `${convertDistance(cam.distance, AppState.units.distance)} ${AppState.units.distance}`;

    const container = document.getElementById('modal-camera-video');

    // Pause all thumbnail videos when opening modal
    if (window.gridPlayers) {
        window.gridPlayers.forEach(p => {
            if (p && !p.paused()) {
                try { p.pause(); } catch (e) {}
            }
        });
    }

    if (activePlayer) {
        try { activePlayer.dispose(); } catch (e) {}
        activePlayer = null;
    }
    if (modalImageInterval) {
        clearInterval(modalImageInterval);
        modalImageInterval = null;
    }

    document.getElementById('camera-modal').classList.add('active');
    lockScroll();

    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.aspectRatio = '16/9';

    if (cam.type === 'video') {
        if (!videojsLoaded) await loadVideoJS();

        const streamSource = getCameraStreamSource(cam);
        if (!streamSource) {
            showCameraError(container);
            return;
        }

        let videoType = 'application/x-mpegURL';
        if (streamSource.toLowerCase().includes('.mp4')) {
            videoType = 'video/mp4';
        }

        const vid = document.createElement('video');
        vid.className = 'video-js vjs-default-skin';
        vid.setAttribute('playsinline', '');
        vid.setAttribute('muted', '');
        vid.muted = true;
        vid.style.cssText = 'width: 100%; height: 100%; object-fit: contain;';

        container.appendChild(vid);

        const proxyUrl = `${CAMERA_PROXY_BASE}/camera/video?url=${encodeURIComponent(streamSource)}`;

        const player = videojs(vid, {
            controls: true,
            autoplay: 'muted',
            muted: true,
            preload: 'auto',
            fluid: false,
            fill: true,
            errorDisplay: false,
            html5: {
                vhs: {
                    enableLowInitialPlaylist: true,
                    bandwidth: window.innerWidth <= 768 ? 500000 : undefined,
                    limitRenditionByPlayerDimensions: true
                }
            },
            sources: [{ src: proxyUrl, type: videoType }]
        });

        activePlayer = player;
        
        // Auto-pause modal video after 3 minutes
        window.modalVideoTimeout = setTimeout(() => {
            if (activePlayer && !activePlayer.paused()) {
                activePlayer.pause();
            }
        }, 180000);

        player.ready(function() {
            if (activePlayer !== player) {
                try { player.dispose(); } catch (e) {}
                return;
            }

            player.on('loadedmetadata', function() {
                if (activePlayer !== player) return;
                const w = this.videoWidth();
                const h = this.videoHeight();
                if (w && h) container.style.aspectRatio = `${w}/${h}`;
            });

            player.on('error', function() {
                if (activePlayer !== player) return;
                showCameraError(container);
            });

            const playPromise = player.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    if (activePlayer === player && player.muted) {
                        player.muted(true);
                        player.play().catch(() => {});
                    }
                });
            }
        });

    } else {
        // FIX: Use cam.url instead of undefined imageUrl
        const imageUrl = cam.preview || cam.url;
        const thumbUrl = `${CAMERA_PROXY_BASE}/camera/image?url=${encodeURIComponent(imageUrl)}`;
        
        const img = document.createElement('img');
        img.style.cssText = 'width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity 0.3s ease;';

        img.onload = function() {
            container.style.aspectRatio = `${this.naturalWidth}/${this.naturalHeight}`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.style.opacity = '1';
                });
            });
        };

        img.onerror = function() {
            showCameraError(container);
        };

        container.appendChild(img);
        img.src = thumbUrl;

        modalImageInterval = setInterval(() => {
            gracefulImageRefresh(img, thumbUrl);
        }, 60000);
    }
}
function showCameraError(container) {
    const existing = container.querySelector('.camera-error-overlay');
    if (existing) return;

    const overlay = document.createElement('div');
    overlay.className = 'camera-error-overlay';
    overlay.innerHTML = `
        <i class="fa-solid fa-video-slash"></i>
        <span>Camera Unavailable</span>
    `;
    container.appendChild(overlay);
}

function closeCameraModal(event) {
    if (event && event.target.id !== 'camera-modal' && !event.target.closest('.camera-modal-close')) {
        return;
    }

    const modal = document.getElementById('camera-modal');
    
    // Add closing class FIRST for smooth fade
    modal.classList.add('modal-closing');

    // Clean up timers immediately
    if (modalImageInterval) {
        clearInterval(modalImageInterval);
        modalImageInterval = null;
    }
    
    if (window.modalVideoTimeout) {
        clearTimeout(window.modalVideoTimeout);
        window.modalVideoTimeout = null;
    }

    // Wait for fade, then dispose player and unlock
    setTimeout(() => {
        if (activePlayer) {
            try { activePlayer.dispose(); } catch (e) {}
            activePlayer = null;
        }
        
        document.getElementById('modal-camera-video').innerHTML = '';
        modal.classList.remove('active', 'modal-closing');
        unlockScroll();
    }, 200);
}

function gracefulImageRefresh(imgElement, newUrlBase) {
    if (!imgElement) return;

    const tempLoader = new Image();
    const newSrc = `${newUrlBase}&t=${Date.now()}`;

    tempLoader.onload = () => {
        imgElement.classList.add('image-fading-out');

        setTimeout(() => {
            imgElement.src = newSrc;
            requestAnimationFrame(() => {
                imgElement.classList.remove('image-fading-out');
            });
        }, 500);
    };

    tempLoader.onerror = () => {};
    tempLoader.src = newSrc;
}

// ========================================================================
// NWS TEXT FORMATTING
// ========================================================================
function formatNWSBody(text) {
    if (!text) return "No details available.";

    let clean = text;

    clean = clean.replace(/\n/g, ' ');
    clean = clean.replace(/\s+/g, ' ');
    clean = clean.replace(/(?:^|\s|\*|\-)(?:WHERE|AFFECTED AREA)(?:\.\.\.|:|;|,).*?(?=(?:WHAT|WHEN|IMPACTS|HAZARDS|WIND|HUMIDITY|ADDITIONAL DETAILS|PRECAUTIONARY)|$)/gi, '');

    const keywords = [
        "WHAT", "WHEN", "IMPACTS", "HAZARDS", "WIND", "HUMIDITY",
        "ADDITIONAL DETAILS", "PRECAUTIONARY/PREPAREDNESS ACTIONS"
    ];

    keywords.forEach(key => {
        const safeKey = key.replace(/\//g, '\\/');
        const regex = new RegExp(`(?:\\*|\\-|\\s)*(${safeKey})(?:\\.\\.\\.|:|,)`, 'gi');
        clean = clean.replace(regex, `<br><span class="alert-label">${key}:</span> `);
    });

    clean = clean.replace(/(THIS IS A PARTICULARLY DANGEROUS SITUATION)/gi, '<br><strong>$1</strong>');
    clean = clean.replace(/\.\.\./g, ', ');
    clean = clean.replace(/^[\s,\.]+(?:<br>)?/, '').trim();

    while (clean.startsWith('<br>')) {
        clean = clean.substring(4).trim();
    }

    return clean;
}

function parseNWSDate(dateStr, lat, lon) {
    if (!dateStr) return null;

    const parts = dateStr.match(/(\d+)\s+([A-Za-z]+)\s+(\d+):(\d+)\s*(am|pm)?/i);

    if (parts) {
        const now = new Date();
        const day = parseInt(parts[1]);
        const monthStr = parts[2];
        let hours = parseInt(parts[3]);
        const minutes = parseInt(parts[4]);
        const meridiem = parts[5] ? parts[5].toLowerCase() : null;

        if (meridiem === 'pm' && hours < 12) hours += 12;
        if (meridiem === 'am' && hours === 12) hours = 0;

        const months = {
            'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
            'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
        };

        const month = months[monthStr.toLowerCase().substring(0, 3)];
        if (month === undefined) return new Date(dateStr);

        let year = now.getFullYear();
        if (now.getMonth() === 0 && month === 11) year--;
        if (now.getMonth() === 11 && month === 0) year++;

        let obsTime = Date.UTC(year, month, day, hours, minutes);

        let offsetHours = 0;

        if (lon > 143 && lon < 147) offsetHours = 10;
        else if (lon < -154 && lon > -162) offsetHours = -10;
        else if (lon < -130) offsetHours = -9;
        else if (lon < -114) offsetHours = -8;
        else if (lon < -102) offsetHours = -7;
        else if (lon < -86) offsetHours = -6;
        else offsetHours = -5;

        obsTime = obsTime - (offsetHours * 60 * 60 * 1000);

        return new Date(obsTime);
    }

    if (dateStr.match(/\d{4}/)) {
        let date = new Date(dateStr);
        if (!isNaN(date.getTime())) return date;
    }

    return null;
}

const US_STATE_TO_ABBR = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR", "California": "CA",
    "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE", "Florida": "FL", "Georgia": "GA",
    "Hawaii": "HI", "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA",
    "Kansas": "KS", "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
    "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS", "Missouri": "MO",
    "Montana": "MT", "Nebraska": "NE", "Nevada": "NV", "New Hampshire": "NH", "New Jersey": "NJ",
    "New Mexico": "NM", "New York": "NY", "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH",
    "Oklahoma": "OK", "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
    "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT", "Vermont": "VT",
    "Virginia": "VA", "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY",
    "District of Columbia": "DC",
    "Puerto Rico": "PR",
    "Guam": "GU",
    "American Samoa": "AS",
    "United States Virgin Islands": "VI",
    "Virgin Islands": "VI",
    "Northern Mariana Islands": "MP"
};

// Replace the toggleSearch function with this:
function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    const triggerBtn = document.getElementById('search-trigger');
    const hamburgerBtn = document.getElementById('mobile-trigger');
    const gpsBtn = document.getElementById('search-gps-btn');
    const gpsSpan = gpsBtn.querySelector('span');
    const gpsIcon = gpsBtn.querySelector('i');

    const isActive = overlay.classList.contains('active');

    if (isActive) {
        overlay.classList.remove('active');
        triggerBtn.classList.remove('active');
        unlockScroll();

        if (hamburgerBtn) {
            hamburgerBtn.classList.remove('nav-btn-disabled');
        }

    } else {
        if (hamburgerBtn) {
            hamburgerBtn.classList.add('nav-btn-disabled');
        }

        overlay.classList.add('active');
        triggerBtn.classList.add('active');
        lockScroll();

        renderFavoritesList();

        if (AppState.usingGPS) {
            gpsSpan.textContent = "Using Precise Location";
            gpsIcon.className = "fas fa-check";
            gpsBtn.style.opacity = "0.5";
            gpsBtn.style.pointerEvents = "none";
        } else {
            gpsSpan.textContent = "Use Current Location";
            gpsIcon.className = "fas fa-location-arrow";
            gpsBtn.style.opacity = "1";
            gpsBtn.style.pointerEvents = "auto";
        }

        setTimeout(() => input.focus(), 150);
    }
}

function closeSearch(event) {
    if (event && event.target.id !== 'search-overlay') return;

    const overlay = document.getElementById('search-overlay');
    if (overlay.classList.contains('active')) toggleSearch();
}

function handleSearchInput(e) {
    const query = e.target.value.trim();
    const resultsContainer = document.getElementById('search-results');

    if (AppState.searchTimeout) clearTimeout(AppState.searchTimeout);

    if (query.length < 2) {
        resultsContainer.classList.remove('has-data');
        setTimeout(() => {
            if (!resultsContainer.classList.contains('has-data')) {
                resultsContainer.innerHTML = '';
            }
        }, 400);
        return;
    }

    AppState.searchTimeout = setTimeout(() => {
        fetchSearchResults(query);
    }, CONFIG.SEARCH_DELAY);
}

async function fetchSearchResults(query) {
    const resultsContainer = document.getElementById('search-results');

    try {
        const trimmed = query.trim();
        let results = [];

        if (/^\d{5}$/.test(trimmed)) {
            // ZIP code path
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${trimmed},US&appid=${CONFIG.OWM_GEO_KEY}`);
            if (res.ok) {
                const d = await res.json();
                if (d && d.name && d.lat) {
                    const abbr = STATE_ABBR[d.state] || d.state || '';
                    const displayName = abbr ? `${d.name}, ${abbr}` : d.name;
                    results = [{ lat: d.lat, lon: d.lon, displayName }];
                }
            }
        } else {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(trimmed)},US&limit=5&appid=${CONFIG.OWM_GEO_KEY}`);
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    results = data.map(r => {
                        const abbr = STATE_ABBR[r.state] || r.state || '';
                        const displayName = abbr ? `${r.name}, ${abbr}` : r.name;
                        return { lat: r.lat, lon: r.lon, displayName };
                    });
                }
            }
        }

        if (results.length > 0) {
            resultsContainer.innerHTML = results.map((r, index) => `
                <div class="resultitem"
                     style="animation-delay: ${index * 0.05}s"
                     data-lat="${r.lat}"
                     data-lon="${r.lon}"
                     data-name="${r.displayName.replace(/"/g, '&quot;')}">
                    <i class="fas fa-map-marker-alt"></i> ${r.displayName}
                </div>
            `).join('');

            resultsContainer.querySelectorAll('.resultitem').forEach(item => {
                item.addEventListener('click', async function() {
                    if (this.classList.contains('selecting')) return;
                    this.classList.add('selecting');
                    this.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
                    this.style.transform = 'scale(0.95)';
                    this.style.opacity = '0.6';
                    await new Promise(resolve => setTimeout(resolve, 100));
                    const lat = parseFloat(this.dataset.lat);
                    const lon = parseFloat(this.dataset.lon);
                    const name = this.dataset.name;
                    AppState.usingGPS = false;
                    selectLocation(lat, lon, name);
                });
            });

            resultsContainer.classList.add('has-data');
        } else {
            resultsContainer.classList.remove('has-data');
        }
    } catch (error) {
        resultsContainer.classList.remove('has-data');
    }
}

function openSearchFromLocation() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const overlay = document.getElementById('search-overlay');
    if (!overlay.classList.contains('active')) {
        toggleSearch();
    }
}

function showSwitchingPill(cityName) {
    let pill = document.getElementById('switching-pill');
    if (!pill) {
        pill = document.createElement('div');
        pill.id = 'switching-pill';
        pill.className = 'switching-pill';
        document.body.appendChild(pill);
    }
    pill.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i><span>Switching to ${cityName}</span>`;
    pill.getBoundingClientRect(); // force reflow
    pill.classList.add('visible');
}

function hideSwitchingPill() {
    const pill = document.getElementById('switching-pill');
    if (!pill) return;
    pill.classList.remove('visible');
    setTimeout(() => pill.remove(), 400);
}

function transitionContentFastOut() {
    const items = document.querySelectorAll('.current-card, .info-card, .greeting, .location-controls');
    const hourlySection = document.getElementById('hourly-forecast-section');
    items.forEach(el => {
        el.style.transition = 'opacity 0.2s ease';
        el.classList.remove('is-loaded');
    });
    if (hourlySection) {
        hourlySection.style.transition = 'opacity 0.2s ease';
        hourlySection.classList.remove('is-loaded');
    }
    // Clear inline overrides after out is done so CSS handles the staggered in-animation
    setTimeout(() => {
        items.forEach(el => { el.style.transition = ''; });
        if (hourlySection) hourlySection.style.transition = '';
    }, 300);
}

async function selectLocation(lat, lon, displayName) {
    console.log('📍 Location selected:', displayName);
    
    // Fade out and close search overlay
    const overlay = document.getElementById('search-overlay');
    const searchResults = document.getElementById('search-results');

    if (overlay) {
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '0';
    }
    if (searchResults) {
        searchResults.style.transition = 'opacity 0.2s ease, max-height 0.3s ease';
        searchResults.style.opacity = '0';
        searchResults.style.maxHeight = '0';
    }

    await new Promise(resolve => setTimeout(resolve, 250));

    if (overlay && overlay.classList.contains('active')) toggleSearch();
    if (overlay) { overlay.style.opacity = ''; overlay.style.transition = ''; }
    if (searchResults) {
        searchResults.style.opacity = '';
        searchResults.style.maxHeight = '';
        searchResults.style.transition = '';
    }

    const input = document.getElementById('search-input');
    if (input) input.value = '';
    const resultsContainer = document.getElementById('search-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
        resultsContainer.classList.remove('has-data');
    }

    // Update state & UI (cards stay visible while we fetch)
    AppState.lat = parseFloat(lat);
    AppState.lon = parseFloat(lon);
    AppState.currentLocationName = displayName;
    AppState.bgUrl = null;
    AppState.lastVisualKey = '';

    const newUrl = `${window.location.pathname}?location=${encodeURIComponent(displayName)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    // Show pill — old cards stay visible during fetch
    showSwitchingPill(displayName);
    const pillStart = Date.now();

    try {
        const weather = await fetchWeather(AppState.lat, AppState.lon);
        // skipUI=true: only updates AppState.activeAlerts/alertRank, no banner DOM yet
        const alertRank = await fetchAlerts(AppState.lat, AppState.lon, weather, true);
        AppState.alertRank = alertRank;

        // Pill must be visible for at least 1s so it doesn't just flash
        const elapsed = Date.now() - pillStart;
        if (elapsed < 1000) {
            await new Promise(resolve => setTimeout(resolve, 1000 - elapsed));
        }

        // Fade banner out alongside cards so it doesn't snap away while old content is visible
        const alertBanner = document.getElementById('alert-banner');
        const mainContent = document.getElementById('main-content');
        if (alertBanner && alertBanner.classList.contains('active')) {
            alertBanner.style.transition = 'opacity 0.2s ease';
            alertBanner.style.opacity = '0';
        }

        // Fast-out cards (0.2s)
        transitionContentFastOut();
        await new Promise(resolve => setTimeout(resolve, 220));

        // Everything invisible — snap-settle layout with no visible impact
        if (alertBanner) {
            alertBanner.style.transition = 'none';
            alertBanner.style.opacity = '';
            alertBanner.className = 'alert-banner'; // clear active + severity classes
            mainContent.classList.remove('has-alert');
            alertBanner.getBoundingClientRect(); // flush
            // Pre-settle padding if new location has alerts (avoids layout shift during card fade-in)
            if (AppState.activeAlerts && AppState.activeAlerts.length > 0) {
                mainContent.style.transition = 'none';
                mainContent.classList.add('has-alert');
                mainContent.getBoundingClientRect(); // flush
                mainContent.style.transition = '';
            }
            alertBanner.style.transition = '';
        }

        // Everything is invisible — apply new alert banner, render content
        flushAlertBanner();
        renderWeather(weather, alertRank);
        loadNearbyCameras(AppState.lat, AppState.lon).catch(() => {});
        startAutoRefresh();

        // Let pill fade and banner fully settle before cards stagger in
        hideSwitchingPill();
        await new Promise(resolve => setTimeout(resolve, 400));
        transitionContent(true);

        setTimeout(async () => {
            try {
                const periods = await fetchHourlyForecast(AppState.lat, AppState.lon);
                renderHourlyGraph(periods);
            } catch (err) {
                renderHourlyGraph(null);
            }
        }, 300);

    } catch (error) {
        hideSwitchingPill();
        showGlobalError('Unable to Load', 'We could not fetch weather data.');
        transitionContent(true);
    }
}

// ========================================================================
// RENDER WEATHER
// ========================================================================
function renderWeather(data, alertRank = 0) {
    if (!data) return;
    window.lastWeatherData = data;
    const { location, current, forecast, creationDate, obsDateString, dataComplete, station } = data;

    if (!AppState.currentLocationName ||
        AppState.currentLocationName === 'Unknown' ||
        AppState.currentLocationName === 'Loading...') {

        let cleanCity = location.city || 'Unknown City';
        let cleanState = location.state || '';
        if (!cleanState && station.includes(',')) {
            const parts = station.split(',');
            if (parts.length > 1) {
                const possibleState = parts[1].trim().split(' ')[0];
                if (possibleState.length === 2 && possibleState === possibleState.toUpperCase()) {
                    cleanState = possibleState;
                }
            }
        }

        const fullName = cleanState ? `${cleanCity}, ${cleanState}` : cleanCity;
        AppState.currentLocationName = fullName;
    }

    const locTextEl = document.getElementById('location-text')?.querySelector('span');
    const locIcon = document.getElementById('location-text')?.querySelector('i');

    if (locTextEl) {
        let displayText = AppState.currentLocationName;
        if (AppState.usingGPS && !displayText.includes('(Precise)')) {
            displayText += ' (Precise)';
        }
        locTextEl.textContent = displayText;
    }

    if (locIcon) {
        locIcon.className = AppState.usingGPS ? "fas fa-location-arrow" : "fas fa-map-marker-alt";
    }

    const sunrise = data.lifestyle?.astro?.sunrise || '--';
    const sunset = data.lifestyle?.astro?.sunset || '--';
    const isDay = isDaytime(sunrise, sunset);
    const hasWarning = (alertRank >= 3);

    const getFaIcon = (cond, day) => {
        const c = (cond || '').toLowerCase();
        if (c.includes('thunder') || c.includes('storm')) return 'fa-bolt';
        if (c.includes('snow') || c.includes('flurries')) return 'fa-snowflake';
        if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return 'fa-cloud-showers-heavy';
        if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return 'fa-smog';
        if (c.includes('windy')) return 'fa-wind';
        if (c.includes('cloud') || c.includes('overcast')) return 'fa-cloud';
        return day ? 'fa-sun' : 'fa-moon';
    };

    let conditionText = current.Weather ? current.Weather.trim() : 'Unknown';
    if (conditionText === 'NA') conditionText = 'Unknown';
    const faIconClass = getFaIcon(conditionText, isDay);

    const mobileNowIcon = document.querySelector('.mobile-bottom-nav .bottom-nav-item:first-child i');
    if (mobileNowIcon) {
        mobileNowIcon.className = `fas ${faIconClass}`;
    }

    const desktopNowIcon = document.getElementById('desktop-now-icon');
    if (desktopNowIcon) {
        desktopNowIcon.className = `fas ${faIconClass}`;
    }

    const currentVisualKey = `${station}-${current.Weather}-${hasWarning}-${isDay}`;
    if (currentVisualKey !== AppState.lastVisualKey || !AppState.bgUrl) {
        const greeting = getGreeting(AppState.lat, AppState.lon, current.Weather, isDay, AppState.activeAlerts);
        const greetingEl = document.getElementById('greeting');
        if (greetingEl) greetingEl.textContent = greeting;

        let bgCondition = current.Weather;
        if (!bgCondition || bgCondition === 'NA') bgCondition = 'cloudy';
        const bgUrl = getBackgroundUrl(bgCondition, hasWarning, isDay);

        if (bgUrl !== AppState.bgUrl) {
            AppState.bgUrl = bgUrl;
            const bgEl = document.getElementById('hero-bg');

            document.documentElement.style.setProperty('--modal-bg', `url(${bgUrl})`);
            const isFirstLoad = !bgEl.style.backgroundImage;
            const img = new Image();
            img.onload = () => {
                if (isFirstLoad) {
                    bgEl.style.backgroundImage = `url(${bgUrl})`;
                    void bgEl.offsetWidth;

                    requestAnimationFrame(() => {
                        bgEl.classList.add('loaded');
                    });

                } else {
                    const beforeStyle = document.createElement('style');
                    beforeStyle.textContent = `.hero-bg::before { background-image: url(${bgUrl}); }`;
                    document.head.appendChild(beforeStyle);

                    requestAnimationFrame(() => {
                        bgEl.classList.add('crossfading');
                    });

                    setTimeout(() => {
                        bgEl.style.backgroundImage = `url(${bgUrl})`;
                        bgEl.classList.remove('crossfading');
                        bgEl.classList.add('loaded');
                        beforeStyle.remove();
                    }, 600);
                }

                const bottomNav = document.querySelector('.mobile-bottom-nav');
                if (bottomNav) bottomNav.classList.remove('nav-updating');
            };

            img.src = bgUrl;
        } else {
            const bgEl = document.getElementById('hero-bg');
            if (!bgEl.classList.contains('loaded')) {
                bgEl.classList.add('loaded');
            }
        }
        AppState.lastVisualKey = currentVisualKey;
    }

    const currentCard = document.getElementById('current-card');
    if (!document.getElementById('station-name')) {
        currentCard.innerHTML = `
            <div class="observation-meta">
                <div class="station-name"><i class="fas fa-broadcast-tower"></i> <span id="station-name">Loading...</span></div>
                <div class="obs-time-line"><i class="fas fa-clock"></i> <span id="obs-time">--</span></div>
            </div>
            <div id="partial-warning-container"></div>
            <div class="temp-group"><div class="temp-main" id="temp-main">--°</div></div>
            <div class="condition-main" id="condition-main">
                <div id="icon-condition" class="condition-icon"></div>
                <span>Loading...</span>
            </div>
            <div class="feels-like" id="feels-like">--</div>
            <div class="stats-grid" id="stats-grid"></div>
        `;
    }

    document.getElementById('station-name').textContent = station || 'an unknown station';

    const obsTimeEl = document.getElementById('obs-time');
    const obsDate = parseNWSDate(obsDateString || creationDate, AppState.lat, AppState.lon);

    if (obsDate) {
        const diffMs = new Date() - obsDate;
        const minutesAgo = Math.floor(diffMs / 60000);
        if (minutesAgo < 1) obsTimeEl.textContent = `Updated just now`;
        else if (minutesAgo < 60) obsTimeEl.textContent = `Updated ${minutesAgo}m ago`;
        else obsTimeEl.textContent = `Updated ${Math.floor(minutesAgo / 60)}h ago`;

        if (minutesAgo > 120) obsTimeEl.classList.add('data-stale');
        else obsTimeEl.classList.remove('data-stale');
    } else {
        obsTimeEl.textContent = 'Update time unavailable';
    }

    const temp = !isEmpty(current.Temp) ? parseFloat(current.Temp) : null;
    if (temp === null) {
        currentCard.innerHTML = `
            <div class="glass-error">
                <i class="fas fa-satellite-dish" style="opacity: 0.5; font-size: 2.5rem; margin-bottom: 1rem;"></i>
                <div class="glass-error-title" style="font-size: 1.1rem;">Observation Unavailable</div>
                <div class="glass-error-text" style="opacity: 0.7; max-width: 300px; margin: 0.5rem auto;">
                    We hit a snag fetching data from <strong>${station}</strong>. The forecast provided may still be accurate.
                </div>
            </div>
        `;
    } else {
        const tempEl = document.getElementById('temp-main');
        if (tempEl) tempEl.textContent = `${convertTemp(temp, AppState.units.temp)}°${AppState.units.temp}`;
        document.querySelector('#condition-main span').textContent = conditionText;

        const displayTemp = `${convertTemp(temp, AppState.units.temp)}°${AppState.units.temp}`;
        updateMetaTags(AppState.currentLocationName, displayTemp, conditionText);

        const iconKey = getIconKey(current.Weather, isDay);
        const iconSvg = CONFIG.ICONS[iconKey] || CONFIG.ICONS['cloudy'];
        document.getElementById('icon-condition').innerHTML = iconSvg;

        let feelsLike = temp;
        if (!isEmpty(current.WindChill)) feelsLike = current.WindChill;
        else if (!isEmpty(current.HeatIndex)) feelsLike = current.HeatIndex;
        else if (!isEmpty(current.Windchill)) feelsLike = current.Windchill;
        document.getElementById('feels-like').textContent = `Feels like ${convertTemp(feelsLike, AppState.units.temp)}°${AppState.units.temp}`;

        if (dataComplete) hidePartialDataWarning();
        else showPartialDataWarning('Current conditions unavailable');

        const statsGrid = document.getElementById('stats-grid');
        statsGrid.innerHTML = '';
        const stats = [];

        if (!isEmpty(current.Winds)) {
            let val = convertSpeed(current.Winds, AppState.units.speed);
            if (!isEmpty(current.Windd)) val += ` ${AppState.units.speed} ${getCardinalDirection(current.Windd) || ''}`;
            else val += ` ${AppState.units.speed}`;
            stats.push({ label: 'Wind', value: val, icon: 'fa-wind' });
        }
        if (!isEmpty(current.Gust)) {
            stats.push({ label: 'Wind Gusts', value: `${convertSpeed(current.Gust, AppState.units.speed)} ${AppState.units.speed}`, icon: 'fa-flag' });
        }
        if (!isEmpty(current.Relh)) {
            stats.push({ label: 'Humidity', value: `${current.Relh}%`, icon: 'fa-droplet' });
        }
        if (!isEmpty(current.Dewp)) {
            stats.push({ label: 'Dew Point', value: `${convertTemp(current.Dewp, AppState.units.temp)}°${AppState.units.temp}`, icon: 'fa-water' });
        }
        if (!isEmpty(current.WindChill)) {
            stats.push({ label: 'Wind Chill', value: `${convertTemp(current.WindChill, AppState.units.temp)}°${AppState.units.temp}`, icon: 'fa-temperature-low' });
        }
        if (!isEmpty(current.HeatIndex)) {
            stats.push({ label: 'Heat Index', value: `${convertTemp(current.HeatIndex, AppState.units.temp)}°${AppState.units.temp}`, icon: 'fa-temperature-high' });
        }
        if (!isEmpty(current.Visibility)) {
            stats.push({ label: 'Visibility', value: `${convertDistance(current.Visibility, AppState.units.distance)} ${AppState.units.distance}`, icon: 'fa-eye' });
        }
        if (!isEmpty(current.SLP)) {
            stats.push({ label: 'Pressure', value: `${convertPressure(current.SLP, AppState.units.pressure)} ${AppState.units.pressure}`, icon: 'fa-gauge-high' });
        }

        stats.forEach(stat => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.innerHTML = `<i class="fas ${stat.icon} stat-bg-icon"></i><div class="stat-label">${stat.label}</div><div class="stat-value">${stat.value}</div>`;
            statsGrid.appendChild(statItem);
        });
    }

    if (data.lifestyle) {
        const ls = data.lifestyle;
        const section = document.getElementById('lifestyle-section');

        renderAQI(ls.aqi);
        renderUV(ls.uv);

        if (ls.pollen) {
            renderPollen(ls.pollen.grass, ls.pollen.tree, ls.pollen.weed);
        }

        if (ls.astro) {
            renderSunGraphic(ls.astro);
        }

        if (ls.minutely && ls.minutely.length > 0) {
            renderMinutelyForecast(ls.minutely);
        }

        updateLifestyleBackground(ls.aqi, ls.uv, ls.pollen);

        if (section) {
            requestAnimationFrame(() => section.classList.add('is-loaded'));
        }
    }

    const forecastContainer = document.querySelector('.side-cards .info-card:nth-child(1)');
    const forecastTitle = forecastContainer.querySelector('.info-card-title');
    const forecastContent = document.getElementById('today-forecast');

    const tz = getTimezone(AppState.lat, AppState.lon);
    let hourLabel;
    try {
        const hourStr = new Date().toLocaleString('en-US', { timeZone: tz, hour: 'numeric', hour12: false });
        hourLabel = parseInt(hourStr);
    } catch (e) {
        hourLabel = new Date().getHours();
    }

    let timeLabel = "Today's Forecast";
    if (hourLabel >= 0 && hourLabel < 5) timeLabel = "Tonight's Forecast";
    else if (hourLabel >= 5 && hourLabel < 12) timeLabel = "This Morning's Forecast";
    else if (hourLabel >= 12 && hourLabel < 17) timeLabel = "This Afternoon's Forecast";
    else if (hourLabel >= 17 && hourLabel < 21) timeLabel = "This Evening's Forecast";
    else timeLabel = "Tonight's Forecast";

    forecastTitle.innerHTML = `<span><i class="fas ${faIconClass}"></i> ${timeLabel}</span>`;

    if (forecast && forecast.text && forecast.text.length > 0) {
        const sunHtml = `
            <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1.5rem; padding-top: 1.2rem; border-top: 1px solid rgba(255,255,255,0.1); opacity: 0.9;">
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <i class="fas fa-arrow-up" style="color: #fbbf24; font-size: 1.1rem;"></i>
                    <span style="font-weight: 700; font-size: 0.95rem;">${sunrise}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <i class="fas fa-arrow-down" style="color: #f97316; font-size: 1.1rem;"></i>
                    <span style="font-weight: 700; font-size: 0.95rem;">${sunset}</span>
                </div>
            </div>
        `;
        forecastContent.innerHTML = `
            <div style="font-size: 0.95rem; line-height: 1.6; opacity: 0.85;">
                ${forecast.text[0]}
            </div>
            ${sunHtml}
        `;
    } else {
        forecastContent.innerHTML = '<span style="opacity:0.6">Forecast text unavailable.</span>';
    }

    updateFavoriteBtnState();
}

function renderMinutelyForecast(minutely) {
    const container = document.getElementById('today-forecast');

    const hasPrecip = minutely.some(m => m.precipitation > 0);

    if (hasPrecip) {
        const maxPrecip = Math.max(...minutely.map(m => m.precipitation));
        const minutelyHTML = `
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="font-weight: 700; margin-bottom: 0.5rem;">
                    <i class="fas fa-cloud-rain"></i> Next Hour
                </div>
                <div style="font-size: 0.9rem; opacity: 0.85;">
                    Precipitation expected: ${maxPrecip.toFixed(2)}mm peak
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', minutelyHTML);
    }
}

// Replace the existing startAutoRefresh function with this updated version:

function startAutoRefresh() {
    if (AppState.intervals.weather) clearInterval(AppState.intervals.weather);
    if (AppState.intervals.alerts) clearInterval(AppState.intervals.alerts);
    if (AppState.intervals.images) clearInterval(AppState.intervals.images);

    AppState.intervals.weather = setInterval(async () => {
        try {
            const weather = await fetchWeather(AppState.lat, AppState.lon);
            if (weather) {
                renderWeather(weather, AppState.alertRank);
            }
        } catch (error) {}
    }, 600000);

    // UPDATED: Now checks if alert rank changed and updates background
    AppState.intervals.alerts = setInterval(async () => {
        try {
            const oldAlertRank = AppState.alertRank;
            const newAlertRank = await fetchAlerts(AppState.lat, AppState.lon, null);
            
            // If alert severity changed, force background update
            if (oldAlertRank !== newAlertRank && window.lastWeatherData) {
                AppState.alertRank = newAlertRank;
                
                // Force visual key reset to trigger background change
                AppState.lastVisualKey = '';
                
                renderWeather(window.lastWeatherData, newAlertRank);
            }
        } catch (error) {}
    }, 60000);

    AppState.intervals.images = setInterval(() => {
    const gridImages = document.querySelectorAll('.camera-thumb img');
    gridImages.forEach(img => {
        if (img.src.includes('secureproxy.xtremewx.com/camera')) {
            const cleanSrc = img.src.split('&t=')[0];
            gracefulImageRefresh(img, cleanSrc);
        }
    });
}, 60000);
}
// ========================================================================
// INITIALIZATION
// ========================================================================
async function init() {
    setupGlobalEvents();
setupLazyRendering(); // ADD THIS LINE

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const latParam = urlParams.get('lat');
        const lonParam = urlParams.get('lon');
        const locationParam = urlParams.get('location');

        if (latParam && lonParam) {
            const lat = parseFloat(latParam);
            const lon = parseFloat(lonParam);

            if (!isNaN(lat) && !isNaN(lon)) {
                const res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${CONFIG.OWM_GEO_KEY}`);
                const data = await res.json();
                const place = Array.isArray(data) ? data[0] : data;
                const abbr = STATE_ABBR[place?.state] || place?.state || '';
                const cleanName = place ? (abbr ? `${place.name}, ${abbr}` : place.name) : `${lat.toFixed(2)}, ${lon.toFixed(2)}`;

                AppState.lat = lat;
                AppState.lon = lon;
                AppState.currentLocationName = cleanName;

                const locTextEl = document.getElementById('location-text').querySelector('span');
                if (locTextEl) locTextEl.textContent = cleanName;

                const weatherPromise = fetchWeather(AppState.lat, AppState.lon);
                const hourlyPromise = fetchHourlyForecast(AppState.lat, AppState.lon);

                const weather = await weatherPromise;
                const alertPromise = fetchAlerts(AppState.lat, AppState.lon, weather);

                const [rank, hourlyPeriods] = await Promise.all([alertPromise, hourlyPromise]);

                AppState.alertRank = rank;
                renderWeather(weather, rank);

                // Load cameras after 2 seconds
setTimeout(() => {
    loadNearbyCameras(AppState.lat, AppState.lon);
}, 2000);

                renderHourlyGraph(hourlyPeriods);

                startAutoRefresh();

                requestAnimationFrame(() => transitionContent(true));
                return;
            }
        }

        if (locationParam) {
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationParam)},US&limit=1&appid=${CONFIG.OWM_GEO_KEY}`);
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                const place = data[0];
                const abbr = STATE_ABBR[place.state] || place.state || '';
                const cleanName = abbr ? `${place.name}, ${abbr}` : place.name;

                AppState.lat = parseFloat(place.lat);
                AppState.lon = parseFloat(place.lon);
                AppState.currentLocationName = cleanName;

                const locTextEl = document.getElementById('location-text').querySelector('span');
                if (locTextEl) locTextEl.textContent = cleanName;

                const weatherPromise = fetchWeather(AppState.lat, AppState.lon);
                const alertPromise = fetchAlerts(AppState.lat, AppState.lon);

                const [weather, rank] = await Promise.all([weatherPromise, alertPromise]);

                AppState.alertRank = rank;
                renderWeather(weather, rank);

                loadNearbyCameras(AppState.lat, AppState.lon);

                fetchHourlyForecast(AppState.lat, AppState.lon).then(periods => {
                    renderHourlyGraph(periods);
                });

                startAutoRefresh();

                requestAnimationFrame(() => transitionContent(true));
                return;
            }
        }
    } catch (e) {}

    const CACHE_KEY = 'cached_coords';
    const cachedRaw = localStorage.getItem(CACHE_KEY);
    let usedCache = false;

    if (cachedRaw) {
        try {
            const cache = JSON.parse(cachedRaw);
            if (Date.now() - cache.timestamp < 24 * 60 * 60 * 1000) {
                AppState.lat = cache.data.lat;
                AppState.lon = cache.data.lon;
                AppState.currentLocationName = cache.data.name;

                const locTextEl = document.getElementById('location-text').querySelector('span');
                if (locTextEl) locTextEl.textContent = cache.data.name;

                const weatherPromise = fetchWeather(AppState.lat, AppState.lon);
                const alertPromise = fetchAlerts(AppState.lat, AppState.lon);
                const hourlyPromise = fetchHourlyForecast(AppState.lat, AppState.lon);

                const [weather, rank, hourlyPeriods] = await Promise.all([weatherPromise, alertPromise, hourlyPromise]);

                AppState.alertRank = rank;
                renderWeather(weather, rank);

                renderHourlyGraph(hourlyPeriods);

                loadNearbyCameras(AppState.lat, AppState.lon);

                startAutoRefresh();

                setTimeout(() => {
                    transitionContent(true);
                }, 150);

                usedCache = true;
            }
        } catch (e) {
            localStorage.removeItem(CACHE_KEY);
        }
    }

    if (!usedCache) {
        try {
            const loc = await getLocation();
            await selectLocation(loc.lat, loc.lon, loc.name);
        } catch (error) {
            showGlobalError('Location Error', 'Could not detect your location.');
        }
    }
}

// Replace the toggleMobileMenu function with this:
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-trigger');
    const searchBtn = document.getElementById('search-trigger');

    const isActive = menu.classList.contains('active');

    if (isActive) {
        menu.classList.remove('active');
        btn.classList.remove('active');
        unlockScroll();

        if (searchBtn) {
            searchBtn.classList.remove('nav-btn-disabled');
        }

        setTimeout(() => closeSubMenu(), 300);

    } else {
        if (searchBtn) {
            searchBtn.classList.add('nav-btn-disabled');
        }

        menu.classList.add('active');
        btn.classList.add('active');
        lockScroll();
    }
}

function openSubMenu(menuId) {
    document.getElementById('mobile-menu').classList.add('sub-active');
    document.querySelectorAll('.sub-view').forEach(el => el.classList.remove('active'));
    const sub = document.getElementById(`sub-menu-${menuId}`);
    if (sub) sub.classList.add('active');
}

function closeSubMenu() {
    document.getElementById('mobile-menu').classList.remove('sub-active');
    document.querySelectorAll('.sub-view').forEach(el => el.classList.remove('active'));
}

document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
        if (this.getAttribute('onclick')) return;

        const bottomNav = document.querySelector('.mobile-bottom-nav');

        document.querySelectorAll('.bottom-nav-item').forEach(el => el.classList.remove('active'));
        this.classList.add('active');

        bottomNav.classList.add('nav-updating');
        setTimeout(() => {
            bottomNav.classList.remove('nav-updating');
        }, 150);
    });
});

// Replace the existing window resize listener with this:
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 1024) {
        const menu = document.getElementById('mobile-menu');
        if (menu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}, 150)); // Only fire after 150ms of no resizing

document.querySelectorAll('.has-dropdown[data-menu]').forEach(item => {
    const menuName = item.getAttribute('data-menu');
    const megaMenu = document.getElementById(`${menuName}-mega-menu`);

    if (!megaMenu) return;

    let menuTimeout;

    item.addEventListener('mouseenter', () => {
        clearTimeout(menuTimeout);
        megaMenu.style.opacity = '1';
        megaMenu.style.visibility = 'visible';
        megaMenu.style.pointerEvents = 'auto';
        megaMenu.style.transform = 'translateX(-50%) translateY(0)';
    });

    item.addEventListener('mouseleave', () => {
        menuTimeout = setTimeout(() => {
            megaMenu.style.opacity = '0';
            megaMenu.style.visibility = 'hidden';
            megaMenu.style.pointerEvents = 'none';
            megaMenu.style.transform = 'translateX(-50%) translateY(20px)';
        }, 100);
    });

    megaMenu.addEventListener('mouseenter', () => {
        clearTimeout(menuTimeout);
    });

    megaMenu.addEventListener('mouseleave', () => {
        megaMenu.style.opacity = '0';
        megaMenu.style.visibility = 'hidden';
        megaMenu.style.pointerEvents = 'none';
        megaMenu.style.transform = 'translateX(-50%) translateY(20px)';
    });
});

function setupGlobalEvents() {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            if (gridPlayers && gridPlayers.length > 0) {
                gridPlayers.forEach(player => {
                    if (player && player.paused()) {
                        player.play().catch(() => {});
                    }
                });
            }

            if (activePlayer && activePlayer.paused() && document.getElementById('camera-modal').classList.contains('active')) {
                activePlayer.play().catch(() => {});
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const cameraModal = document.getElementById('camera-modal');
            const alertModal = document.getElementById('alert-modal');
            const shareModal = document.getElementById('share-modal');
            const searchOverlay = document.getElementById('search-overlay');

            const coverageModal = document.getElementById('coverage-modal');
            if (cameraModal.classList.contains('active')) closeCameraModal();
            else if (alertModal.classList.contains('active')) closeAlertModal();
            else if (shareModal.classList.contains('active')) closeShareModal();
            else if (coverageModal && coverageModal.classList.contains('active')) CoverageMode.closeModal();
            else if (searchOverlay.classList.contains('active')) toggleSearch();
        }
    });
}

init();

// MOBILE: Disable ALL hover events
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
    
    // Kill hover events by preventing mouseover/mouseenter
    document.addEventListener('mouseover', function(e) {
        e.stopPropagation();
    }, true);
    
    document.addEventListener('mouseenter', function(e) {
        e.stopPropagation();
    }, true);
}

// ========================================================================
// COVERAGE MODE SYSTEM
// ========================================================================
const CoverageMode = {
    data: null,
    banner: null,
    modal: null,
    dismissTimer: null,
    refreshInterval: null,

    async fetch() {
        try {
            const response = await fetch('https://secureproxy.xtremewx.com/weather/coverage');
            const data = await response.json();
            
            if (data.coverageModeEnabled) {
                this.data = data;
                return data;
            }
            return null;
        } catch (error) {
            console.error('Coverage mode fetch failed:', error);
            return null;
        }
    },

    getIcon(mode) {
        const icons = {
            'severe': 'https://xtremewx.com/new/assets/severecoverage.webp',
            'winter': 'https://xtremewx.com/new/assets/wintercoverage.webp',
            'tropical': 'https://xtremewx.com/new/assets/tropicalcoverage.webp'
        };
        return icons[mode] || icons['severe'];
    },

    getDisplayName(mode) {
        const names = {
            'severe': 'Severe',
            'winter': 'Winter',
            'tropical': 'Tropical'
        };
        return names[mode] || 'Coverage';
    },

    show() {
        if (!this.data) return;

        this.banner = document.getElementById('coverageBanner');
        if (!this.banner) return;

        const icon = document.getElementById('coverageIcon');
        const title = document.getElementById('coverageTitle');

        icon.src = this.getIcon(this.data.coverageMode);
        title.textContent = `${this.getDisplayName(this.data.coverageMode)} Coverage Mode enabled!`;

        // Reset classes first
        this.banner.className = 'coverage-banner ' + this.data.coverageMode;

        // Clear any existing timer
        if (this.dismissTimer) clearTimeout(this.dismissTimer);

        // Auto-dismiss after 8 seconds
        this.dismissTimer = setTimeout(() => {
            this.hideBanner();
        }, 8000);

        // Click pill → open modal
        this.banner.onclick = () => this.openModal();

        // Show it with animation
        setTimeout(() => {
            this.banner.style.display = 'block';
            // Force reflow before adding animation class
            void this.banner.offsetWidth;
            this.banner.classList.add('animate-in');
        }, 3000);
    },

    hideBanner() {
        if (!this.banner || this.banner.style.display !== 'block') return;
        
        this.banner.classList.remove('animate-in');
        this.banner.classList.add('animate-out');
        
        setTimeout(() => {
            this.banner.style.display = 'none';
            this.banner.classList.remove('animate-out');
        }, 400);
    },

    openModal() {
        if (!this.data) return;

        this.modal = document.getElementById('coverage-modal');
        if (!this.modal) return;

        const modalTitle = document.getElementById('coverage-modal-title');
        const modalIcon = document.getElementById('coverage-modal-icon');
        const summaryEl = document.getElementById('coverage-summary');
        const descriptionEl = document.getElementById('coverage-description');

        modalTitle.textContent = `${this.getDisplayName(this.data.coverageMode)} Coverage Mode enabled!`;
        modalIcon.src = this.getIcon(this.data.coverageMode);

        if (summaryEl) {
            summaryEl.textContent = this.data.coverageHeading 
                || `Xtreme Weather has enabled ${this.getDisplayName(this.data.coverageMode)} Coverage Mode due to significant weather impacting the region.`;
        }

        if (descriptionEl) {
            descriptionEl.textContent = this.data.coverageDescription 
                || 'No detailed description available at this time.';
        }

        this.modal.classList.add('active');
        lockScroll();

        this.modal.onclick = (e) => {
            if (e.target === this.modal) {
                this.closeModal();
                this.hideBanner();
            }
        };
    },

    closeModal() {
        if (this.modal) {
            this.modal.classList.add('modal-closing');
            this.modal.onclick = null;
            setTimeout(() => {
                this.modal.classList.remove('active', 'modal-closing');
                unlockScroll();
            }, 150);
        }
    },

    initDismissButton() {
        const dismissBtn = document.getElementById('coverageDismiss');
        if (dismissBtn) {
            dismissBtn.onclick = (e) => {
                e.stopPropagation();
                this.hideBanner();
            };
        }
    },

    startAutoRefresh() {
        if (this.refreshInterval) clearInterval(this.refreshInterval);

        this.refreshInterval = setInterval(async () => {
            const newData = await this.fetch();
            if (newData && JSON.stringify(newData) !== JSON.stringify(this.data)) {
                this.data = newData;
                this.show();
            }
        }, 10 * 60 * 1000);
    },

    init() {
        this.fetch().then(data => {
            if (data) {
                this.show();
                this.initDismissButton();
                this.startAutoRefresh();
            }
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => CoverageMode.init());

// Global reference
window.CoverageMode = CoverageMode;

function closeCoverageModal(event) {
    if (event && event.target.id !== 'coverage-modal') return;
    
    const modal = document.getElementById('coverage-modal');
    
    // Add closing class FIRST
    modal.classList.add('modal-closing');
    
    setTimeout(() => {
        modal.classList.remove('active', 'modal-closing');
        unlockScroll();
    }, 150);
}
