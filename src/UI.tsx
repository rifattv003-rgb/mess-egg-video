import React from 'react';
import {loadFont} from '@remotion/google-fonts/HindSiliguri';
import {useT, pop, prog, cl, lerp} from './utils';
import {Icon} from './Icons';
import {INK} from './Cartoon';
import {CAPTIONS} from './data/captions';
import {HIDE} from './timeline';

const {fontFamily} = loadFont('normal', {weights: ['400', '500', '600', '700', '800'] as any, subsets: ['bengali', 'latin']});
export const FONT = fontFamily;

/** Scene canvas (1920x1080 SVG) with optional camera + screen shake. */
export const Svg: React.FC<{cam?: {s: number; cx: number; cy: number}; shake?: number; children?: any}> = ({cam, shake = 0, children}) => {
  const t = useT();
  const c = cam || {s: 1, cx: 960, cy: 540};
  const sx = shake ? Math.sin(t * 71) * shake + Math.sin(t * 43) * shake * 0.6 : 0;
  const sy = shake ? Math.cos(t * 59) * shake : 0;
  const k = c.s * (shake ? 1.03 : 1);
  return (
    <svg viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%'}}>
      <g transform={`translate(${960 + sx} ${540 + sy}) scale(${k}) translate(${-c.cx} ${-c.cy})`}>{children}</g>
    </svg>
  );
};
export const Ov: React.FC<{children?: any}> = ({children}) => (
  <svg viewBox="0 0 1920 1080" style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>{children}</svg>
);

const outA = (t: number, t1: number, d = 0.25) => (t > t1 ? 1 - prog(t, t1, t1 + d) : 1);

export const Bubble: React.FC<any> = ({t0, t1, x, y, tx, ty, text = '', icons, kind = 'speech', fs = 46}) => {
  const t = useT();
  if (t < t0 || t > t1 + 0.25) return null;
  const lines: string[] = text ? text.split('\n') : [];
  const mx = Math.max(0, ...lines.map((l) => Array.from(l).length));
  const w = icons ? icons.length * 120 + 70 : mx * fs * 0.55 + 80;
  const h = icons ? 150 : lines.length * fs * 1.35 + 46;
  const s = Math.max(0.001, pop(t, t0, 0.3) * outA(t, t1));
  const bx = cl(tx, x - w / 2 + 50, x + w / 2 - 50);
  const fill = kind === 'whisper' ? '#EEF4FF' : '#fff';
  const dash = kind === 'whisper' ? '12 9' : undefined;
  const by = y + h / 2;
  return (
    <g transform={`translate(${tx} ${ty}) scale(${s}) translate(${-tx} ${-ty})`} opacity={outA(t, t1)}>
      {kind === 'thought' ? (
        <g>
          <ellipse cx={x} cy={y} rx={w / 2 + 14} ry={h / 2 + 10} fill={fill} stroke={INK} strokeWidth={4} />
          {[0.3, 0.55, 0.8].map((k, i) => (
            <circle key={i} cx={lerp(bx, tx, k)} cy={lerp(by + 14, ty, k)} r={[17, 12, 8][i]} fill={fill} stroke={INK} strokeWidth={3.5} />
          ))}
        </g>
      ) : (
        <g>
          <polygon points={`${bx - 18},${by - 4} ${bx + 18},${by - 4} ${tx},${ty}`} fill={fill} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
          <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={40} fill={fill} stroke={INK} strokeWidth={4} strokeDasharray={dash} />
          <rect x={bx - 14} y={by - 6} width={28} height={9} fill={fill} />
        </g>
      )}
      {lines.length > 0 && (
        <text textAnchor="middle" fontFamily={FONT} fontSize={fs} fontWeight={600} fill={INK}>
          {lines.map((l, i) => (
            <tspan key={i} x={x} y={y - h / 2 + 23 + fs * 0.95 + i * fs * 1.35}>{l}</tspan>
          ))}
        </text>
      )}
      {icons && icons.map((n: string, i: number) => (
        <Icon key={i} n={n} s={100} x={x - w / 2 + 35 + i * 120} y={y - 50 + Math.sin(t * 5 + i) * 4} />
      ))}
    </g>
  );
};

