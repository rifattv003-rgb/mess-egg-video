import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, pop, prog, bob} from '../utils';
import {Cartoon, INK} from '../Cartoon';
import {MotionBg} from '../Bg';
import {Svg, Ov, NamePill, Pop, CARD, FONT} from '../UI';
import {Icon} from '../Icons';

const big = (n: number): React.CSSProperties => ({fontFamily: FONT, fontWeight: 800, fontSize: n, color: INK, lineHeight: 1.1});
const red: React.CSSProperties = {...big(52), color: '#D9332B', textAlign: 'center', marginTop: 6};

const CH: any[] = [
  {w: 'sajjad', x: 330, t: 40.5, name: 'সাজ্জাদ', bg: '#2F6FD6', mood: 'smug', notes: [[41.2, 'নিজেকে সবচেয়ে বুদ্ধিমান ভাবে']], icon: 'bulb'},
  {w: 'ashraf', x: 770, t: 43.0, name: 'আশরাফ', bg: '#2E9BD6', mood: 'drowsy', notes: [[44.0, 'চোখের পাতা সারাক্ষণ আধখানা নামানো'], [47.8, '“ভাই, আমি কিন্তু…”'], [51.6, 'মাঝপথে সুতো হারিয়ে ফেলে']], icon: 'qmark'},
  {w: 'sallu', x: 1210, t: 54.5, name: 'সাল্লু', bg: '#E0533D', mood: 'sly', notes: [[54.9, 'নাটকীয় সাল্লু'], [57.0, 'চোখ লালচে, আঙুলে জ্বলন্ত সিগারেট']], icon: 'spark'},
  {w: 'munna', x: 1650, t: 60.7, name: 'মুন্না', bg: '#D99A00', mood: 'deadpan', notes: [[61.2, 'কথা গোনা যায় এক হাতের আঙুলে']], icon: 'paper'},
];

const Tile: React.FC<{t0: number; t1: number; x: number; y: number; children: any}> = ({t0, t1, x, y, children}) => (
  <Pop t0={t0} t1={t1} x={x} y={y}><div style={{...CARD, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>{children}</div></Pop>
);

export const Scene2: React.FC = () => {
  const t = useT();
  const days = [70.5, 71.3, 72.1];
  return (
    <AbsoluteFill>
      <MotionBg />
      {/* A: 28th, empty fridge = empty wallet */}
      <Tile t0={33.2} t1={38.8} x={400} y={500}>
        <div style={{position: 'relative'}}><Icon n="calendar" s={230} /><div style={{...big(92), position: 'absolute', top: 88, left: 0, right: 0, textAlign: 'center'}}>২৮</div></div>
      </Tile>
      <Tile t0={35.4} t1={38.8} x={920} y={500}><Icon n="fridge" s={230} /><div style={red}>ফাঁকা</div></Tile>
      <Pop t0={36.2} t1={38.8} x={1170} y={500}><div style={big(150)}>=</div></Pop>
      <Tile t0={36.8} t1={38.8} x={1420} y={500}><Icon n="wallet" s={230} /><div style={red}>ফাঁকা</div></Tile>

      {/* B: four people */}
      <Pop t0={38.9} t1={40.4} x={960} y={500}>
        <div style={{...CARD, display: 'flex', alignItems: 'center', gap: 10}}>
          {[0, 1, 2, 3].map((i) => <Icon key={i} n="person" s={120} />)}
          <div style={{...big(120), marginLeft: 18}}>৪</div>
        </div>
      </Pop>

      {/* C: characters + name pills + note cards */}
      <Svg>
        {CH.map((c) => {
          const k = pop(t, c.t, 0.4);
          if (t > 66.8 || k <= 0) return null;
          return <Cartoon key={c.w} who={c.w} x={c.x} y={800} scale={0.82 * k} mood={c.mood} />;
        })}
      </Svg>
      <Ov>{CH.map((c) => <NamePill key={c.w} t0={c.t} t1={66.8} x={c.x} y={330} text={c.name} bg={c.bg} />)}</Ov>
      {CH.map((c) => {
        const shown = c.notes.filter((n: any) => t >= n[0]);
        if (!shown.length || t > 66.8) return null;
        return (
          <Pop key={c.w} t0={c.notes[0][0]} t1={66.8} x={c.x} y={850} anchor="top" origin="50% 0%">
            <div style={{...CARD, width: 400, minHeight: 150, padding: '16px 24px'}}>
              {shown.map((n: any, i: number) => (
                <div key={i} style={{fontFamily: FONT, fontWeight: 700, fontSize: 33, lineHeight: 1.3, opacity: prog(t, n[0], n[0] + 0.3)}}>{i === 0 && i === shown.length - 1 && c.icon ? null : null}{n[1]}</div>
              ))}
            </div>
          </Pop>
        );
      })}
      {CH.map((c) => (
        <Pop key={c.w + 'i'} t0={c.t + 0.5} t1={66.8} x={c.x + 150} y={420}><Icon n={c.icon} s={90} style={{transform: `rotate(${bob(t, 0.8, 8)}deg)`}} /></Pop>
      ))}

      {/* D: rent, 3 days left, hungry evening, nobody says anything, everyone checks the fridge */}
      <Tile t0={67.0} t1={70.0} x={620} y={500}><Icon n="home" s={220} /></Tile>
      <Pop t0={67.6} t1={70.0} x={960} y={500}><div style={big(130)}>→</div></Pop>
      <Tile t0={68.2} t1={70.0} x={1300} y={500}><Icon n="wallet" s={220} /><div style={{...red, fontSize: 64}}>০</div></Tile>

      <Pop t0={70.1} t1={73.0} x={960} y={500}>
        <div style={{...CARD, display: 'flex', gap: 28, alignItems: 'center'}}>
          <Icon n="calendar" s={120} />
          {days.map((d, i) => (
            <div key={i} style={{width: 150, height: 150, borderRadius: 28, border: `5px solid ${INK}`, background: t > d ? '#E5533D' : '#fff', color: t > d ? '#fff' : INK, ...big(84), display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${t > d ? 1 + 0.15 * Math.max(0, 1 - (t - d) * 4) : 1})`}}>
              {['১', '২', '৩'][i]}
            </div>
          ))}
        </div>
      </Pop>

      <Pop t0={73.1} t1={76.6} x={960} y={500}>
        <div style={{...CARD, display: 'flex', gap: 30, alignItems: 'center'}}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{opacity: prog(t, 73.2 + i * 0.7, 73.5 + i * 0.7), transform: `translateY(${(1 - prog(t, 73.2 + i * 0.7, 73.6 + i * 0.7)) * 40}px)`}}>
              <Icon n="clock" s={120} />
            </div>
          ))}
          <div style={big(100)}>→</div>
          <Icon n="home" s={150} />
        </div>
      </Pop>

      <Pop t0={76.7} t1={78.4} x={960} y={500}>
        <div style={{...CARD, display: 'flex', gap: 24}}>{[0, 1, 2, 3].map((i) => <Icon key={i} n="face" s={140} />)}</div>
      </Pop>

      <Pop t0={78.5} t1={81.2} x={960} y={500}>
        <div style={{...CARD, display: 'flex', gap: 36, alignItems: 'center'}}>
          <Icon n="eye" s={110} />
          <Icon n="eye" s={110} />
          <div style={{position: 'relative'}}><Icon n="fridge" s={220} /><div style={{position: 'absolute', left: 82, top: 96}}><Icon n="egg" s={60} /></div></div>
          <Icon n="eye" s={110} />
          <Icon n="eye" s={110} />
        </div>
      </Pop>
    </AbsoluteFill>
  );
};
