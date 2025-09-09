'use client';

import { useEffect, useRef } from 'react';

interface SignaturePadProps {
  onChange: (dataUrl: string | null) => void;
}

export default function SignaturePad({ onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const y = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      return { x: x - rect.left, y: y - rect.top };
    };

    const start = (e: MouseEvent | TouchEvent) => {
      drawing.current = true;
      const p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!drawing.current) return;
      const p = getPos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    const end = () => {
      drawing.current = false;
      onChange(canvas.toDataURL('image/png'));
    };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: true });
    canvas.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('touchend', end);

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };
  }, [onChange]);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={600} height={180} className="w-full border border-border rounded-md bg-white" />
      <div className="mt-2 text-right">
        <button type="button" onClick={clear} className="text-sm underline">Clear</button>
      </div>
    </div>
  );
}


