export const FPS = 30;
export const TOTAL = 14668; // voice.mp3 = 488.9s

// Scene start times (seconds)
export const SC = [0, 32.8, 81.2, 162, 269, 352, 450.5, TOTAL / FPS];

// Windows (seconds) where a callout bubble / text card / stamp is on screen -> bottom caption is hidden
export const HIDE: [number, number][] = [
  [0.3, 5.6], [27.5, 32.6], [40.4, 66.8], [108, 113.4], [114, 118.7], [120, 126.6],
  [139.8, 145.9], [176.1, 179.2], [183.2, 188], [188.4, 201.9], [201.9, 203.4], [217, 225.3],
  [229.2, 231.9], [243, 248.7], [253.2, 257.2], [269.2, 273.2], [334.6, 342.7], [346, 351.5],
  [354, 360], [430.8, 434.8], [450.5, 489],
];
