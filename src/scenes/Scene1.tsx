import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, prog, seg, lerp, cl} from '../utils';
import {Cartoon, hp} from '../Cartoon';
import {Kitchen, Corridor} from '../Bg';
import {Svg, Ov, Bubble, TopPill} from '../UI';

const Y = 930;
const S = 1.25;

export const Scene1: React.FC = () => {
  const t = useT();

  // ---------- 0 - 13.7  corridor ----------
  if (t < 13.7) {
    const x = 150 + 1470 * prog(t, 0.3, 13.6);
    const m = hp('sajjad', x, Y, S);
    const whisper = t < 5.5;
    return (
      <AbsoluteFill>
        <Svg>
          <Corridor />
          <Cartoon who="sajjad" x={x} y={Y} scale={S} mood="sly" sneak walk={t > 0.3} walkSpeed={0.8} lean={7} armR={whisper ? -130 : 38} reachR={whisper ? 0.85 : 1} armL={42} look={1} talking={false} />
        </Svg>
        <Ov>
          <Bubble t0={0.3} t1={5.4} kind="whisper" x={cl(x + 220, 540, 1380)} y={210} tx={x} ty={m.mouthY - 8} text={'একটাই ডিম।\nকেউ জেগে ওঠার আগেই এটা আমার পেটে।'} fs={44} />
        </Ov>
        <TopPill t0={5.4} t1={10.8} icon="clock" text="রাত ১২:১০" />
      </AbsoluteFill>
    );
  }

  // ---------- 13.7 - 32.8  kitchen + fridge ----------
  const walkIn = seg(t, 13.8, 16.0);
  const sx = lerp(110, 1290, walkIn);
  const door = t < 17.4 ? 0.14 * seg(t, 14.6, 16.6) : lerp(0.14, 0.92, seg(t, 17.4, 19.0));
  const z1 = seg(t, 17.7, 19.4);
  const z2 = seg(t, 22.5, 23.6);
  const z3 = seg(t, 26.0, 27.2);
  const s0 = 1 + 1.2 * z1 + 0.6 * z2;
  const cam = {
    s: lerp(s0, 2.1, z3),
    cx: lerp(lerp(960, 1570, z1), 1290, z3),
    cy: lerp(lerp(540, 470, z1), 430, z3),
  };
  const love = t > 26.6;
  const eggGlow = t > 24.9 && t < 27;
  const m = hp('sajjad', 1290, Y, S);
  return (
    <AbsoluteFill>
      <Svg cam={cam}>
        <Kitchen dark={0.55} door={door} pops={{lemon: 19.9, bottle: 20.6, tray: 22.3, egg: 24.0}} />
        {eggGlow && (
          <circle cx={1670} cy={514} r={44 + 6 * Math.sin(t * 8)} fill="none" stroke="#FFD84D" strokeWidth={6} opacity={prog(t, 24.9, 25.4)} />
        )}
        <Cartoon
          who="sajjad" x={sx} y={Y} scale={S}
          mood={love ? 'love' : 'smug'} walk={t < 16.0} sneak walkSpeed={0.9}
          armR={love ? 8 : 92} armL={14} look={love ? 1 : 1} lean={love ? 3 : 6}
        />
      </Svg>
      <Ov>
        <Bubble t0={27.5} t1={32.4} kind="thought" icons={['egg', 'heart']} x={760} y={230} tx={870} ty={m.topY + 20} />
      </Ov>
      <TopPill t0={13.9} t1={17.6} icon="home" text="মেসের রান্নাঘর" />
    </AbsoluteFill>
  );
};
