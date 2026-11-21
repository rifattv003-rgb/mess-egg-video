import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, prog, seg, lerp, pop, bob} from '../utils';
import {Cartoon, hp, INK} from '../Cartoon';
import {Kitchen, Bedroom, Blankets, BED_X} from '../Bg';
import {Svg, Ov, Bubble, Stamp, Burst, Pop, CARD, FONT, TopPill} from '../UI';
import {Icon} from '../Icons';
import {Prop} from '../Props';

const Y = 930;
const S = 1.15;
const X = {sajjad: 500, ashraf: 890, sallu: 1280, munna: 1670};

const inB = (t: number, a: number, b: number) => t >= a && t < b;

export const Scene4: React.FC = () => {
  const t = useT();
  const bed = t >= 248.6;
  const xs: any = bed ? {sajjad: BED_X[0], ashraf: BED_X[1], sallu: BED_X[2], munna: BED_X[3]} : X;
  const sc = bed ? 1.0 : S;
  const y = bed ? 930 : Y;
  const P: any = {};
  (['sajjad', 'ashraf', 'sallu', 'munna'] as const).forEach((w) => (P[w] = hp(w, xs[w], y, sc)));

  // ---- moods / talking ----
  let sajM = 'happy', ashM = 'drowsy', salM = 'sly', munM = 'deadpan';
  let sajT = false, ashT = false, salT = false, munT = false;
  let sajAR = 10, sajAL = 10, salAR = 10, salAL = 10, ashAR = 10, ashAL = 10;
  let shake = 0;
  let ashTrem = 0, salTrem = 0, sajTrem = 0;

  if (inB(t, 174.5, 176.2)) { sajM = ashM = munM = 'laugh'; }
  if (inB(t, 176.2, 179.2)) { salM = 'angry'; salTrem = 2; }
  if (inB(t, 179.2, 183.2)) { sajM = 'sad'; ashM = 'cry'; salM = 'cry'; }
  if (inB(t, 183.3, 188)) { salM = 'cry'; salT = t < 187.6; salAR = 120 + bob(t, 2, 20); salAL = 120 + bob(t, 2, 20, 1); shake = 2; salTrem = 1.5; sajM = 'worried'; }
  if (inB(t, 188.4, 202)) { ashT = inB(t, 188.4, 201.8) && (t % 3 > 0.35); ashM = inB(t, 198.5, 201.8) ? 'worried' : 'drowsy'; }
  if (inB(t, 201.9, 203.4)) { munT = true; }
  if (inB(t, 203.3, 206.8)) { ashM = 'laugh'; ashTrem = 3; sajM = 'worried'; }
  if (inB(t, 206.8, 214)) { sajM = 'smug'; sajAR = 130; sajAL = 130; }
  if (inB(t, 214, 227)) { sajM = 'smug'; sajAR = -70; sajT = true; }
  if (inB(t, 226.8, 229.3)) { munT = (t % 1.2) < 0.9; }
  if (inB(t, 229.3, 232)) { munT = true; }
  if (inB(t, 230, 240.8)) { sajT = ashT = salT = (t % 0.5) < 0.35; sajM = ashM = salM = 'angry'; sajTrem = ashTrem = salTrem = 2; shake = 3; sajAR = salAR = ashAR = 100 + bob(t, 3, 25); sajAL = salAL = ashAL = 100 + bob(t, 3, 25, 2); }
  if (inB(t, 240.8, 243)) { sajM = ashM = salM = 'sad'; }
  if (inB(t, 243, 248.6)) { sajM = salM = 'happy'; ashM = 'drowsy'; }
  if (bed) { sajM = salM = munM = 'sly'; ashM = 'drowsy'; }
  if (inB(t, 253.3, 258)) { sajM = salM = munM = 'sly'; }

  const lookUp = bed && t > 257 ? -1 : 0;
  const emberX = xs.sallu + 198 * (sc / 1.0) * 0.98;
  const emberY = 930 - 296 * sc + 30 * sc + Math.cos((70 * Math.PI) / 180) * 140 * sc - 46 * sc;

  return (
    <AbsoluteFill>
      <Svg shake={shake}>
        {bed ? <Bedroom dark={0.5} /> : <Kitchen dark={0.62} lamp={1} door={0} eggIn />}
        {/* characters */}
        <Cartoon who="sajjad" x={xs.sajjad} y={y} scale={sc} mood={sajM} talking={sajT} armR={bed ? 40 : sajAR} armL={bed ? 40 : sajAL} reachR={inB(t, 214, 227) ? 0.6 : 1} tremble={sajTrem} lookY={lookUp} look={bed ? 0 : 0} />
        <Cartoon who="ashraf" x={xs.ashraf} y={y} scale={sc} mood={ashM} talking={ashT} armR={bed ? 40 : ashAR} armL={bed ? 40 : ashAL} tremble={ashTrem} lookY={lookUp} lean={ashM === 'laugh' ? bob(t, 3, 6) : 0} />
        <Cartoon who="sallu" x={xs.sallu} y={y} scale={sc} mood={salM} talking={salT} armR={bed ? 70 : salAR} armL={bed ? 40 : salAL} tremble={salTrem} lookY={lookUp} />
        <Cartoon who="munna" x={xs.munna} y={y} scale={sc} mood={munM} talking={munT} armR={bed ? 40 : 10} armL={bed ? 40 : 10} lookY={lookUp} />
        {bed && <Blankets />}
        {/* rock paper scissors */}
        {!bed && inB(t, 168.4, 171.2) && [['rock', 0], ['paper', 1], ['scissors', 2]].map(([n, i]: any) => (
          <g key={n} transform={`translate(${760 + i * 200} 250) scale(${pop(t, 168.4 + i * 0.7, 0.3)})`}><Icon n={n} s={140} x={-70} y={-70} /></g>
        ))}
        {!bed && inB(t, 171.2, 174.8) && (
          <g>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <g key={i} transform={`translate(${470 + i * 120} 230) scale(${pop(t, 171.3 + i * 0.32, 0.25)})`}><Icon n="rock" s={100} x={-50} y={-50} /></g>
            ))}
          </g>
        )}
        {/* "?" icons above Ashraf while he searches for the reason */}
        {!bed && inB(t, 198.8, 202) && [0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${P.ashraf.x - 90 + i * 90} ${P.ashraf.topY - 60 - bob(t, 1, 10, i)}) scale(${pop(t, 198.8 + i * 0.7, 0.3)})`}><Icon n="qmark" s={80} x={-40} y={-40} /></g>
        ))}
        {/* Sallu's ember under the blanket */}
        {bed && t > 262 && (
          <g><circle cx={emberX} cy={emberY} r={18 + (t % 1.4 < 0.7 ? 10 : 0)} fill="#FF6B3A" opacity={0.4} /><circle cx={emberX} cy={emberY} r={7} fill="#FF3B1A" /></g>
        )}
        {bed && t > 258.9 && (
          <text x={xs.ashraf + 40} y={P.ashraf.topY - 20 - bob(t, 0.7, 14)} fontFamily={FONT} fontSize={64} fontWeight={800} fill="#CFE0FF">Zzz</text>
        )}
        {/* alarms on each bed */}
        {bed && inB(t, 253.3, 258) && BED_X.map((bx, i) => (
          <g key={bx} transform={`translate(${bx} 420) scale(${pop(t, 253.4 + i * 0.4, 0.3)})`}>
            <Icon n="alarm" s={110} x={-55} y={-55} />
          </g>
        ))}
      </Svg>
      <Ov>
        <Burst x={P.sajjad.x} y={P.sajjad.headY} t0={231} t1={240.6} />
        <Burst x={P.ashraf.x} y={P.ashraf.headY} t0={231.4} t1={240.6} />
        <Burst x={P.sallu.x} y={P.sallu.headY} t0={231.8} t1={240.6} />
        <Stamp t0={176.2} t1={179} x={1280} y={300} text="অবৈধ!" color="#D9332B" fs={96} rot={-9} />
        <Bubble t0={183.3} t1={187.9} x={1180} y={230} tx={P.sallu.x} ty={P.sallu.mouthY - 4} text={'আরে মামা, গত তিন দিন আমি\nশুধু ডাল দিয়া ভাত খাইছি!'} />
        <Bubble t0={188.4} t1={194.5} x={820} y={220} tx={P.ashraf.x} ty={P.ashraf.mouthY - 4} text={'ভাই, আমি কিন্তু ভাবছিলাম...\nডিম আগে, নাকি মুরগি আগে?'} />
        <Bubble t0={194.6} t1={201.9} x={820} y={220} tx={P.ashraf.x} ty={P.ashraf.mouthY - 4} text={'আমার মনে হয় ডিমটা আমারই\nপ্রাপ্য, কারণ... কারণ... ভাই,\nকারণটা যেন কী ছিল?'} fs={42} />
        <Bubble t0={201.9} t1={203.3} x={1560} y={300} tx={P.munna.x} ty={P.munna.mouthY - 4} text="ডগ নলেজ।" />
        <Bubble t0={229.3} t1={231.8} x={1460} y={330} tx={P.munna.x} ty={P.munna.mouthY - 4} text="ডিমটা কার?" />
      </Ov>
      {/* chicken + egg icons while Ashraf asks the riddle */}
      {inB(t, 190.6, 194.5) && (
        <>
          <Pop t0={190.6} t1={194.5} x={640} y={120}><Icon n="egg" s={90} /></Pop>
          <Pop t0={192.4} t1={194.5} x={1000} y={120}><Icon n="chicken" s={100} /></Pop>
        </>
      )}
      {/* Sajjad's list of work (pinned note) */}
      <Pop t0={217} t1={225.2} x={600} y={210}>
        <div style={{...CARD, background: '#FFF3A8', width: 780, transform: 'rotate(-2deg)'}}>
          {[[217.4, 'গত মাসে ২ বার বাজার করা'], [221, 'বাথরুমের কল ঠিক করা']].map(([a, s]: any, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily: FONT, fontWeight: 700, fontSize: 46, opacity: prog(t, a, a + 0.3), lineHeight: 1.5}}>
              <Icon n="check" s={54} /> {s}
            </div>
          ))}
        </div>
      </Pop>
      {/* the deal */}
      <Pop t0={243} t1={248.6} x={960} y={400}>
        <div style={{...CARD, textAlign: 'center', width: 1040}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 16, background: '#E5533D', color: '#fff', border: `4px solid ${INK}`, borderRadius: 50, padding: '4px 30px', fontFamily: FONT, fontWeight: 800, fontSize: 44}}>
            <Icon n="handshake" s={56} /> চুক্তি
          </div>
          <div style={{fontFamily: FONT, fontWeight: 800, fontSize: 60, marginTop: 14, lineHeight: 1.3}}>
            ভোরে যে সবার আগে রান্নাঘরে পৌঁছাবে,<br />ডিমটা <span style={{color: '#E5533D'}}>তার!</span>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', gap: 20, marginTop: 8}}><Icon n="clock" s={70} /><Icon n="egg" s={70} /></div>
        </div>
      </Pop>
      {/* alarm time pills */}
      {bed && inB(t, 253.3, 258) && BED_X.map((bx, i) => (
        <Pop key={bx} t0={253.5 + i * 0.4} t1={258} x={bx} y={320}>
          <div style={{background: '#fff', border: `4px solid ${INK}`, borderRadius: 40, padding: '2px 22px', fontFamily: FONT, fontWeight: 800, fontSize: 44}}>৫:৩০</div>
        </Pop>
      ))}
      <TopPill t0={241} t1={246} icon="clock" text="রাত ২:০০" />
    </AbsoluteFill>
  );
};
