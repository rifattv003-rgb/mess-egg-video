import React from 'react';

const K = '#222222';
const s = {stroke: K, strokeWidth: 4, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};
const A: any = {
  egg: (<><ellipse cx="50" cy="56" rx="28" ry="36" fill="#FFF6E5" {...s} /><ellipse cx="40" cy="42" rx="6" ry="10" fill="#fff" opacity=".85" /></>),
  clock: (<><circle cx="50" cy="50" r="40" fill="#fff" {...s} /><path d="M50 22V50L68 60" fill="none" {...s} strokeWidth={5} /></>),
  calendar: (<><rect x="14" y="18" width="72" height="70" rx="9" fill="#fff" {...s} /><path d="M14 40V27a9 9 0 0 1 9-9h54a9 9 0 0 1 9 9v13Z" fill="#E5533D" {...s} /><circle cx="32" cy="16" r="5" fill={K} /><circle cx="68" cy="16" r="5" fill={K} /></>),
  wallet: (<><rect x="10" y="26" width="80" height="56" rx="10" fill="#8B5E3C" {...s} /><rect x="56" y="45" width="34" height="20" rx="9" fill="#C8935E" {...s} /><circle cx="72" cy="55" r="3.5" fill={K} /></>),
  home: (<><path d="M16 48H84V86H16Z" fill="#F4C27A" {...s} /><path d="M8 50L50 12L92 50Z" fill="#D9573F" {...s} /><rect x="42" y="58" width="16" height="28" fill="#8B5E3C" {...s} /></>),
  heart: (<path d="M50 86C10 56 14 20 36 20C45 20 50 28 50 33C50 28 55 20 64 20C86 20 90 56 50 86Z" fill="#E5333D" {...s} />),
  thumb: (<><path d="M16 46H34V88H16Z" fill="#6AA9F0" {...s} /><path d="M38 48L52 14Q64 12 64 26L60 44H82Q94 46 90 58L84 80Q82 88 72 88H38Z" fill="#FFD27A" {...s} /></>),
  share: (<><path d="M28 50L72 26M28 50L72 74" fill="none" {...s} /><circle cx="26" cy="50" r="13" fill="#4AA3F0" {...s} /><circle cx="74" cy="26" r="13" fill="#4AA3F0" {...s} /><circle cx="74" cy="74" r="13" fill="#4AA3F0" {...s} /></>),
  bell: (<><path d="M50 12C30 12 28 36 28 50L18 70H82L72 50C72 36 70 12 50 12Z" fill="#FFC53D" {...s} /><circle cx="50" cy="80" r="8" fill="#FFC53D" {...s} /></>),
  qmark: (<><circle cx="50" cy="50" r="40" fill="#FFE27A" {...s} /><text x="50" y="72" textAnchor="middle" fontSize="64" fontWeight="800" fill={K}>?</text></>),
  check: (<><circle cx="50" cy="50" r="40" fill="#3DB36B" {...s} /><path d="M30 52L45 66L72 36" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /></>),
  cross: (<><circle cx="50" cy="50" r="40" fill="#E5333D" {...s} /><path d="M33 33L67 67M67 33L33 67" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" /></>),
  bulb: (<><path d="M50 12C30 12 22 28 28 44C32 54 38 56 38 66H62C62 56 68 54 72 44C78 28 70 12 50 12Z" fill="#FFE066" {...s} /><rect x="38" y="66" width="24" height="14" rx="4" fill="#BBB" {...s} /></>),
  alarm: (<><circle cx="50" cy="56" r="32" fill="#fff" {...s} /><circle cx="24" cy="26" r="12" fill="#E5533D" {...s} /><circle cx="76" cy="26" r="12" fill="#E5533D" {...s} /><path d="M50 38V56L62 62" fill="none" {...s} /></>),
  rock: (<><rect x="22" y="30" width="56" height="50" rx="22" fill="#FFD27A" {...s} /><path d="M40 32V48M52 30V48M64 32V48" fill="none" {...s} strokeWidth={3} /></>),
  paper: (<><rect x="26" y="16" width="48" height="68" rx="14" fill="#FFD27A" {...s} /><path d="M40 16V40M50 14V40M60 16V40" fill="none" {...s} strokeWidth={3} /></>),
  scissors: (<><path d="M30 78L70 22M70 78L30 22" fill="none" {...s} strokeWidth={7} /><circle cx="30" cy="80" r="10" fill="#E5533D" {...s} /><circle cx="70" cy="80" r="10" fill="#E5533D" {...s} /></>),
  lemon: (<><circle cx="50" cy="50" r="36" fill="#FFE14D" {...s} /><circle cx="50" cy="50" r="27" fill="#FFF3A3" /><path d="M50 23V77M23 50H77M31 31L69 69M69 31L31 69" stroke="#FFE14D" strokeWidth="3" /></>),
  bottle: (<><rect x="36" y="34" width="28" height="56" rx="10" fill="#A9DDF5" {...s} /><rect x="43" y="16" width="14" height="22" fill="#A9DDF5" {...s} /><rect x="42" y="8" width="16" height="10" rx="3" fill="#2F6FD6" {...s} /></>),
  ice: (<><rect x="18" y="22" width="64" height="60" rx="10" fill="#CDEBFF" {...s} /><path d="M30 36L44 30" stroke="#fff" strokeWidth="6" strokeLinecap="round" /></>),
  onion: (<><path d="M50 14C78 24 86 56 50 86C14 56 22 24 50 14Z" fill="#E4B7D2" {...s} /><path d="M50 14L50 4" {...s} /></>),
  chili: (<path d="M16 40Q46 4 86 44Q50 26 16 40Z" fill="#3BA34A" {...s} />),
  oil: (<><rect x="34" y="38" width="32" height="52" rx="8" fill="#D9A21B" {...s} /><rect x="43" y="18" width="14" height="22" fill="#D9A21B" {...s} /><rect x="41" y="10" width="18" height="9" fill="#8A5A12" {...s} /></>),
  person: (<><circle cx="50" cy="32" r="18" fill="#F2C9A0" {...s} /><path d="M16 90Q16 56 50 56Q84 56 84 90Z" fill="#6AA9F0" {...s} /></>),
  face: (<><circle cx="50" cy="50" r="38" fill="#FFE0A8" {...s} /><circle cx="37" cy="44" r="5" fill={K} /><circle cx="63" cy="44" r="5" fill={K} /><path d="M36 68H64" fill="none" {...s} /></>),
  eye: (<><ellipse cx="50" cy="50" rx="40" ry="26" fill="#fff" {...s} /><circle cx="50" cy="50" r="15" fill="#2A1B14" /><circle cx="56" cy="44" r="4.5" fill="#fff" /></>),
  fridge: (<><rect x="26" y="6" width="48" height="88" rx="8" fill="#E6EEF2" {...s} /><path d="M26 36H74" fill="none" {...s} /><path d="M34 16V28M34 46V62" fill="none" {...s} strokeWidth={5} /></>),
  film: (<><rect x="14" y="38" width="72" height="48" fill="#333" {...s} /><path d="M14 38L22 18H84L86 38Z" fill="#fff" {...s} /><path d="M32 18L26 38M50 18L44 38M68 18L62 38" {...s} strokeWidth={3} /></>),
  biscuit: (<><circle cx="50" cy="50" r="36" fill="#D9A55B" {...s} /><circle cx="38" cy="40" r="3" fill={K} /><circle cx="60" cy="38" r="3" fill={K} /><circle cx="50" cy="58" r="3" fill={K} /><circle cx="66" cy="60" r="3" fill={K} /></>),
  rosogolla: (<><circle cx="50" cy="54" r="32" fill="#FFF8EE" {...s} /><path d="M30 40Q50 28 70 40" fill="none" stroke="#F2D9A0" strokeWidth="5" strokeLinecap="round" /></>),
  chicken: (<><ellipse cx="46" cy="62" rx="30" ry="24" fill="#fff" {...s} /><circle cx="68" cy="36" r="15" fill="#fff" {...s} /><path d="M80 34L94 40L80 44Z" fill="#F5A623" {...s} /><path d="M62 22Q68 12 74 22Z" fill="#E5333D" {...s} /><circle cx="70" cy="33" r="2.5" fill={K} /></>),
  comment: (<><path d="M14 18H86V66H48L28 84V66H14Z" fill="#fff" {...s} /><path d="M30 34H70M30 48H58" fill="none" {...s} strokeWidth={4} /></>),
  sun: (<><circle cx="50" cy="50" r="22" fill="#FFC53D" {...s} /><path d="M50 8V20M50 80V92M8 50H20M80 50H92M20 20L28 28M72 72L80 80M80 20L72 28M20 80L28 72" fill="none" {...s} /></>),
  spark: (<path d="M50 6Q54 46 94 50Q54 54 50 94Q46 54 6 50Q46 46 50 6Z" fill="#FFE066" {...s} strokeWidth={3} />),
  handshake: (<><path d="M8 40L34 28L50 40L66 28L92 40L92 62L66 74L50 62L34 74L8 62Z" fill="#FFD27A" {...s} /></>),
};

export const Icon: React.FC<{n: string; s?: number; x?: number; y?: number; style?: any}> = ({n, s: size = 100, x, y, style}) => (
  <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" style={{overflow: 'visible', ...style}}>
    {A[n]}
  </svg>
);
