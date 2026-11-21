import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, prog, seg, lerp, pop, bob} from '../utils';
import {Cartoon, hp, INK} from '../Cartoon';
import {Kitchen, Chair} from '../Bg';
import {Prop} from '../Props';
import {Svg, Ov, Bubble, Stamp, TopPill} from '../UI';
import {Icon} from '../Icons';

const Y = 930;
const S = 1.25;

export const Scene3: React.FC = () => {
  const t = useT();
  // ---- positions ----
  const sajX = lerp(560, 1340, seg(t, 86, 91));
  const sajWalk = t > 86 && t < 91;
  const ashX = t < 95.6 ? lerp(2000, 1100, seg(t, 93.6, 95.6)) : t < 107 ? lerp(1100, 1000, seg(t, 104.6, 107)) : 1000;
  const ashWalk = (t > 93.6 && t < 95.6) || (t > 104.6 && t < 107);
  const salX = lerp(100, 640, seg(t, 131.5, 140));
  const salWalk = t > 131.5 && t < 140;
  const salDim = t < 131.8 ? 0.9 : 0.9 * (1 - seg(t, 131.8, 133.2));
  const munDim = t < 153.3 ? 0.9 : 0.9 * (1 - seg(t, 153.3, 154));
  const chairX = 1830 - 40 * seg(t, 153.4, 154.2);
  const reveal = t > 153.4;
  const fridgeOpen = t > 116 ? 0.35 * seg(t, 116, 118) : 0;
  const door = t > 90 && t < 93 ? 0 : fridgeOpen;

  // ---- Ashraf ----
  const drinking = t >= 96 && t < 104.6;
  const pouring = t >= 107 && t < 113;
  const ashTalk = t >= 108.2 && t < 112.6;
  const glassUp = (t >= 96 && t < 104.6) || (t >= 113.5 && t < 127);
  const sip = t >= 113.5 && t < 127 ? (Math.sin(t * 2.2) > 0.2 ? -130 : -40) : -130;
  const ashArmR = glassUp ? (t >= 113.5 ? sip : -130) : pouring ? 60 : 12;
  const ashHand = glassUp ? 'glassUp' : pouring || (t >= 105 && t < 113.5) ? 'glass' : t < 96 ? 'glass' : undefined;
  const ashMood = t >= 120 && t < 127 ? 'drowsy' : 'drowsy';
  // ---- Sallu ----
  const salTalk = t >= 140.2 && t < 145.2;
  const salMood = t >= 146 && t < 153 ? 'sly' : 'sly';
  // ---- Sajjad ----
  const sajReact = t >= 91.4;
  const sajFlip = t >= 93.8;

  // positions for bubbles
  const ash = hp('ashraf', ashX, Y, S);
  const sal = hp('sallu', salX, Y, S);
  const emberX = salX + 114;
  const emberY = Y - 216;

  return (
    <AbsoluteFill>
      <Svg shake={t > 153.4 && t < 154.8 ? 6 : 0}>
        <Kitchen dark={0.5} door={door} lamp={0} eggIn />
        {/* pan + knife on the counter */}
        {t > 82 && (
          <g transform={`translate(520 572) scale(${pop(t, 82, 0.3)})`}>
            <Prop name="pan" />
          </g>
        )}
        {t > 85.5 && (
          <g transform={`translate(720 568) rotate(-80) scale(${pop(t, 85.5, 0.3)})`}>
            <Prop name="knife" />
          </g>
        )}
        {/* Munna waiting in the dark corner */}
        <g style={{filter: munDim > 0 ? `brightness(${1 - munDim})` : undefined}}>
          <Chair x={chairX} y={Y} />
          <Cartoon who="munna" x={chairX} y={Y} scale={S} sit="chair" mood="deadpan" armL={16} armR={16} />
        </g>
        {!reveal && t > 100 && (
          <g fill="#fff" opacity={t % 9 < 0.2 ? 0 : 0.85}>
            <ellipse cx={chairX - 34} cy={Y - 428} rx={9} ry={11} />
            <ellipse cx={chairX + 34} cy={Y - 428} rx={9} ry={11} />
          </g>
        )}
        {t > 127.1 && t < 133 && (
          <g>
            <circle cx={emberX} cy={emberY} r={22 + 4 * Math.sin(t * 9)} fill="#FF6B3A" opacity={0.35} />
            <circle cx={emberX} cy={emberY} r={8} fill="#FF3B1A" />
          </g>
        )}
        {/* Sallu */}
        {t >= 127.1 && (
          <Cartoon
            who="sallu" x={salX + (t < 131.5 ? 0 : 0)} y={Y} scale={S} mood={salMood} talking={salTalk} dim={salDim}
            walk={salWalk} walkSpeed={1.1} armR={salTalk ? 40 : 10} armL={salTalk ? 105 : 10} tremble={salTalk ? 1.5 : 0}
          />
        )}
        {/* Ashraf */}
        {t >= 93.6 && (
          <Cartoon
            who="ashraf" x={ashX} y={Y} scale={S} mood={ashMood} talking={ashTalk} walk={ashWalk} walkSpeed={0.9}
            armR={ashArmR} reachR={glassUp ? 0.85 : 1} handR={ashHand} armL={10}
            lean={drinking || (t > 113 && t < 127) ? bob(t, 0.5, 5) : 0} look={t >= 115 && t < 127 ? 1 : 0}
            tremble={t >= 110 && t < 111 ? 1.5 : 0}
          />
        )}
        {/* Sajjad */}
        <Cartoon
          who="sajjad" x={sajX} y={Y} scale={S} flip={sajFlip}
          mood={sajReact ? (t > 146 ? 'sly' : 'worried') : 'smug'} walk={sajWalk} walkSpeed={1.2}
          armR={t > 89.4 && t < 93.8 ? 95 : 14} armL={14} look={sajReact ? -1 : 1} tremble={sajReact && t < 95 ? 1.2 : 0}
        />
        {/* ice cube with a cross near the fridge */}
        {t > 145.9 && t < 150.6 && (
          <g transform={`translate(1560 200) scale(${pop(t, 145.9, 0.4) * 1.6})`}>
            <Icon n="ice" s={100} x={-50} y={-50} />
            <Icon n="cross" s={60} x={0} y={0} />
          </g>
        )}
      </Svg>
      <Ov>
        <Bubble t0={108} t1={113.3} x={ashX - 40} y={250} tx={ashX} ty={ash.mouthY - 6} text={'ভাই, আমি কিন্তু...\nশুধু পানি খেতে এসেছি।'} />
        <Stamp t0={114.1} t1={118.6} x={ashX} y={290} text="৫ম গ্লাস!" color="#2F6FD6" fs={84} rot={-6} />
        <Bubble t0={120} t1={126.5} kind="thought" icons={['film']} x={ashX - 140} y={250} tx={ashX - 30} ty={ash.topY} />
        <Bubble t0={139.9} t1={145.8} x={salX + 280} y={250} tx={salX + 10} ty={sal.mouthY - 6} text={'ঘুম আসছে না,\nতাই বরফ খেতে এসেছি!'} />
      </Ov>
      <TopPill t0={81.6} t1={86} icon="home" text="রান্নাঘর" />
    </AbsoluteFill>
  );
};
