import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useT, prog, pop, bob} from '../utils';
import {Cartoon, INK} from '../Cartoon';
import {MotionBg} from '../Bg';
import {Svg, Pop, CARD, FONT} from '../UI';
import {Icon} from '../Icons';

const T = (n: number, c = INK): React.CSSProperties => ({fontFamily: FONT, fontWeight: 800, fontSize: n, color: c, lineHeight: 1.3, textAlign: 'center'});
const Hi: React.FC<{children: any}> = ({children}) => <span style={{color: '#E5533D'}}>{children}</span>;

const Appear: React.FC<{a: number; children: any; style?: any}> = ({a, children, style}) => {
  const t = useT();
  const k = Math.max(0, pop(t, a, 0.4));
  return <div style={{transform: `scale(${k})`, opacity: Math.min(1, k * 2), ...style}}>{children}</div>;
};

export const Scene7: React.FC = () => {
  const t = useT();
  return (
    <AbsoluteFill>
      <MotionBg c1="#FFF3D6" c2="#F3C98B" />

      {/* 1 - the lesson */}
      <Pop t0={450.8} t1={459.4} x={960} y={400}>
        <div style={{...CARD, width: 1500, padding: '30px 40px'}}>
          <div style={T(68)}>একটা ডিম একজনের পেটও ভরায় না,<br />কিন্তু চারজনে <Hi>ভাগ করে</Hi> খেলে<br />পুরো <Hi>ভোরটা</Hi> ভরে যায়।</div>
        </div>
      </Pop>
      <Pop t0={455} t1={459.4} x={960} y={850}>
        <div style={{display: 'flex', alignItems: 'center', gap: 36}}>
          <Icon n="egg" s={150} />
          <div style={T(110)}>→</div>
          {[0, 1, 2, 3].map((i) => (
            <Appear key={i} a={456.2 + i * 0.5}>
              <div style={{position: 'relative', width: 130, height: 150}}>
                <Icon n="person" s={130} />
                <div style={{position: 'absolute', left: 38, top: 92}}><Icon n="egg" s={54} /></div>
              </div>
            </Appear>
          ))}
        </div>
      </Pop>

      {/* 2 - ask first */}
      <Pop t0={459.5} t1={465.3} x={960} y={500}>
        <div style={{...CARD, width: 1400, padding: '30px 40px'}}>
          <div style={T(58)}>পরের বার ফ্রিজে একটাই ডিম দেখলে,<br />চুপিচুপি যাওয়ার আগে জিজ্ঞেস করে নিও</div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 28, marginTop: 14}}>
            <Icon n="egg" s={130} />
            <div style={T(120, '#E5533D')}>ডিমটা কার?</div>
            <Icon n="qmark" s={130} style={{transform: `rotate(${bob(t, 1, 10)}deg)`}} />
          </div>
        </div>
      </Pop>

      {/* 3 - question one */}
      <Pop t0={465.6} t1={473.1} x={960} y={470}>
        <div style={{...CARD, width: 1450, padding: '30px 40px'}}>
          <div style={{...T(40, '#fff'), display: 'inline-block', background: '#2F6FD6', border: `4px solid ${INK}`, borderRadius: 40, padding: '2px 26px', marginBottom: 12}}>প্রশ্ন ১</div>
          <div style={T(58)}>তোমাদের মেসে বা বাসায় কখনো শেষ <Hi>ডিম</Hi>, শেষ <Hi>বিস্কুট</Hi><br />বা শেষ <Hi>রসগোল্লা</Hi> নিয়ে কাড়াকাড়ি হয়েছে?</div>
          <div style={{display: 'flex', justifyContent: 'center', gap: 60, marginTop: 20}}>
            {[['egg', 468.8], ['biscuit', 469.7], ['rosogolla', 470.7]].map(([n, a]: any) => <Appear key={n} a={a}><Icon n={n} s={140} /></Appear>)}
          </div>
        </div>
      </Pop>

      {/* 4 - question two */}
      <Pop t0={473.2} t1={477.4} x={960} y={300}>
        <div style={{...CARD, width: 1400, padding: '24px 40px'}}>
          <div style={{...T(40, '#fff'), display: 'inline-block', background: '#E0533D', border: `4px solid ${INK}`, borderRadius: 40, padding: '2px 26px', marginBottom: 8}}>প্রশ্ন ২</div>
          <div style={T(58)}>তুমি সাজ্জাদের জায়গায় থাকলে কী করতে?</div>
        </div>
      </Pop>
      <Pop t0={474.9} t1={477.4} x={560} y={700}>
        <div style={{...CARD, width: 640, background: '#FFE9E4'}}><Icon n="egg" s={130} /><div style={T(56)}>চুপচাপ খেয়ে ফেলতাম</div></div>
      </Pop>
      <Pop t0={476.3} t1={477.4} x={1360} y={700}>
        <div style={{...CARD, width: 640, background: '#E4F7E8'}}><Icon n="heart" s={130} /><div style={T(56)}>ভাগ করে নিতাম</div></div>
      </Pop>

      {/* 5 - comment */}
      <Pop t0={477.5} t1={479.7} x={960} y={500}>
        <div style={{...CARD, display: 'flex', alignItems: 'center', gap: 30, padding: '30px 50px'}}>
          <Icon n="comment" s={170} />
          <div style={T(96)}><Hi>কমেন্টে</Hi> জানিয়ে দাও</div>
        </div>
      </Pop>

      {/* 6 - like / share / follow */}
      <Pop t0={479.8} t1={486.2} x={420} y={480}><div style={{...CARD, minWidth: 380}}><Icon n="thumb" s={200} /><div style={T(76)}>লাইক</div></div></Pop>
      <Pop t0={481.4} t1={486.2} x={960} y={480}><div style={{...CARD, minWidth: 380}}><Icon n="share" s={200} /><div style={T(76)}>শেয়ার</div></div></Pop>
      <Pop t0={484.2} t1={486.2} x={1500} y={480}>
        <div style={{...CARD, minWidth: 380}}><Icon n="bell" s={200} style={{transform: `rotate(${bob(t, 2.5, 14)}deg)`}} /><div style={T(76)}>ফলো</div></div>
      </Pop>
      <Pop t0={484.6} t1={486.2} x={960} y={800}>
        <div style={{background: '#E5333D', color: '#fff', border: `5px solid ${INK}`, borderRadius: 70, padding: '10px 54px', fontFamily: FONT, fontWeight: 800, fontSize: 70, boxShadow: '0 10px 0 rgba(0,0,0,.2)'}}>Sajjad Animation</div>
      </Pop>

      {/* 7 - goodbye */}
      <Svg>
        {(['sajjad', 'ashraf', 'sallu', 'munna'] as const).map((w, i) => {
          const k = pop(t, 486.4 + i * 0.15, 0.4);
          return k > 0 ? <Cartoon key={w} who={w} x={400 + i * 370} y={960} scale={0.8 * k} mood="happy" armR={150 + bob(t, 2, 20, i)} /> : null;
        })}
      </Svg>
      <Pop t0={486.6} x={960} y={260}><div style={{...CARD, padding: '16px 50px'}}><div style={T(92)}>দেখা হবে <Hi>পরের গল্পে</Hi></div></div></Pop>
    </AbsoluteFill>
  );
};
