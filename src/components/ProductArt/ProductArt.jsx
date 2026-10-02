import { useId } from 'react';
import './ProductArt.css';

/**
 * Placeholders de producto con estilo de dibujo técnico (línea acero sobre
 * estudio oscuro). Se sustituyen por fotografía real cambiando el `image`
 * del producto en src/data a { kind: 'photo', ... }.
 * Lienzo 400×500 (4:5).
 */
export default function ProductArt({ art, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const Art = ARTS[art] ?? ARTS['watch-round'];
  return (
    <svg className={`product-art ${className}`} viewBox="0 0 400 500" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${uid}-steel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6e9ed" />
          <stop offset="0.45" stopColor="#8d939b" />
          <stop offset="1" stopColor="#3b3f45" />
        </linearGradient>
        <linearGradient id={`${uid}-dark`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2d32" />
          <stop offset="1" stopColor="#0c0d0f" />
        </linearGradient>
        <radialGradient id={`${uid}-bead`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#5d6168" />
          <stop offset="0.35" stopColor="#1b1d21" />
          <stop offset="1" stopColor="#050506" />
        </radialGradient>
        <radialGradient id={`${uid}-floor`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.75" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="452" rx="130" ry="16" fill={`url(#${uid}-floor)`} />
      <Art id={uid} />
    </svg>
  );
}

const S = { fill: 'none', stroke: '#c9cdd3', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' };
const thin = { ...S, strokeWidth: 0.9, stroke: '#7d838b' };

function Bracelet({ x, y, w, h, links = 4, fill }) {
  const rows = Array.from({ length: links }, (_, i) => y + (h / links) * i);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} {...S} />
      {rows.map((ry) => (
        <path key={ry} d={`M${x} ${ry} H${x + w}`} {...thin} />
      ))}
      <path d={`M${x + w * 0.33} ${y} V${y + h} M${x + w * 0.67} ${y} V${y + h}`} {...thin} />
    </g>
  );
}

function Ticks({ cx, cy, r, len = 8, count = 12 }) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    const l = i % 3 === 0 ? len * 1.6 : len;
    return (
      <line
        key={i}
        x1={cx + Math.sin(a) * r}
        y1={cy - Math.cos(a) * r}
        x2={cx + Math.sin(a) * (r - l)}
        y2={cy - Math.cos(a) * (r - l)}
        {...S}
        strokeWidth={i % 3 === 0 ? 2 : 1.1}
      />
    );
  });
}