export const Stamp: React.FC<any> = ({t0, t1, x, y, text, color = '#D9332B', fs = 88, rot = -8}) => {
  const t = useT();
  if (t < t0 || t > t1 + 0.2) return null;
  const k = prog(t, t0, t0 + 0.2);
  const sc = 1 + 1.5 * (1 - k) * (1 - k);
  const w = Array.from(text as string).length * fs * 0.62 + 90;
  const h = fs * 1.55;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${sc})`} opacity={k * outA(t, t1, 0.2)}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={20} fill="rgba(255,255,255,.94)" stroke={color} strokeWidth={10} />
      <rect x={-w / 2 + 12} y={-h / 2 + 12} width={w - 24} height={h - 24} rx={12} fill="none" stroke={color} strokeWidth={3} />
      <text textAnchor="middle" y={fs * 0.33} fontFamily={FONT} fontSize={fs} fontWeight={800} fill={color}>{text}</text>
    </g>
  );
};

export const NamePill: React.FC<any> = ({t0, t1 = 1e9, x, y, text, bg, fs = 42}) => {
  const t = useT();
  if (t < t0 || t > t1 + 0.25) return null;
  const w = Array.from(text as string).length * fs * 0.6 + 56;
  const h = fs * 1.7;
  const s = Math.max(0.001, pop(t, t0, 0.35) * outA(t, t1));
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={bg} stroke={INK} strokeWidth={3.5} />
      <text textAnchor="middle" y={fs * 0.36} fontFamily={FONT} fontSize={fs} fontWeight={700} fill="#fff">{text}</text>
    </g>
  );
};

/** Radiating "shouting" lines around a head. */
export const Burst: React.FC<{x: number; y: number; t0: number; t1: number; r?: number}> = ({x, y, t0, t1, r = 120}) => {
  const t = useT();
  if (t < t0 || t > t1) return null;
  return (
    <g transform={`translate(${x} ${y})`} stroke={INK} strokeWidth={5} strokeLinecap="round">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const a = (-200 + i * 25) * (Math.PI / 180);
        const p = 0.5 + 0.5 * Math.sin(t * 16 + i * 1.7);
        const r0 = r + p * 14;
        const r1 = r + 36 + p * 26;
        return <line key={i} x1={Math.cos(a) * r0} y1={Math.sin(a) * r0} x2={Math.cos(a) * r1} y2={Math.sin(a) * r1} />;
      })}
    </g>
  );
};

// ---------- HTML layer ----------
export const CARD: React.CSSProperties = {
  background: '#FFFDF7', border: `5px solid ${INK}`, borderRadius: 34, padding: '22px 32px',
  boxShadow: '0 12px 0 rgba(34,34,34,.18)', fontFamily: FONT, color: INK,
};

export const Pop: React.FC<any> = ({t0, t1 = 1e9, x, y, children, style, from = 'pop', origin = '50% 50%', anchor = 'center'}) => {
  const t = useT();
  if (t < t0 || t > t1 + 0.3) return null;
  const s = Math.max(0.001, pop(t, t0, 0.4)) * (t1 < 1e8 && t > t1 - 0.25 ? 1 - 0.1 * prog(t, t1 - 0.25, t1) : 1);
  const op = t1 < 1e8 ? cl((t1 - t) / 0.25) : 1;
  const up = from === 'up' ? `translateY(${(1 - prog(t, t0, t0 + 0.3)) * 40}px)` : '';
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `${anchor === 'center' ? 'translate(-50%,-50%)' : 'translateX(-50%)'} scale(${s}) ${up}`, transformOrigin: origin, opacity: op, ...style}}>
      {children}
    </div>
  );
};

/** small location / time pill floating on top of the scene */
export const TopPill: React.FC<{t0: number; t1: number; icon: string; text: string}> = ({t0, t1, icon, text}) => (
  <Pop t0={t0} t1={t1} x={960} y={86} from="up">
    <div style={{display: 'flex', alignItems: 'center', gap: 14, background: '#FFC53D', border: `5px solid ${INK}`, borderRadius: 60, padding: '8px 30px 8px 18px', fontFamily: FONT, fontWeight: 800, fontSize: 46, color: INK, boxShadow: '0 8px 0 rgba(0,0,0,.2)'}}>
      <Icon n={icon} s={52} />
      {text}
    </div>
  </Pop>
);

/** bottom overlay caption: only when no bubble / card is on screen */
export const Captions: React.FC = () => {
  const t = useT();
  for (const [a, b] of HIDE) if (t >= a && t < b) return null;
  const p = CAPTIONS.find((c) => t >= c[0] && t < c[1]);
  if (!p) return null;
  const k = prog(t, p[0], p[0] + 0.18);
  const parts = p[2].split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 64, display: 'flex', justifyContent: 'center', opacity: k, transform: `translateY(${(1 - k) * 26}px) scale(${0.96 + 0.04 * k})`}}>
      <div style={{fontFamily: FONT, fontSize: 60, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', WebkitTextStroke: '11px #222', paintOrder: 'stroke fill', letterSpacing: 0.5, textAlign: 'center'}}>
        {parts.map((s, i) =>
          s.startsWith('*') ? <span key={i} style={{color: '#FFD84D', fontWeight: 800}}>{s.slice(1, -1)}</span> : <span key={i}>{s}</span>,
        )}
      </div>
    </div>
  );
};
