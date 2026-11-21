import React from 'react';
import {useT, bob} from './utils';

const K = '#222222';
const o = {stroke: K, strokeWidth: 2.5, strokeLinejoin: 'round' as const};

/** Hand-held / floor props. Local origin (0,0) = hand centre, objects extend upward (negative y). */
export const Prop: React.FC<{name: string; ash?: number}> = ({name, ash = 0}) => {
  const t = useT();
  switch (name) {
    case 'egg':
      return (<g><ellipse cx="0" cy="-14" rx="17" ry="22" fill="#FFF8E7" {...o} /><ellipse cx="-6" cy="-22" rx="4" ry="7" fill="#fff" /></g>);
    case 'glass':
      return (<g><path d="M-14 -44L14 -44L10 4L-10 4Z" fill="rgba(210,235,250,.85)" {...o} /><path d="M-12.5 -26L12.5 -26L10 4L-10 4Z" fill="#8FC8EE" /></g>);
    case 'glassUp':
      return (<g transform="translate(0 -6) rotate(180)"><path d="M-14 -44L14 -44L10 4L-10 4Z" fill="rgba(210,235,250,.85)" {...o} /></g>);
    case 'cig': {
      const flick = 0.35 + 0.2 * Math.sin(t * 9);
      const al = ash * 18;
      return (
        <g transform="rotate(-6)">
          <rect x="-3.5" y="-46" width="7" height="46" rx="2" fill="#fff" {...o} />
          <rect x="-3.5" y="-46" width="7" height="9" fill="#E8A33D" stroke={K} strokeWidth={1.5} />
          {al > 0.5 && <rect x="-3.5" y={-46 - al} width="7" height={al} fill="#B9B9B9" stroke={K} strokeWidth={1.5} />}
          <circle cx="0" cy={-48 - al} r="8" fill="#FF6B3A" opacity={flick} />
          <circle cx="0" cy={-48 - al} r="4" fill="#FF3B1A" />
          {[0, 1, 2].map((i) => {
            const p = (t * 0.7 + i / 3) % 1;
            return <circle key={i} cx={Math.sin(p * 6 + i) * 8} cy={-54 - al - p * 80} r={4 + p * 9} fill="#fff" opacity={(1 - p) * 0.55} />;
          })}
        </g>
      );
    }
    case 'spoon':
      return (<g><path d="M0 0L0 -34" stroke={K} strokeWidth="7" strokeLinecap="round" /><path d="M0 0L0 -34" stroke="#D9DEE3" strokeWidth="3.5" strokeLinecap="round" /><ellipse cx="0" cy="-42" rx="10" ry="8" fill="#D9DEE3" {...o} /></g>);
    case 'pan':
      return (<g><rect x="0" y="-10" width="70" height="12" rx="6" fill="#555" {...o} /><ellipse cx="-40" cy="-4" rx="58" ry="16" fill="#3B3B3B" {...o} /><ellipse cx="-40" cy="-7" rx="46" ry="10" fill="#555" /></g>);
    case 'knife':
      return (<g><path d="M-5 -8L5 -8L5 -52L-5 -58Z" fill="#D5DADF" {...o} /><rect x="-6" y="-8" width="12" height="24" rx="4" fill="#6B4A2B" {...o} /></g>);
    case 'plate':
      return (<g><ellipse cx="0" cy="0" rx="46" ry="13" fill="#fff" {...o} /><ellipse cx="0" cy="-2" rx="30" ry="7" fill="#EDEDED" /><ellipse cx="0" cy="-8" rx="22" ry="11" fill="#FFF8E7" {...o} /><path d="M-10 -10L-2 -6M6 -12L12 -6" stroke={K} strokeWidth="2" /></g>);
    case 'pot':
      return (<g><rect x="-34" y="-52" width="68" height="52" rx="10" fill="#B8BEC6" {...o} /><ellipse cx="0" cy="-54" rx="38" ry="9" fill="#D3D8DE" {...o} /><circle cx="-38" cy="-30" r="7" fill="#8E96A0" {...o} /><circle cx="38" cy="-30" r="7" fill="#8E96A0" {...o} /></g>);
    case 'oil':
      return (<g><rect x="-11" y="-44" width="22" height="46" rx="6" fill="#D9A21B" {...o} /><rect x="-5.5" y="-58" width="11" height="16" fill="#D9A21B" {...o} /><rect x="-7.5" y="-65" width="15" height="8" fill="#8A5A12" {...o} /></g>);
    case 'gamchha':
      return (<g><rect x="-26" y="-22" width="52" height="26" rx="5" fill="#2E9E4F" {...o} /><path d="M-26 -14H26M-26 -6H26" stroke="#fff" strokeWidth="2" /></g>);
    case 'onion':
      return (<g><path d="M0 -42C28 -34 32 -6 0 0C-32 -6 -28 -34 0 -42Z" fill="#E4B7D2" {...o} /><path d="M0 -42L0 -50" {...o} /></g>);
    case 'chili':
      return (<g><path d="M-24 -8Q0 -44 28 -2Q6 -26 -24 -8Z" fill="#3BA34A" {...o} /></g>);
    case 'saucer':
      return (<g><ellipse cx="0" cy="0" rx="30" ry="9" fill="#fff" {...o} /><ellipse cx="0" cy="-1" rx="18" ry="4.5" fill="#EEE" /></g>);
    case 'tray':
      return (<g><ellipse cx="0" cy="0" rx="330" ry="58" fill="#B7BEC7" {...o} strokeWidth={4} /><ellipse cx="0" cy="-4" rx="296" ry="44" fill="#D3D9E0" /></g>);
    case 'eggBroken':
      return (<g><ellipse cx="0" cy="-6" rx="40" ry="11" fill="#FFF8E7" {...o} /><ellipse cx="-12" cy="-14" rx="14" ry="9" fill="#FFF3C4" {...o} /><ellipse cx="14" cy="-12" rx="12" ry="8" fill="#FFE9A6" {...o} /></g>);
    case 'food':
      return (<g><ellipse cx="0" cy="0" rx="50" ry="14" fill="#fff" {...o} /><ellipse cx="0" cy="-10" rx="32" ry="15" fill="#FFFDF5" {...o} /><ellipse cx="6" cy="-16" rx="20" ry="9" fill="#E3B15C" {...o} /></g>);
    default:
      return null;
  }
};
export const bobbing = bob;
