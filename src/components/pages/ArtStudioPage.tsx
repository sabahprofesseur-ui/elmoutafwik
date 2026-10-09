import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Palette,
  Eraser,
  PenTool,
  RotateCcw,
  Download,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ArtStudioPage: React.FC = () => {
  const { playClick, addStars } = useApp();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FF8A00');
  const [brushSize, setBrushSize] = useState(6);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');

  const colors = [
    '#FF8A00', // Algerian Orange
    '#10B981', // Emerald Green
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#000000', // Black
    '#FFFFFF', // White
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white background initially
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleDownload = () => {
    playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `لوحة_المتفوق_الصغير_${Date.now()}.png`;
    link.href = image;
    link.click();
    addStars(10);
  };

  // Pre-drawn template outlines
  const drawTemplate = (type: 'flag' | 'fox') => {
    playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas to white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (type === 'flag') {
      // Outline of Algerian Flag
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 4;
      ctx.strokeRect(80, 50, 440, 260);
      
      // Dividing middle line
      ctx.beginPath();
      ctx.moveTo(300, 50);
      ctx.lineTo(300, 310);
      ctx.stroke();

      // Crescent in center
      ctx.beginPath();
      ctx.arc(300, 180, 45, -Math.PI / 2, Math.PI / 2, false);
      ctx.stroke();

      // Star in center
      ctx.beginPath();
      ctx.arc(320, 180, 18, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // Cute fox face outline
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 4;

      // Head
      ctx.beginPath();
      ctx.arc(300, 180, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Ears
      ctx.beginPath();
      ctx.moveTo(240, 120);
      ctx.lineTo(210, 50);
      ctx.lineTo(270, 105);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(360, 120);
      ctx.lineTo(390, 50);
      ctx.lineTo(330, 105);
      ctx.stroke();

      // Eyes & Nose
      ctx.beginPath();
      ctx.arc(270, 160, 8, 0, Math.PI * 2);
      ctx.arc(330, 160, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(300, 200, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-right">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black">
            <span>سبورة الرسم والتلوين الرقمية 🎨</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            أستوديو الإبداع والرسم الحر
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl font-medium leading-relaxed">
            أطلق العنان لموهبتك الفنية! لون علم الجزائر ورسمة ثعلوب، أو ارسم بحرية وقم بحفظ لوحتك على جهازك.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner shrink-0 animate-kid-bounce">
          🎨
        </div>
      </div>

      {/* Main Studio Container */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
        
        {/* Toolset Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          
          {/* Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTool('pen')}
              className={`p-3 rounded-2xl flex items-center gap-2 text-xs font-black transition-all cursor-pointer ${
                tool === 'pen'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-rose-50'
              }`}
            >
              <PenTool size={16} />
              <span>قلم الرسم</span>
            </button>

            <button
              onClick={() => setTool('eraser')}
              className={`p-3 rounded-2xl flex items-center gap-2 text-xs font-black transition-all cursor-pointer ${
                tool === 'eraser'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-rose-50'
              }`}
            >
              <Eraser size={16} />
              <span>الممحاة</span>
            </button>

            <button
              onClick={handleClear}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-rose-600 flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw size={16} />
              <span>مسح اللوحة</span>
            </button>
          </div>

          {/* Templates */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">تلوين جاهز:</span>
            <button
              onClick={() => drawTemplate('flag')}
              className="px-3 py-1.5 bg-emerald-50 dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-slate-600 rounded-xl text-xs font-black cursor-pointer hover:bg-emerald-100"
            >
              علم الجزائر 🇩🇿
            </button>
            <button
              onClick={() => drawTemplate('fox')}
              className="px-3 py-1.5 bg-orange-50 dark:bg-slate-700 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-slate-600 rounded-xl text-xs font-black cursor-pointer hover:bg-orange-100"
            >
              ثعلوب 🦊
            </button>
          </div>

          {/* Download Action */}
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <Download size={16} />
            <span>حفظ اللوحة 🖼️</span>
          </button>
        </div>

        {/* Color Palette & Brush Size */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-500">اختر اللون:</span>
            <div className="flex items-center gap-2">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => {
                    setColor(c);
                    setTool('pen');
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-transform cursor-pointer ${
                    color === c && tool === 'pen' ? 'scale-125 border-slate-900 dark:border-white shadow-md' : 'border-slate-300 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-500">حجم الفرشاة:</span>
            <input
              type="range"
              min="2"
              max="30"
              value={brushSize}
              onChange={e => setBrushSize(parseInt(e.target.value))}
              className="w-28 accent-rose-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Canvas Display */}
        <div className="border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-slate-900 shadow-inner">
          <canvas
            ref={canvasRef}
            width={600}
            height={360}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="cursor-crosshair bg-white touch-none max-w-full h-auto"
          />
        </div>

      </div>

    </div>
  );
};
