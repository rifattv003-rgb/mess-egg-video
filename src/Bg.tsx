import React from 'react';
import {useT, pop, bob} from './utils';
import {INK} from './Cartoon';
import {FONT} from './UI';

const o = {stroke: INK, strokeWidth: 3.5, strokeLinejoin: 'round' as const};

type Pops = {lemon: number; bottle: number; tray: number; egg: number};

/** Kitchen, full 1920x1080. Doorway left, stove+shelf, window, table, fridge right (x 1420-1720). */
export const Kitchen: React.FC<{dark?: number; dawn?: number; door?: number; lamp?: number; pops?: Pops; eggIn?: boolean}> = ({dark = 0.5, dawn = 0, door = 0, lamp = 0, pops, eggIn = true}) => {
  const t = useT();
  const P = (k: keyof Pops) => (pops ? pop(t, pops[k], 0.35) : 1);
  const x0 = 1420, w = 300, y0 = 180, h = 660;
  const wd = w * (1 - 0.8 * door);
  return (
    <g>
      <defs>
        <linearGradient id="fg" x1="1" x2="0" y1="0" y2="0">
          <stop offset="0" stopColor="#FFE680" stopOpacity=".8" />
          <stop offset="1" stopColor="#FFE680" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="lampg"><stop offset="0" stopColor="#FFE9A8" stopOpacity=".8" /><stop offset="1" stopColor="#FFE9A8" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={1920} height={700} fill="#D9C8A9" />
      <rect y={700} width={1920} height={380} fill="#B88A5B" />
      {[770, 840, 920, 1010].map((y) => <line key={y} x1={0} x2={1920} y1={y} y2={y} stroke="#9E7448" strokeWidth={3} />)}
      <line x1={0} x2={1920} y1={700} y2={700} stroke={INK} strokeWidth={4} />
      {/* doorway */}
      <rect x={0} y={150} width={240} height={550} fill="#1B1B22" {...o} />
      {/* shelf + pots */}
      <rect x={300} y={300} width={520} height={14} fill="#8A5E3B" {...o} />
      {[[330, 90, 74], [450, 110, 60], [590, 80, 88], [700, 100, 66]].map(([px, pw, ph], i) => (
        <g key={i}>
          <rect x={px} y={300 - ph} width={pw} height={ph} rx={14} fill={i % 2 ? '#C9A27A' : '#B8BEC6'} {...o} />
          <rect x={px - 6} y={300 - ph - 10} width={pw + 12} height={14} rx={7} fill="#9AA2AC" {...o} />
        </g>
      ))}
      {/* stove / counter */}
      <rect x={300} y={590} width={520} height={170} fill="#7C8794" {...o} />
      <rect x={288} y={572} width={544} height={26} rx={8} fill="#A9B3BF" {...o} />
      <ellipse cx={420} cy={572} rx={64} ry={10} fill="#444" {...o} strokeWidth={3} />
      <ellipse cx={690} cy={572} rx={64} ry={10} fill="#444" {...o} strokeWidth={3} />
      {[380, 440, 680, 740].map((cx) => <circle key={cx} cx={cx} cy={640} r={12} fill="#D8DDE3" {...o} strokeWidth={3} />)}
      {/* window */}
      <rect x={880} y={150} width={300} height={270} fill="#1E2B5E" {...o} strokeWidth={6} />
      <circle cx={1090} cy={220} r={26} fill="#FFF3C4" opacity={1 - dawn} />
      <rect x={880} y={150} width={300} height={270} fill="#FFC98A" opacity={dawn} />
      <path d="M1030 150V420M880 285H1180" stroke={INK} strokeWidth={6} />
      <path d="M866 140H940V430H866Z M1120 140H1194V430H1120Z" fill="#E5533D" opacity={0.9} {...o} />
      {/* table + jug */}
      <rect x={900} y={690} width={360} height={18} rx={4} fill="#8A5E3B" {...o} />
      <rect x={930} y={708} width={16} height={120} fill="#6F4A2E" {...o} />
      <rect x={1214} y={708} width={16} height={120} fill="#6F4A2E" {...o} />
      <path d="M1040 690L1030 606Q1062 586 1094 606L1084 690Z" fill="#CFE9F7" {...o} />
      <path d="M1034 640H1090V686H1036Z" fill="#8FC8EE" />
      <path d="M1094 614Q1124 620 1090 660" fill="none" {...o} />
      {/* warm / dark light */}
      <rect width={1920} height={1080} fill="#FFB36B" opacity={dawn * 0.16} />
      <rect width={1920} height={1080} fill="#0B1230" opacity={dark} />
      {lamp > 0 && <circle cx={960} cy={120} r={760} fill="url(#lampg)" opacity={lamp} />}
      {dawn > 0.2 && <polygon points="900,420 1180,420 1500,1080 520,1080" fill="#FFE9B0" opacity={dawn * 0.22} />}
      {/* fridge light cone */}
      {door > 0 && <polygon points={`${x0},300 520,1080 ${x0},1080`} fill="url(#fg)" opacity={door} />}
      {/* fridge */}
      <rect x={x0} y={y0} width={w} height={h} rx={14} fill="#E9F0F4" {...o} strokeWidth={5} />
      {door > 0 && (
        <g>
          <rect x={x0 + 14} y={y0 + 16} width={w - 28} height={h - 32} rx={6} fill="#FFF0A8" stroke={INK} strokeWidth={3} />
          {[400, 548, 700].map((y) => <line key={y} x1={x0 + 14} x2={x0 + w - 14} y1={y} y2={y} stroke="#C9B25A" strokeWidth={6} />)}
          <g transform={`translate(1480 400) scale(${P('lemon')}) translate(-1480 -400)`}>
            <circle cx={1480} cy={374} r={26} fill="#FFE14D" {...o} strokeWidth={3} /><circle cx={1480} cy={374} r={19} fill="#FFF3A3" />
          </g>
          <g transform={`translate(1600 400) scale(${P('bottle')}) translate(-1600 -400)`}>
            <rect x={1586} y={338} width={28} height={62} rx={9} fill="#A9DDF5" {...o} strokeWidth={3} /><rect x={1593} y={320} width={14} height={20} fill="#A9DDF5" {...o} strokeWidth={3} /><rect x={1591} y={312} width={18} height={10} fill="#2F6FD6" {...o} strokeWidth={3} />
          </g>
          <g transform={`translate(1570 548) scale(${P('tray')}) translate(-1570 -548)`}>
            <rect x={1450} y={522} width={240} height={26} rx={6} fill="#C9B79C" {...o} strokeWidth={3} />
            {[0, 1, 2, 3, 4, 5].map((i) => <ellipse key={i} cx={1470 + i * 40} cy={528} rx={14} ry={7} fill="#A38F72" />)}
            {eggIn && (
              <g transform={`translate(1670 524) scale(${pops ? pop(t, pops.egg, 0.35) : 1}) translate(-1670 -524)`}>
                <ellipse cx={1670} cy={514} rx={16} ry={21} fill="#FFF8E7" {...o} strokeWidth={3} />
              </g>
            )}
          </g>
        </g>
      )}
      <path d={`M${x0 + w} ${y0}L${x0 + w} ${y0 + h}L${x0 + w - wd} ${y0 + h + door * 18}L${x0 + w - wd} ${y0 - door * 18}Z`} fill="#F6FAFC" {...o} strokeWidth={5} />
      <path d={`M${x0 + 20} ${y0 + 210}H${x0 + w - 6}`} stroke={INK} strokeWidth={3} opacity={1 - door} />
      <rect x={x0 + 14 + (w - wd)} y={y0 + 90} width={12} height={80} rx={6} fill="#9AA6AE" {...o} strokeWidth={3} opacity={1} />
    </g>
  );
};

