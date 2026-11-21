import React from 'react';
import {useT, bob, jit, cl} from './utils';
import {Prop} from './Props';

export const INK = '#222222';
export type Who = 'sajjad' | 'ashraf' | 'sallu' | 'munna';

// ---- character sheets (from the character list) ----
const C: any = {
  sajjad: {skin: '#EDB88F', hair: '#1A1A1F', legL: 156, bodyH: 196, bodyW: 116, R: 76, arm: 150, top: '#9CA3AB', pants: '#23272E', pantsTo: 0.52, sleeve: 0.42, shoe: '#2F6FD6', legW: 30},
  ashraf: {skin: '#E3B08A', hair: '#2B2320', legL: 128, bodyH: 170, bodyW: 96, R: 72, arm: 136, top: '#8EC5F0', pants: '#C2B280', pantsTo: 1, sleeve: 0.8, shoe: '#6B4F3A', legW: 26},
  sallu: {skin: '#D9A67C', hair: '#1C1512', legL: 120, bodyH: 176, bodyW: 150, R: 80, arm: 140, top: '#F4F4F2', pants: '#C0392B', pantsTo: 0, sleeve: 0, shoe: '#555555', legW: 30},
  munna: {skin: '#E6B48C', hair: '#2A2420', legL: 140, bodyH: 182, bodyW: 110, R: 72, arm: 144, top: '#F2C94C', pants: '#2F5D3A', pantsTo: 1, sleeve: 0.4, shoe: '#3A3A3A', legW: 30},
};

// o = eye openness, tilt = brow tilt (+ = inner end up / sad, - = angry), lift = brow lift (px, - = up)
const MOODS: any = {
  neutral: {o: 1, tilt: 0, lift: 0}, happy: {o: 1, tilt: -3, lift: -4}, laugh: {o: 0, arc: 1, tilt: -6, lift: -6},
  sad: {o: 0.85, tilt: 20, lift: 2}, cry: {o: 0.7, tilt: 22, lift: 2, tears: 1}, worried: {o: 1, tilt: 14, lift: -2},
  angry: {o: 0.8, tilt: -20, lift: 4}, surprised: {o: 1, tilt: 0, lift: -14, big: 1}, sly: {o: 0.6, tilt: -8, lift: 0},
  drowsy: {o: 0.4, tilt: 6, lift: 5}, deadpan: {o: 0.7, tilt: 0, lift: 2}, smug: {o: 0.85, tilt: -6, lift: -2},
  love: {o: 1, tilt: 0, lift: -4, love: 1},
};

export const hp = (who: Who, x: number, y: number, scale = 1.2, sit?: string) => {
  const c = C[who];
  const hip = sit === 'chair' ? -95 : sit === 'floor' ? -34 : -c.legL;
  const top = hip - c.bodyH;
  const hc = top - c.R * 0.86;
  return {x, headY: y + scale * hc, mouthY: y + scale * (hc + c.R * 0.44), topY: y + scale * (hc - c.R * 1.1), eyeY: y + scale * (hc - c.R * 0.08), eyeDx: scale * c.R * 0.38};
};

const Cap = ({x1, y1, x2, y2, w, fill}: any) => (
  <g strokeLinecap="round">
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={w + 5} />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={fill} strokeWidth={w} />
  </g>
);

const HEART = 'M0 28C-44 -2 -34 -36 -14 -34C-6 -33 0 -26 0 -20C0 -26 6 -33 14 -34C34 -36 44 -2 0 28Z';

