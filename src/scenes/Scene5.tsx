import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, prog, seg, lerp, pop, bob} from '../utils';
import {Cartoon, hp, INK} from '../Cartoon';
import {Kitchen, Corridor, Bedroom, Blankets, BED_X} from '../Bg';
import {Prop} from '../Props';
import {Svg, Ov, Bubble, Stamp, TopPill} from '../UI';
import {Icon} from '../Icons';

const Y = 930;
const S = 1.25;
const inB = (t: number, a: number, b: number) => t >= a && t < b;

/** egg path after Sajjad loses it */
const eggAt = (t: number) => {
  if (t < 319.6) return null;
  if (t < 322.9) {
    const k = prog(t, 319.6, 322.9);
    return {x: lerp(1525, 1180, k), y: lerp(600, 928, k) - 4 * 300 * k * (1 - k), r: k * 540};
  }
  if (t < 324.3) {
    const k = prog(t, 322.9, 324.3);
    return {x: 1180, y: 928 - 70 * 4 * k * (1 - k), r: 540};
  }
  if (t < 330.5) return {x: 1180, y: 928, r: 540};
  if (t < 331.8) {
    const k = prog(t, 330.5, 331.8);
    return {x: 1180, y: 928 - 50 * 4 * k * (1 - k), r: 540};
  }
  if (t < 332.9) return {x: 1180, y: 928, r: 540};
  const k = prog(t, 332.9, 334.7);
  const x = lerp(1180, 905, k);
  return {x, y: 928, r: 540 + (1180 - x) * 0.8};
};