export const Corridor: React.FC<{dark?: number}> = ({dark = 0.35}) => {
  const t = useT();
  return (
    <g>
      <rect width={1920} height={720} fill="#52627F" />
      <rect y={720} width={1920} height={360} fill="#2D3550" />
      <line x1={0} x2={1920} y1={720} y2={720} stroke={INK} strokeWidth={4} />
      {[260, 800, 1340].map((x, i) => (
        <g key={i}>
          <rect x={x} y={170} width={260} height={550} rx={8} fill="#8A6240" {...o} />
          <rect x={x + 26} y={200} width={208} height={210} fill="#7A5535" {...o} strokeWidth={3} />
          <circle cx={x + 222} cy={470} r={13} fill="#E6C25C" {...o} strokeWidth={3} />
          <rect x={x + 10} y={712} width={240} height={8} fill="#FFD36B" opacity={0.9} />
          <text x={x + 130 + bob(t, 0.4, 10, i)} y={140 + bob(t, 0.5, 8, i * 2)} textAnchor="middle" fontFamily={FONT} fontSize={52} fontWeight={800} fill="#CFE0FF" opacity={0.7}>Zzz</text>
        </g>
      ))}
      <rect x={1700} y={170} width={220} height={550} fill="#FFD58A" {...o} />
      <rect width={1920} height={1080} fill="#0B1230" opacity={dark} />
    </g>
  );
};

export const BED_X = [330, 790, 1250, 1710];
export const Bedroom: React.FC<{dark?: number}> = ({dark = 0.5}) => (
  <g>
    <rect width={1920} height={760} fill="#5B4B6B" />
    <rect y={760} width={1920} height={320} fill="#3A2E45" />
    <line x1={0} x2={1920} y1={760} y2={760} stroke={INK} strokeWidth={4} />
    <rect x={820} y={110} width={280} height={260} fill="#1E2B5E" {...o} strokeWidth={6} />
    <circle cx={1010} cy={190} r={30} fill="#FFF3C4" />
    <path d="M960 110V370M820 240H1100" stroke={INK} strokeWidth={6} />
    {BED_X.map((bx) => (
      <g key={bx}>
        <rect x={bx - 170} y={400} width={340} height={540} rx={22} fill="#7A5A3A" {...o} />
        <ellipse cx={bx} cy={560} rx={125} ry={52} fill="#F2F2F2" {...o} />
      </g>
    ))}
    <rect width={1920} height={1080} fill="#0B1230" opacity={dark} />
  </g>
);
export const Blankets: React.FC = () => (
  <g>
    {BED_X.map((bx, i) => (
      <g key={bx}>
        <rect x={bx - 175} y={800} width={350} height={170} rx={26} fill={['#6AA9F0', '#E57373', '#81C784', '#FFD54F'][i]} {...o} />
        <path d={`M${bx - 175} 836H${bx + 175}`} stroke={INK} strokeWidth={3} opacity={0.5} />
      </g>
    ))}
  </g>
);

export const Chair: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1.25}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-62} y={-270} width={124} height={176} rx={14} fill="#8A5E3B" {...o} strokeWidth={3} />
    <rect x={-70} y={-104} width={140} height={22} rx={8} fill="#A5733F" {...o} strokeWidth={3} />
    <path d="M-60 -82V0M60 -82V0" {...o} strokeWidth={10} />
  </g>
);

export const MotionBg: React.FC<{c1?: string; c2?: string}> = ({c1 = '#FFF6E0', c2 = '#F6D9A0'}) => (
  <div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 45%, ${c1} 0%, ${c1} 35%, ${c2} 100%)`}} />
);