const Eye = ({cx, cy, open, arcs, love, look, lookY, sj, sallu, big, skin}: any) => {
  const rx = sj ? 16 : 15;
  const ry = big ? 20 : 17;
  if (arcs) return <path d={`M${cx - 15} ${cy + 5} Q${cx} ${cy - 14} ${cx + 15} ${cy + 5}`} stroke={INK} strokeWidth={4.5} fill="none" strokeLinecap="round" />;
  const cov = cl(1 - open);
  const yc = cy - ry + 2 * ry * cov;
  const dy = (yc - cy) / ry;
  const dx = rx * Math.sqrt(Math.max(0, 1 - dy * dy));
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={sallu ? '#F5C9C0' : '#fff'} stroke={INK} strokeWidth={2.5} />
      {love ? (
        <path transform={`translate(${cx} ${cy}) scale(.24)`} d={HEART} fill="#E5333D" />
      ) : (
        <>
          <circle cx={cx + look * 5} cy={cy + lookY * 5 + 1} r={sj ? 10 : 7.5} fill={sj ? '#5A3A22' : '#2A1B14'} />
          {sj && <circle cx={cx + look * 5} cy={cy + lookY * 5 + 1} r={4.8} fill="#111" />}
          <circle cx={cx + look * 5 + 2.8} cy={cy + lookY * 5 - 3} r={sj ? 3.4 : 2.6} fill="#fff" />
        </>
      )}
      {cov > 0.03 && <path d={`M${cx - dx} ${yc} A${rx} ${ry} 0 ${dy > 0 ? 1 : 0} 1 ${cx + dx} ${yc} Z`} fill={skin} stroke={INK} strokeWidth={2.5} />}
    </g>
  );
};

const Mouth = ({mood, talk, f, sj}: any) => {
  const dark = '#7A2E2E';
  if (talk) {
    const k = [1, 2, 1, 0, 2, 1][Math.floor(f / 3.3) % 6];
    if (k === 0) return <path d="M-13 2Q0 7 13 2" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />;
    if (k === 1) return <ellipse cx="0" cy="5" rx="10" ry="8" fill={dark} stroke={INK} strokeWidth={2.5} />;
    return <ellipse cx="0" cy="8" rx="15" ry="14" fill={dark} stroke={INK} strokeWidth={2.5} />;
  }
  const line = (d: string) => <path d={d} stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />;
  switch (mood) {
    case 'happy': case 'love':
      return sj ? <path d="M-22 -2Q0 30 22 -2Q0 8 -22 -2Z" fill="#fff" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" /> : line('M-18 0Q0 20 18 0');
    case 'smug':
      return sj ? <g><path d="M-18 4Q4 22 22 -6Q2 8 -18 4Z" fill="#fff" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" /><path d="M24 -8Q28 -4 26 2" stroke={INK} strokeWidth={2.5} fill="none" /></g> : line('M-16 4Q4 14 18 -6');
    case 'laugh':
      return (<g><path d="M-24 -4Q0 42 24 -4Z" fill={dark} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" /><path d="M-21 -3Q0 8 21 -3Z" fill="#fff" /></g>);
    case 'sad': case 'cry':
      return line('M-16 10Q0 -6 16 10');
    case 'surprised':
      return <ellipse cx="0" cy="8" rx="11" ry="15" fill={dark} stroke={INK} strokeWidth={2.5} />;
    case 'angry':
      return line('M-16 8Q0 -2 16 6');
    case 'sly':
      return line('M-16 4Q2 12 18 -4');
    case 'drowsy':
      return <ellipse cx="2" cy="6" rx="9" ry="5" fill={dark} stroke={INK} strokeWidth={2.5} />;
    case 'worried':
      return line('M-16 8Q-8 -2 0 8Q8 16 16 6');
    default:
      return line('M-12 4L12 4');
  }
};

const Hair = ({who, c, rx, ry}: any) => {
  const h = c.hair;
  const R = c.R;
  if (who === 'sajjad')
    return (
      <g>
        <path d={`M${-rx * 1.02} ${-ry * 0.1}C${-rx * 1.12} ${-ry} ${-rx * 0.2} ${-ry * 1.5} ${rx * 0.55} ${-ry * 1.22}C${rx * 1.12} ${-ry * 1.05} ${rx * 1.1} ${-ry * 0.5} ${rx * 1.02} ${-ry * 0.1}C${rx * 0.9} ${-ry * 0.55} ${rx * 0.3} ${-ry * 0.72} ${-rx * 0.2} ${-ry * 0.64}C${-rx * 0.6} ${-ry * 0.56} ${-rx * 0.85} ${-ry * 0.4} ${-rx * 1.02} ${-ry * 0.1}Z`} fill={h} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
        <path d={`M${-rx * 0.45} ${-ry * 1.08}Q${rx * 0.05} ${-ry * 1.34} ${rx * 0.5} ${-ry * 1.12}`} stroke="#555566" strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
    );
  if (who === 'ashraf')
    return (
      <g fill={h} stroke={INK} strokeWidth={2.5} strokeLinejoin="round">
        <path d={`M${-rx} ${-ry * 0.1}C${-rx * 1.05} ${-ry * 1.1} ${rx * 1.05} ${-ry * 1.1} ${rx} ${-ry * 0.1}C${rx * 0.75} ${-ry * 0.6} ${-rx * 0.75} ${-ry * 0.6} ${-rx} ${-ry * 0.1}Z`} />
        <path d={`M${-rx * 0.7} ${-ry * 0.95}L${-rx * 0.95} ${-ry * 1.35}L${-rx * 0.3} ${-ry * 1.02}Z`} />
        <path d={`M${-rx * 0.1} ${-ry * 1.02}L${rx * 0.05} ${-ry * 1.45}L${rx * 0.4} ${-ry}Z`} />
        <path d={`M${rx * 0.55} ${-ry * 0.95}L${rx} ${-ry * 1.3}L${rx * 0.95} ${-ry * 0.7}Z`} />
      </g>
    );
  if (who === 'sallu')
    return (
      <g fill={h} stroke={INK} strokeWidth={2.5}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = ((200 + i * 20.5) * Math.PI) / 180;
          return <circle key={i} cx={Math.cos(a) * rx} cy={Math.sin(a) * ry} r={R * 0.27} />;
        })}
        <path d={`M${-rx * 0.95} ${-ry * 0.2}Q0 ${-ry * 1.15} ${rx * 0.95} ${-ry * 0.2}Q0 ${-ry * 0.62} ${-rx * 0.95} ${-ry * 0.2}Z`} stroke="none" />
      </g>
    );
  return (
    <path d={`M${-rx * 0.98} ${-ry * 0.2}C${-rx * 1.02} ${-ry * 1.12} ${rx * 1.02} ${-ry * 1.12} ${rx * 0.98} ${-ry * 0.2}C${rx * 0.7} ${-ry * 0.7} ${-rx * 0.7} ${-ry * 0.7} ${-rx * 0.98} ${-ry * 0.2}Z`} fill={h} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
  );
};