export const Scene5: React.FC = () => {
  const t = useT();

  // ---------------- 269 - 276 bedroom: alarms ----------------
  if (t < 276) {
    const jt: any = {sajjad: 272.3, sallu: 272.5, ashraf: 273.2};
    const xs = (w: string, i: number) => BED_X[i] + (jt[w] ? 900 * seg(t, jt[w] + 0.9, jt[w] + 2.6) : 0);
    const jump = (w: string) => (jt[w] && t >= jt[w] && t < jt[w] + 1 ? 170 * Math.sin(prog(t, jt[w], jt[w] + 1) * Math.PI) : 0);
    const awake = (w: string) => t >= jt[w];
    const run = (w: string) => t >= jt[w] + 0.9;
    return (
      <AbsoluteFill>
        <Svg shake={t < 273.2 ? 3 : 0}>
          <Bedroom dark={t < 272 ? 0.5 : 0.3} />
          {(['sajjad', 'ashraf', 'sallu'] as const).map((w, i) => (
            <Cartoon key={w} who={w} x={xs(w, i === 0 ? 0 : i === 1 ? 1 : 2)} y={930} scale={1.0} mood={awake(w) ? 'surprised' : 'sly'} jumpY={jump(w)} walk={run(w)} walkSpeed={3} armR={awake(w) ? 130 : 40} armL={awake(w) ? 130 : 40} shoe={w === 'sajjad' && awake(w) ? 'right' : 'both'} />
          ))}
          <Cartoon who="munna" x={BED_X[3]} y={930} scale={1.0} mood="deadpan" armR={40} armL={40} />
          <Blankets />
          {BED_X.map((bx, i) => (
            <g key={bx} transform={`translate(${bx + Math.sin(t * 45) * 5} 430) rotate(${Math.sin(t * 40) * 9})`}>
              <Icon n="alarm" s={120} x={-60} y={-60} />
            </g>
          ))}
        </Svg>
        <TopPill t0={269.3} t1={273} icon="alarm" text="ভোর ৫:৩০" />
      </AbsoluteFill>
    );
  }

  // ---------------- 276 - 301 corridor: the dash ----------------
  if (t < 301) {
    const run = (a: number, b: number, x0: number, x1: number) => lerp(x0, x1, prog(t, a, b));
    const sx = run(276.5, 283.5, -250, 2150);
    const lx = run(280.5, 292, -300, 2150);
    const ax = run(290.5, 299.5, -300, 1900);
    const mx = run(298.8, 304, -250, 900);
    const stumble = inB(t, 285.6, 286.6) ? 24 : 6;
    const aStumble = inB(t, 295.6, 296.8) ? 32 : 8;
    return (
      <AbsoluteFill>
        <Svg>
          <Corridor dark={0.15} />
          <Cartoon who="sajjad" x={sx} y={Y} scale={S} mood="surprised" walk walkSpeed={3.2} lean={10} armR={50} armL={50} shoe="right" />
          <Cartoon who="sallu" x={lx} y={Y} scale={S} mood="worried" walk walkSpeed={2.6} lean={stumble} jumpY={inB(t, 285.6, 286.4) ? 40 : 0} armR={170} armL={60} />
          <Cartoon who="ashraf" x={ax} y={Y} scale={S} mood="drowsy" walk walkSpeed={2.2} lean={aStumble} jumpY={inB(t, 295.6, 296.4) ? 30 : 0} armR={50} armL={50} />
          <Cartoon who="munna" x={mx} y={Y} scale={S} mood="deadpan" walk walkSpeed={0.8} armR={14} armL={14} />
        </Svg>
      </AbsoluteFill>
    );
  }

  // ---------------- 301 - 352 kitchen ----------------
  const stuck = t < 308.4;
  const sajX = stuck ? 90 : lerp(90, 1300, seg(t, 308.4, 309.9));
  const ashX = stuck ? 135 : lerp(135, 1160, seg(t, 309.6, 311.7));
  const salX = stuck ? 180 : lerp(180, 1400, seg(t, 310.4, 316.4));
  const munX = lerp(100, 860, seg(t, 309.2, 324));
  const door = 0.92 * seg(t, 309.0, 309.9);
  const egg = eggAt(t);
  const eggInHand = t >= 309.9 && t < 319.6;
  const pickUp = t >= 342.8;
  const freeze = inB(t, 325, 330.4);
  const worried = inB(t, 319.6, 334.6);
  const sc = stuck ? 1.1 : S;
  const mun = hp('munna', munX, Y, S);
  const sajReact = t >= 334.6 ? 'surprised' : worried ? 'worried' : 'angry';
  const puff = inB(t, 343.6, 345.2);

  return (
    <AbsoluteFill>
      <Svg shake={stuck ? 2 : 0}>
        <Kitchen dark={0.05} dawn={0.6} door={door} eggIn={t < 309.9} />
        {/* Sallu behind, Ashraf, Sajjad in front */}
        <Cartoon who="sallu" x={salX} y={Y} scale={sc} mood={stuck ? 'angry' : worried ? 'worried' : 'angry'} walk={stuck || (t > 310.4 && t < 316.4)} walkSpeed={stuck ? 4 : 1.8} tremble={stuck ? 3 : inB(t, 316.7, 319.6) ? 4 : freeze ? 0 : worried ? 1 : 0} lean={stuck ? 6 : t >= 316.7 && t < 319.6 ? -8 : 0} armL={t >= 316.7 && t < 319.6 ? 82 : 10} armR={170} lookY={freeze ? 1 : 0} />
        <Cartoon who="ashraf" x={ashX} y={Y} scale={sc} mood={stuck ? 'worried' : worried ? 'worried' : 'drowsy'} walk={stuck || (t > 309.6 && t < 311.7)} walkSpeed={stuck ? 4 : 1.6} tremble={stuck ? 3 : inB(t, 311.7, 319.6) ? 3 : freeze ? 0 : worried ? 1 : 0} lean={stuck ? 6 : t >= 311.7 && t < 319.6 ? 8 : 0} armR={t >= 311.7 && t < 319.6 ? 80 : 10} lookY={freeze ? 1 : 0} />
        <Cartoon who="sajjad" x={sajX} y={Y} scale={sc} mood={stuck ? 'angry' : sajReact} walk={stuck || (t > 308.4 && t < 309.9)} walkSpeed={stuck ? 4 : 2.4} tremble={stuck ? 3 : inB(t, 311.7, 319.6) ? 3 : freeze ? 0 : worried ? 1 : 0} lean={stuck ? 6 : 0} handR={eggInHand ? 'egg' : undefined} armR={eggInHand ? 60 : 12} armL={14} lookY={freeze ? 1 : 0} talking={t >= 342.6 && t < 345} />
        {/* Munna walks in calmly */}
        {t >= 309.2 && (
          <Cartoon who="munna" x={munX} y={Y} scale={S} mood="deadpan" walk={t < 324} walkSpeed={0.7} handR={pickUp ? 'egg' : undefined} armR={pickUp ? 62 : 12} armL={12} talking={inB(t, 336.3, 342.4) || inB(t, 346, 351.2)} lean={puff ? -4 : 0} />
        )}
        {/* the narrow door frame in front */}
        {stuck && (
          <g>
            <rect x={-10} y={140} width={44} height={570} fill="#7A5535" stroke={INK} strokeWidth={4} />
            <rect x={226} y={140} width={46} height={570} fill="#7A5535" stroke={INK} strokeWidth={4} />
            <rect x={-10} y={130} width={282} height={26} fill="#6A4529" stroke={INK} strokeWidth={4} />
          </g>
        )}
        {/* the falling / rolling egg */}
        {egg && !pickUp && (
          <g transform={`translate(${egg.x} ${egg.y}) rotate(${egg.r})`}><Prop name="egg" /></g>
        )}
        {puff && [0, 1, 2].map((i) => {
          const k = prog(t, 343.6 + i * 0.2, 344.8 + i * 0.2);
          return <circle key={i} cx={mun.x + 70 + k * 160 + i * 30} cy={mun.mouthY - 20 - k * 30 + i * 10} r={10 + k * 22} fill="#fff" stroke={INK} strokeWidth={2} opacity={1 - k} />;
        })}
        {/* silence: three dots */}
        {inB(t, 325.3, 330.4) && (
          <g fill={INK} transform={`translate(960 330)`}>
            {[0, 1, 2].map((i) => <circle key={i} cx={(i - 1) * 50} cy={0} r={12} opacity={0.4 + 0.6 * (Math.sin(t * 4 - i) > 0 ? 1 : 0.3)} />)}
          </g>
        )}
      </Svg>
      <Ov>
        <Stamp t0={334.8} t1={336.2} x={960} y={300} text="ফাটেনি!" color="#2E9E4F" fs={110} rot={-6} />
        <Bubble t0={336.3} t1={342.5} x={760} y={215} tx={mun.x} ty={mun.mouthY - 6} text={'সেদ্ধ ছিল।\nগতকাল সন্ধ্যায় আমি বানিয়ে রেখেছিলাম।'} />
        <Bubble t0={346} t1={351.3} x={740} y={185} tx={mun.x} ty={mun.mouthY - 6} text={'আর ডিমটা কিনেছিও আমি।\nআমি তো সারারাত জিজ্ঞেস করছিলাম,\nডিমটা কার?'} fs={42} />
      </Ov>
    </AbsoluteFill>
  );
};
