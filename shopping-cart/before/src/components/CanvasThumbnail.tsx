import React, { useRef, useEffect } from 'react';

interface CanvasThumbnailProps {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const CanvasThumbnail: React.FC<CanvasThumbnailProps> = ({
  width,
  height,
  draw,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    draw(ctx);
  }, [draw]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default CanvasThumbnail;