const Brow = ({cx, cy, side, tilt, lift, w, thick, arch, color}: any) => (
  <path d={`M${-w} 0Q0 ${-arch} ${w} 0`} transform={`translate(${cx} ${cy + lift}) rotate(${side * tilt})`} stroke={color} strokeWidth={thick} fill="none" strokeLinecap="round" />
);

export type CartoonProps = {
  who: Who; x: number; y: number; scale?: number; flip?: boolean; mood?: string; talking?: boolean;
  armL?: number; armR?: number; reachL?: number; reachR?: number; handL?: string; handR?: string; rotL?: number; rotR?: number;
  walk?: boolean; walkSpeed?: number; sneak?: boolean; sit?: '' | 'floor' | 'chair'; tremble?: number;
  look?: number; lookY?: number; lean?: number; headTilt?: number; dim?: number; shoe?: 'both' | 'right' | 'none';
  cigAsh?: number; noGamchha?: boolean; shut?: boolean; jumpY?: number;
};

export const Cartoon: React.FC<CartoonProps> = ({
  who, x, y, scale = 1.2, flip, mood = 'neutral', talking, armL = 8, armR = 8, reachL = 1, reachR = 1, handL, handR, rotL = 0, rotR = 0,
  walk, walkSpeed = 1.4, sneak, sit = '', tremble = 0, look = 0, lookY = 0, lean = 0, headTilt = 0, dim = 0, shoe = 'both',
  cigAsh = 0, noGamchha, shut, jumpY = 0,
}) => {
  const t = useT();
  const f = t * 30;
  const c = C[who];
  const R = c.R;
  const rx = R * 0.92;
  const ry = R;
  const sj = who === 'sajjad';
  const idle = sit ? bob(t, 0.5, 2.5, who.length) : bob(t, 0.55, 5, who.length);
  const j = tremble ? jit(t, tremble) : {x: 0, y: 0};
  const hipY = sit === 'chair' ? -95 : sit === 'floor' ? -34 : -c.legL;
  const bodyTop = hipY - c.bodyH;
  const m = MOODS[mood] || MOODS.neutral;
  const sway = sit ? 0 : bob(t, 0.55, 2.5, who.length + 1);

  // ---- legs ----
  const phase = t * walkSpeed * Math.PI * 2;
  const amp = sneak ? 14 : 30;
  const legs = [-1, 1].map((i) => {
    const hx = i * c.bodyW * 0.22;
    let fx = hx;
    let fy = -12;
    if (sit === 'floor') {
      fx = i * c.bodyW * 0.9;
      fy = -20;
    } else if (sit === 'chair') {
      fx = i * c.bodyW * 0.3;
    } else if (walk) {
      const p = phase + (i > 0 ? Math.PI : 0);
      fx = hx + Math.sin(p) * amp;
      fy = -12 - Math.max(0, Math.cos(p)) * (sneak ? 26 : 18);
    }
    const hipX = sit === 'floor' ? hx : hx;
    const showShoe = shoe === 'both' || (shoe === 'right' && i > 0);
    return (
      <g key={i}>
        <Cap x1={hipX} y1={hipY} x2={fx} y2={fy} w={c.legW} fill={c.skin} />
        {c.pantsTo > 0 && <Cap x1={hipX} y1={hipY} x2={hipX + (fx - hipX) * c.pantsTo} y2={hipY + (fy - hipY) * c.pantsTo} w={c.legW + 4} fill={c.pants} />}
        {showShoe ? (
          <ellipse cx={fx} cy={fy + 8} rx={sj ? 27 : 24} ry={sj ? 9 : 10} fill={c.shoe} stroke={INK} strokeWidth={2.5} />
        ) : (
          <ellipse cx={fx} cy={fy + 8} rx={20} ry={8} fill={c.skin} stroke={INK} strokeWidth={2.5} />
        )}
      </g>
    );
  });

  // ---- arms ----
  const hR = handR ?? (who === 'sallu' && handL !== 'cig' ? 'cig' : undefined);
  const arm = (side: 'L' | 'R') => {
    const s = side === 'R' ? 1 : -1;
    const th = (((side === 'R' ? armR : armL) + sway) * Math.PI) / 180;
    const L = c.arm * (side === 'R' ? reachR : reachL);
    const sx = s * (c.bodyW / 2 - 8);
    const sy = bodyTop + 30;
    const hx = sx + Math.sin(th) * L * s;
    const hy = sy + Math.cos(th) * L;
    const hand = side === 'R' ? hR : handL;
    const rot = side === 'R' ? rotR : rotL;
    const sl = c.sleeve;
    return (
      <g key={side}>
        <Cap x1={sx} y1={sy} x2={hx} y2={hy} w={22} fill={c.skin} />
        {sl > 0 && <Cap x1={sx} y1={sy} x2={sx + (hx - sx) * sl} y2={sy + (hy - sy) * sl} w={28} fill={c.top} />}
        {who === 'ashraf' && <Cap x1={sx + (hx - sx) * 0.7} y1={sy + (hy - sy) * 0.7} x2={sx + (hx - sx) * 0.8} y2={sy + (hy - sy) * 0.8} w={32} fill="#6FA9D6" />}
        {hand && hand !== 'none' && (
          <g transform={`translate(${hx} ${hy}) rotate(${rot})`}>
            <Prop name={hand} ash={cigAsh} />
          </g>
        )}
        <circle cx={hx} cy={hy} r={15} fill={c.skin} stroke={INK} strokeWidth={2.5} />
      </g>
    );
  };

  // ---- face ----
  const eyeY = -R * 0.08;
  const ex = R * 0.38;
  let open = m.o * (who === 'ashraf' ? (mood === 'surprised' ? 1 : 0.55) : who === 'sallu' ? 0.85 : 1);
  const per = 120 + who.length * 13;
  if ((f + who.length * 23) % per < 4) open *= 0.05;
  const arcs = !!(m.arc || shut);
  const mouthY = who === 'sallu' ? R * 0.56 : R * 0.44;
  const tilt = headTilt + (who === 'ashraf' && mood === 'drowsy' ? bob(t, 0.3, 5) : 0);
  const browW = sj ? 26 : 22;
  const faceD = `M${-rx} ${-ry * 0.05}C${-rx} ${-ry * 1.15} ${rx} ${-ry * 1.15} ${rx} ${-ry * 0.05}C${rx} ${ry * 0.55} ${rx * 0.55} ${ry} 0 ${ry}C${-rx * 0.55} ${ry} ${-rx} ${ry * 0.55} ${-rx} ${-ry * 0.05}Z`;

  const head = (
    <g transform={`translate(0 ${bodyTop - R * 0.86}) rotate(${tilt})`}>
      <ellipse cx={-rx * 0.98} cy={6} rx={12} ry={16} fill={c.skin} stroke={INK} strokeWidth={2.5} />
      <ellipse cx={rx * 0.98} cy={6} rx={12} ry={16} fill={c.skin} stroke={INK} strokeWidth={2.5} />
      {sj ? <path d={faceD} fill={c.skin} stroke={INK} strokeWidth={2.5} /> : <ellipse cx={0} cy={0} rx={rx} ry={ry} fill={c.skin} stroke={INK} strokeWidth={2.5} />}
      {sj && <path d={`M${-rx * 0.97} ${ry * 0.05}C${-rx} ${ry * 0.55} ${-rx * 0.55} ${ry * 0.98} 0 ${ry * 0.98}C${rx * 0.55} ${ry * 0.98} ${rx} ${ry * 0.55} ${rx * 0.97} ${ry * 0.05}C${rx * 0.8} ${ry * 0.45} ${rx * 0.45} ${ry * 0.64} 0 ${ry * 0.64}C${-rx * 0.45} ${ry * 0.64} ${-rx * 0.8} ${ry * 0.45} ${-rx * 0.97} ${ry * 0.05}Z`} fill={c.hair} opacity={0.5} />}
      {who === 'ashraf' &&
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const a = ((25 + i * 11) * Math.PI) / 180;
          return <circle key={i} cx={Math.cos(a) * rx * 0.82} cy={Math.sin(a) * ry * 0.84} r={1.9} fill={c.hair} opacity={0.6} />;
        })}
      <Eye cx={-ex} cy={eyeY} open={open} arcs={arcs} love={m.love} look={look} lookY={lookY} sj={sj} sallu={who === 'sallu'} big={m.big} skin={c.skin} />
      <Eye cx={ex} cy={eyeY} open={open} arcs={arcs} love={m.love} look={look} lookY={lookY} sj={sj} sallu={who === 'sallu'} big={m.big} skin={c.skin} />
      {who === 'ashraf' && (
        <g>
          <path d={`M${-ex - 14} ${eyeY + 24}Q${-ex} ${eyeY + 32} ${-ex + 14} ${eyeY + 24}`} stroke="#7B5E8A" strokeWidth={4} fill="none" opacity={0.55} strokeLinecap="round" />
          <path d={`M${ex - 14} ${eyeY + 24}Q${ex} ${eyeY + 32} ${ex + 14} ${eyeY + 24}`} stroke="#7B5E8A" strokeWidth={4} fill="none" opacity={0.55} strokeLinecap="round" />
          <g transform={`rotate(8 0 ${eyeY})`} fill="none" stroke="#111" strokeWidth={4}>
            <rect x={-ex - 24} y={eyeY - 21} width={48} height={42} rx={13} fill="rgba(255,255,255,.18)" />
            <rect x={ex - 24} y={eyeY - 21} width={48} height={42} rx={13} fill="rgba(255,255,255,.18)" />
            <path d={`M${-ex + 24} ${eyeY - 4}Q0 ${eyeY - 12} ${ex - 24} ${eyeY - 4}`} />
            <path d={`M${-ex - 24} ${eyeY - 8}L${-rx} ${eyeY - 6}M${ex + 24} ${eyeY - 8}L${rx} ${eyeY - 6}`} />
          </g>
        </g>
      )}
      <Brow cx={-ex} cy={eyeY - 28} side={-1} tilt={m.tilt} lift={m.lift} w={browW} thick={sj ? 8 : 5.5} arch={sj ? 8 : 4} color={c.hair} />
      <Brow cx={ex} cy={eyeY - 28} side={1} tilt={m.tilt} lift={m.lift + (mood === 'smug' || mood === 'sly' ? -5 : 0)} w={browW} thick={sj ? 8 : 5.5} arch={sj ? 8 : 4} color={c.hair} />
      <path d={`M${sj ? -2 : -3} ${R * 0.14}Q${sj ? 6 : 6} ${R * 0.3} -2 ${R * 0.34}`} stroke={INK} strokeWidth={2.8} fill="none" strokeLinecap="round" />
      <g transform={`translate(0 ${mouthY})`}>
        <Mouth mood={mood} talk={talking} f={f} sj={sj} />
      </g>
      {who === 'sallu' && <path d={`M0 ${R * 0.4}Q${-R * 0.3} ${R * 0.28} ${-R * 0.56} ${R * 0.5}Q${-R * 0.3} ${R * 0.46} 0 ${R * 0.46}Q${R * 0.3} ${R * 0.46} ${R * 0.56} ${R * 0.5}Q${R * 0.3} ${R * 0.28} 0 ${R * 0.4}Z`} fill={c.hair} stroke={INK} strokeWidth={2} />}
      {m.tears &&
        [0, 1].map((i) => {
          const p = (t * 1.3 + i * 0.5) % 1;
          return <path key={i} transform={`translate(${(i ? 1 : -1) * ex} ${eyeY + 18 + p * 46}) scale(${1 - p * 0.3})`} d="M0 -8Q8 4 0 9Q-8 4 0 -8Z" fill="#6EC3F2" stroke={INK} strokeWidth={1.8} opacity={1 - p * 0.6} />;
        })}
      <Hair who={who} c={c} rx={rx} ry={ry} />
      {sj && (mood === 'happy' || mood === 'smug' || mood === 'love') && (
        <g transform={`translate(${rx * 0.62} ${R * 0.38}) scale(${0.18 + 0.05 * Math.sin(t * 6)})`} opacity={0.9}>
          <path d="M0 -50Q4 -4 50 0Q4 4 0 50Q-4 4 -50 0Q-4 -4 0 -50Z" fill="#fff" stroke={INK} strokeWidth={8} />
        </g>
      )}
    </g>
  );

  // ---- garments ----
  const gar = (() => {
    if (who === 'sallu') {
      const hem = sit === 'floor' ? -8 : -48;
      const hw = sit === 'floor' ? c.bodyW / 2 + 95 : c.bodyW / 2 + 18;
      return (
        <g>
          <rect x={-c.bodyW / 2 + 8} y={bodyTop + 30} width={c.bodyW - 16} height={c.bodyH - 30} rx={40} fill="#fff" stroke={INK} strokeWidth={2.5} />
          <rect x={-46} y={bodyTop - 2} width={24} height={40} fill="#fff" stroke={INK} strokeWidth={2.5} />
          <rect x={22} y={bodyTop - 2} width={24} height={40} fill="#fff" stroke={INK} strokeWidth={2.5} />
          <path d={`M${-c.bodyW / 2 - 4} ${hipY - 44}L${c.bodyW / 2 + 4} ${hipY - 44}L${hw} ${hem}L${-hw} ${hem}Z`} fill="url(#lungiPat)" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
          <rect x={-c.bodyW / 2 - 4} y={hipY - 50} width={c.bodyW + 8} height={12} rx={6} fill="#8E2A1F" stroke={INK} strokeWidth={2.5} />
          {!noGamchha && (
            <g>
              <path d={`M${-c.bodyW / 2 + 6} ${bodyTop + 8}L${-c.bodyW / 2 + 46} ${bodyTop + 2}L${-c.bodyW / 2 + 14} ${bodyTop + c.bodyH * 0.66}L${-c.bodyW / 2 - 14} ${bodyTop + c.bodyH * 0.6}Z`} fill="#2E9E4F" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
              <path d={`M${-c.bodyW / 2 + 2} ${bodyTop + 50}L${-c.bodyW / 2 + 36} ${bodyTop + 44}M${-c.bodyW / 2 - 2} ${bodyTop + 86}L${-c.bodyW / 2 + 28} ${bodyTop + 80}`} stroke="#fff" strokeWidth={3} />
            </g>
          )}
        </g>
      );
    }
    const waist = <rect x={-c.bodyW / 2} y={hipY - 30} width={c.bodyW} height={36} rx={14} fill={c.pants} stroke={INK} strokeWidth={2.5} />;
    if (who === 'ashraf')
      return (
        <g>
          {waist}
          <path d={`M-24 ${bodyTop}L0 ${bodyTop + 32}L24 ${bodyTop}L15 ${bodyTop - 6}L0 ${bodyTop + 8}L-15 ${bodyTop - 6}Z`} fill="#6FA9D6" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
          <path d={`M0 ${bodyTop + 32}L0 ${hipY - 30}`} stroke={INK} strokeWidth={2.5} />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={i < 2 ? 0 : 9} cy={bodyTop + 54 + i * 26} r={4.5} fill="#fff" stroke={INK} strokeWidth={2} />
          ))}
          <path d={`M${-c.bodyW / 2 + 6} ${hipY - 30}L${-c.bodyW / 2 + 6} ${hipY - 18}L${-6} ${hipY - 30}Z`} fill={c.top} stroke={INK} strokeWidth={2} />
        </g>
      );
    return (
      <g>
        {waist}
        <path d={`M-26 ${bodyTop}Q0 ${bodyTop + 34} 26 ${bodyTop}Z`} fill={c.skin} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      </g>
    );
  })();

  return (
    <g transform={`translate(${x + j.x} ${y - jumpY + idle + j.y}) scale(${flip ? -scale : scale} ${scale}) rotate(${lean})`} style={dim > 0 ? {filter: `brightness(${1 - dim})`} : undefined}>
      <defs>
        <pattern id="lungiPat" width="26" height="26" patternUnits="userSpaceOnUse">
          <rect width="26" height="26" fill="#fff" />
          <rect width="13" height="26" fill="#D9382B" opacity={0.9} />
          <rect width="26" height="13" fill="#D9382B" opacity={0.55} />
        </pattern>
      </defs>
      <ellipse cx={0} cy={4} rx={c.bodyW * 0.75} ry={12} fill="rgba(0,0,0,.2)" />
      {legs}
      <rect x={-16} y={bodyTop - 20} width={32} height={30} fill={c.skin} stroke={INK} strokeWidth={2.5} />
      <rect x={-c.bodyW / 2} y={bodyTop} width={c.bodyW} height={c.bodyH + 4} rx={who === 'sallu' ? 56 : 36} fill={who === 'sallu' ? c.skin : c.top} stroke={INK} strokeWidth={2.5} />
      {gar}
      {head}
      {arm('L')}
      {arm('R')}
    </g>
  );
};
