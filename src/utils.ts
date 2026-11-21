import {createContext, useContext} from 'react';
import {useCurrentFrame} from 'remotion';

export const T0 = createContext(0);
/** absolute time (seconds) of the whole video, also inside <Sequence> */
export const useT = () => {
  const f = useCurrentFrame();
  const t0 = useContext(T0);
  return f / 30 + t0;
};
export const cl = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const prog = (t: number, a: number, b: number) => cl((t - a) / (b - a));
export const eio = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
export const seg = (t: number, a: number, b: number) => eio(prog(t, a, b));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const pop = (t: number, a: number, d = 0.35) => {
  if (t < a) return 0;
  const k = cl((t - a) / d);
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2);
};
export const bob = (t: number, sp = 1, amp = 6, ph = 0) => Math.sin(t * Math.PI * 2 * sp + ph) * amp;
export const jit = (t: number, amp = 3) => ({
  x: Math.sin(t * 61) * amp + Math.sin(t * 37) * amp * 0.5,
  y: Math.cos(t * 53) * amp * 0.6,
});
export const inW = (t: number, a: number, b: number) => t >= a && t < b;
