import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, prog, seg, lerp, pop, bob} from '../utils';
import {Cartoon, hp, INK} from '../Cartoon';
import {Kitchen} from '../Bg';
import {Prop} from '../Props';
import {Svg, Ov, Bubble} from '../UI';
import {Icon} from '../Icons';

const Y = 930;
const S = 1.15;
const inB = (t: number, a: number, b: number) => t >= a && t < b;

const STAND: any = {ashraf: 560, sajjad: 900, sallu: 1240, munna: 1580};
const SEAT: any = {ashraf: 460, sallu: 780, sajjad: 1140, munna: 1460};

/** spoon-to-mouth cycle: returns arm angle + whether eyes are shut */
const bite = (t: number, off: number) => {
  const c = (((t - 417 + off) % 1.8) + 1.8) % 1.8 / 1.8;
  if (c < 0.35) return {a: lerp(60, -130, c / 0.35), shut: false};
  if (c < 0.62) return {a: -130, shut: true};
  return {a: lerp(-130, 60, (c - 0.62) / 0.38), shut: false};
};

export const Scene6: React.FC = () => {
  const t = useT();
  const seated = t >= 391.7;
  const mv = seg(t, 391.0, 392.0);
  const X = (w: string) => (t < 391.0 ? STAND[w] : lerp(STAND[w], SEAT[w], mv));
  const sit = seated ? 'floor' : '';
  const dawn = lerp(0.55, 1, seg(t, 444, 449));

  // ---- Sajjad ----
  let sajX = X('sajjad');
  let sajWalk = false;
  if (t >= 366 && t < 371) { sajX = lerp(900, 1300, seg(t, 366, 371)); sajWalk = true; }
  else if (t >= 371 && t < 373.5) sajX = 1300;
  else if (t >= 373.5 && t < 377.5) { sajX = lerp(1300, 900, seg(t, 373.5, 377)); sajWalk = t < 377; }
  const chop = seated && t < 414.5;
  const b1 = bite(t, 0);
  const b2 = bite(t, 0.3);
  const b3 = bite(t, 0.6);
  const b4 = bite(t, 0.9);
  const eating = t >= 417 && t < 435.4;

  let sajAR = 10, sajHandR: any, sajRot = 0, sajHandL: any, sajAL = 10, sajShut = false, sajMood = 'sly';
  if (chop && t >= 391.7) { sajHandR = 'knife'; sajRot = 180; sajAR = 38 + 18 * Math.sin(t * 14); sajHandL = 'onion'; sajAL = -25; sajMood = 'happy'; }
  if (t >= 414.5 && t < 417) { sajMood = 'happy'; }
  if (eating) { sajHandR = 'spoon'; sajAR = b1.a; sajShut = b1.shut; sajMood = 'happy'; }
  if (inB(t, 435.4, 442.6)) { sajMood = 'laugh'; }
  if (inB(t, 442.6, 450.5)) { sajMood = 'happy'; sajHandR = 'spoon'; sajAR = 85; }

  // ---- Ashraf ----
  let ashAR = 10, ashHandR: any, ashMood = 'drowsy', ashShut = false, ashTrem = 0, ashLean = 0, ashRot = 0;
  if (inB(t, 352, 359)) { ashAR = -100; ashMood = 'worried'; }
  if (inB(t, 382, 386.6)) { ashHandR = 'pot'; ashAR = 60; ashTrem = inB(t, 383.2, 383.6) || inB(t, 384.8, 385.2) ? 5 : 0; }
  if (inB(t, 394.8, 397.6)) { ashHandR = 'oil'; ashAR = 65; ashRot = 130; }
  else if (inB(t, 397.6, 414.5)) { ashAR = 40 + 14 * Math.sin(t * 12); }
  if (eating) { ashHandR = 'spoon'; ashAR = b2.a; ashShut = b2.shut; }
  if (inB(t, 422.5, 427)) { ashMood = 'laugh'; ashHandR = 'spoon'; ashAR = 60; ashShut = false; ashTrem = 2; }
  if (inB(t, 435.4, 442.6)) { ashMood = 'laugh'; ashTrem = 4; ashLean = bob(t, 3, 8); ashHandR = undefined; ashAR = 10; }

  // ---- Sallu ----
  let salAR = 10, salHandR: any = 'none', salMood = 'sly', salShut = false, salTalk = false, salTrem = 0, salAL = 40 + bob(t, 1.2, 14), salNoG = t >= 361;
  if (inB(t, 378.2, 379.2)) { salHandR = 'oil'; salAR = 60; }
  if (inB(t, 391.7, 399.8)) { salAR = 30 + 15 * Math.sin(t * 12); }
  if (inB(t, 399.8, 414.5)) { salAR = 30 + 15 * Math.sin(t * 9); salMood = 'happy'; }
  if (t >= 391.7) salAL = 55;
  if (eating) { salHandR = 'spoon'; salAR = b3.a; salShut = b3.shut; salMood = 'happy'; }
  if (inB(t, 427.8, 430.6)) { salTalk = true; salAR = 20; salHandR = 'none'; salShut = false; }
  if (inB(t, 435.4, 442.6)) { salMood = 'laugh'; salTrem = 2; salHandR = 'none'; salAR = 10; }
  const cigAsh = t < 410.9 ? prog(t, 399.8, 407.5) : 0;

  // ---- Munna ----
  let munAR = 10, munHandR: any, munMood = 'deadpan', munShut = false, munTalk = false, munTrem = 0;
  if (inB(t, 387.3, 389)) { munHandR = 'plate'; munAR = 62; }
  if (inB(t, 389, 414.5)) { munHandR = 'spoon'; munAR = 45 + 14 * Math.sin(t * 13); }
  if (eating) { munHandR = 'spoon'; munAR = b4.a; munShut = b4.shut; munMood = 'happy'; }
  if (inB(t, 430.9, 434.5)) { munTalk = true; munMood = 'deadpan'; munHandR = 'none'; munShut = false; munAR = 10; }
  if (inB(t, 435.4, 442.6)) { munMood = 'happy'; munTrem = 1; munHandR = 'none'; munAR = 10; }
  if (inB(t, 444, 450.5)) { munMood = 'love'; }

  const P: any = {
    sajjad: hp('sajjad', sajX, Y, S, sit),
    ashraf: hp('ashraf', X('ashraf'), Y, S, sit),
    sallu: hp('sallu', X('sallu'), Y, S, sit),
    munna: hp('munna', X('munna'), Y, S, sit),
  };
  const standSallu = !seated ? 1 : 0;

  // food on the floor tray
  const itemPop = (a: number) => Math.max(0, pop(t, a, 0.35));
  const trayVisible = t >= 366 && t < 414.5;
  const platesIn = [414.5, 415.2, 415.9, 416.6];

  return (
    <AbsoluteFill>
      <Svg>
        <Kitchen dark={0} dawn={dawn} door={0} eggIn={false} />
        <Cartoon who="ashraf" x={X('ashraf')} y={Y} scale={S} sit={sit} mood={ashMood} handR={ashHandR} rotR={ashRot} armR={ashAR} lean={ashLean} tremble={ashTrem} shut={ashShut} look={inB(t, 352, 359) ? 0.5 : 0} lookY={inB(t, 352, 359) ? -0.5 : 0} />
        <Cartoon who="sallu" x={X('sallu')} y={Y} scale={S} sit={sit} mood={salMood} handL="cig" handR={salHandR} armR={salAR} armL={salAL} cigAsh={cigAsh} noGamchha={salNoG} talking={salTalk} tremble={salTrem} shut={salShut} />
        <Cartoon who="sajjad" x={sajX} y={Y} scale={S} sit={sit} mood={sajMood} walk={sajWalk} walkSpeed={1.3} handR={sajHandR} rotR={sajRot} handL={sajHandL} armR={sajAR} armL={sajAL} shut={sajShut} lookY={inB(t, 366, 371) ? 1 : 0} />
        <Cartoon who="munna" x={X('munna')} y={Y} scale={S} sit={sit} mood={munMood} handR={munHandR} armR={munAR} talking={munTalk} tremble={munTrem} shut={munShut} />

        {/* folded gamchha in Sallu's hands while he folds it */}
        {/* the shared tray with the ingredients */}
        {trayVisible && (
          <g transform={`translate(960 985) scale(${itemPop(366)})`}>
            <Prop name="tray" />
            {t >= 374 && <g transform={`translate(-130 -6) scale(${itemPop(374)})`}><Prop name="onion" /></g>}
            {t >= 375 && [0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${-30 + i * 34} ${-4 + (i % 2) * 8}) rotate(${i * 22 - 30}) scale(${itemPop(375 + i * 0.15)})`}><Prop name="chili" /></g>)}
            {t >= 379.2 && <g transform={`translate(150 -4) scale(${itemPop(379.2)})`}><Prop name="oil" /></g>}
            {t >= 386.7 && <g transform={`translate(250 -2) scale(${itemPop(386.7)})`}><Prop name="pot" /></g>}
            {t >= 389 && <g transform={`translate(0 6) scale(${itemPop(389)})`}><Prop name="eggBroken" /></g>}
          </g>
        )}
        {/* oil stream while Ashraf pours */}
        {inB(t, 395.2, 397.6) && [0, 1, 2].map((i) => {
          const k = (t * 1.6 + i / 3) % 1;
          return <circle key={i} cx={P.ashraf.x + 150 + 4} cy={930 - 120 + k * 150} r={5} fill="#E8B72A" stroke={INK} strokeWidth={1.5} opacity={1 - k * 0.3} />;
        })}
        {/* ash into the saucer */}
        {t >= 409.2 && t < 413 && (
          <g transform={`translate(${lerp(P.munna.x - 40, P.sallu.x + 130, seg(t, 409.2, 410.6))} 975)`}><Prop name="saucer" /></g>
        )}
        {inB(t, 410.9, 411.8) && [0, 1, 2].map((i) => (
          <circle key={i} cx={P.sallu.x + 130 + i * 5} cy={870 + prog(t, 410.9, 411.8) * 100 + i * 8} r={5} fill="#B9B9B9" />
        ))}
        {/* four plates of bharta */}
        {t >= 414.5 && (['ashraf', 'sallu', 'sajjad', 'munna'] as const).map((w, i) => (
          <g key={w} transform={`translate(${SEAT[w]} 985) scale(${itemPop(platesIn[i])})`}><Prop name="food" /></g>
        ))}
        {/* ingredient icons floating over each cook */}
        {([['sajjad', 'onion', 392.2], ['sallu', 'chili', 394], ['ashraf', 'oil', 395.8], ['munna', 'egg', 398]] as any[]).map(([w, n, a]) =>
          inB(t, a, a + 2.4) ? (
            <g key={w} transform={`translate(${P[w].x} ${P[w].topY - 70 - prog(t, a, a + 2.4) * 30}) scale(${pop(t, a, 0.3)})`} opacity={1 - prog(t, a + 1.8, a + 2.4)}>
              <Icon n={n} s={90} x={-45} y={-45} />
            </g>
          ) : null,
        )}
        {/* hearts after the extra spoon / sunrise */}
        {t >= 444 && [0, 1, 2, 3, 4].map((i) => {
          const k = prog(t, 444 + i * 0.5, 449.5);
          return (
            <g key={i} transform={`translate(${P.munna.x - 160 + i * 80 + Math.sin(t * 2 + i) * 14} ${P.munna.topY - 20 - k * 180}) scale(${k > 0 ? 0.7 : 0})`} opacity={1 - k * 0.8}>
              <Icon n="heart" s={70} x={-35} y={-35} />
            </g>
          );
        })}
      </Svg>
      <Ov>
        <Bubble t0={354} t1={359.8} kind="thought" icons={['qmark']} x={P.ashraf.x + 140} y={P.ashraf.topY - 110} tx={P.ashraf.x + 40} ty={P.ashraf.topY - 20} />
        <Bubble t0={431} t1={434.7} x={1380} y={320} tx={P.munna.x} ty={P.munna.mouthY - 6} text={'ডগ নলেজ।\nগত মাসে ডালভর্তা খেয়েও এটাই বলেছিলি।'} fs={42} />
      </Ov>
    </AbsoluteFill>
  );
};