const ARTS = {
  'watch-digital': ({ id }) => (
    <g>
      <Bracelet x={150} y={40} w={100} h={110} links={6} fill={`url(#${id}-dark)`} />
      <Bracelet x={150} y={350} w={100} h={100} links={6} fill={`url(#${id}-dark)`} />
      <rect x="122" y="140" width="156" height="220" rx="30" fill={`url(#${id}-steel)`} opacity="0.18" />
      <rect x="122" y="140" width="156" height="220" rx="30" {...S} />
      <rect x="140" y="168" width="120" height="164" rx="12" fill="#0b0c0e" {...S} />
      <rect x="156" y="226" width="88" height="54" rx="4" fill="#1a1d1f" {...thin} />
      <text x="200" y="263" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="26" fill="#aeb4bb">
        10:08
      </text>
      <path d="M118 190h-8M118 310h-8M282 190h8M282 310h8" {...S} strokeWidth="3" />
      <circle cx="200" cy="198" r="3" fill="#1f6fff" />
    </g>
  ),
  'watch-gshock': ({ id }) => (
    <g>
      <path d="M160 30 h80 l8 120 h-96 z" fill={`url(#${id}-dark)`} {...S} />
      <path d="M152 350 h96 l-8 120 h-80 z" fill={`url(#${id}-dark)`} {...S} />
      <path d="M166 60 h68 M164 90 h72 M162 120 h76 M162 380 h76 M164 410 h72 M166 440 h68" {...thin} />
      <path
        d="M140 140 L260 140 L300 190 L300 310 L260 360 L140 360 L100 310 L100 190 Z"
        fill="#0d0e10"
        {...S}
        strokeWidth="1.8"
      />
      <path d="M150 154 L250 154 L284 196 L284 304 L250 346 L150 346 L116 304 L116 196 Z" {...thin} />
      <circle cx="200" cy="250" r="72" fill="#08090a" {...S} />
      <Ticks cx={200} cy={250} r={68} len={7} />
      <rect x="168" y="262" width="64" height="26" rx="3" fill="#15171a" {...thin} />
      <path d="M200 250 L200 198 M200 250 L236 232" {...S} strokeWidth="2.4" />
      <path d="M92 210 h-10 M92 290 h-10 M308 210 h10 M308 290 h10" {...S} strokeWidth="4" />
      <circle cx="200" cy="250" r="3" fill="#1f6fff" />
    </g>
  ),
  'watch-chrono': ({ id }) => (
    <g>
      <Bracelet x={148} y={30} w={104} h={130} links={5} fill={`url(#${id}-dark)`} />
      <Bracelet x={148} y={340} w={104} h={120} links={5} fill={`url(#${id}-dark)`} />
      <circle cx="200" cy="250" r="104" fill={`url(#${id}-steel)`} opacity="0.2" />
      <circle cx="200" cy="250" r="104" {...S} strokeWidth="1.8" />
      <circle cx="200" cy="250" r="88" fill="#0a0b0d" {...S} />
      <Ticks cx={200} cy={250} r={84} />
      <circle cx="166" cy="250" r="18" {...thin} />
      <circle cx="234" cy="250" r="18" {...thin} />
      <circle cx="200" cy="290" r="18" {...thin} />
      <path d="M200 250 L200 184 M200 250 L250 222" {...S} strokeWidth="2.4" />
      <path d="M200 250 L170 320" stroke="#1f6fff" strokeWidth="1.2" />
      <rect x="302" y="238" width="12" height="24" rx="3" {...S} />
      <path d="M296 196 l12 -8 M296 304 l12 8" {...S} strokeWidth="4" />
    </g>
  ),
  'watch-leather': () => (
    <g>
      <path d="M156 20 h88 v130 h-88 z" fill="#141210" {...S} />
      <path d="M156 350 h88 v120 h-88 z" fill="#141210" {...S} />
      <path d="M166 24 v122 M234 24 v122 M166 354 v112 M234 354 v112" {...thin} strokeDasharray="3 4" />
      <path d="M182 420 h36 M182 440 h36" {...thin} />
      <circle cx="200" cy="250" r="96" fill="#101113" {...S} strokeWidth="1.8" />
      <circle cx="200" cy="250" r="84" {...thin} />
      <Ticks cx={200} cy={250} r={80} len={10} />
      <path d="M200 250 L200 192 M200 250 L240 270" {...S} strokeWidth="2.2" />
      <path d="M200 250 L170 196" stroke="#1f6fff" strokeWidth="1.1" />
      <rect x="296" y="240" width="10" height="20" rx="2" {...S} />
    </g>
  ),
  chain: ({ id }) => {
    // Eslabones cubanos a lo largo de una curva en U
    const links = [];
    const N = 46;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const x = 70 + t * 260;
      const y = 70 + Math.sin(t * Math.PI) * 330;
      const dx = 260;
      const dy = Math.cos(t * Math.PI) * Math.PI * 330;
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      links.push(
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="11"
          ry="6.5"
          transform={`rotate(${ang + (i % 2 ? 24 : -24)} ${x} ${y})`}
          fill={`url(#${id}-steel)`}
          fillOpacity="0.28"
          {...S}
          strokeWidth="1.1"
        />,
      );
    }
    return <g>{links}</g>;
  },
  bracelet: ({ id }) => {
    const beads = [];
    const N = 20;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const depth = (Math.sin(a) + 1) / 2; // 0 atrás, 1 adelante
      beads.push({ x: 200 + Math.cos(a) * 130, y: 260 + Math.sin(a) * 70, r: 15 + depth * 9, depth, i });
    }
    beads.sort((a, b) => a.depth - b.depth);
    return (
      <g>
        {beads.map((b) => (
          <g key={b.i} opacity={0.55 + b.depth * 0.45}>
            <circle cx={b.x} cy={b.y} r={b.r} fill={`url(#${id}-bead)`} />
            <circle cx={b.x} cy={b.y} r={b.r} {...thin} />
          </g>
        ))}
        <circle cx="200" cy="330" r="10" fill="#c9cdd3" opacity="0.85" />
      </g>
    );
  },
  pendant: ({ id }) => (
    <g>
      <path d="M70 30 C110 150 160 210 192 236" {...S} strokeDasharray="5 3" strokeWidth="2" />
      <path d="M330 30 C290 150 240 210 208 236" {...S} strokeDasharray="5 3" strokeWidth="2" />
      <circle cx="200" cy="244" r="11" {...S} strokeWidth="2.2" />
      <rect x="150" y="262" width="100" height="160" rx="22" fill={`url(#${id}-steel)`} opacity="0.22" />
      <rect x="150" y="262" width="100" height="160" rx="22" {...S} strokeWidth="1.8" />
      <rect x="162" y="274" width="76" height="136" rx="14" {...thin} />
      <circle cx="200" cy="284" r="5" {...thin} />
      <path d="M176 330 h48 M176 346 h48 M176 362 h30" {...thin} />
    </g>
  ),
  ring: ({ id }) => (
    <g>
      <ellipse cx="200" cy="300" rx="92" ry="104" fill="none" {...S} strokeWidth="1.8" />
      <ellipse cx="200" cy="300" rx="74" ry="86" {...thin} />
      <path d="M126 236 C150 196 250 196 274 236" {...S} />
      <ellipse cx="200" cy="200" rx="62" ry="30" fill={`url(#${id}-dark)`} {...S} strokeWidth="1.8" />
      <ellipse cx="200" cy="198" rx="44" ry="20" {...thin} />
      <path d="M186 198 h28" stroke="#1f6fff" strokeWidth="1.4" />
    </g>
  ),
};
ARTS['watch-round'] = ARTS['watch-leather'];
