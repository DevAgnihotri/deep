import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Waves, Heart, ArrowLeft } from 'lucide-react';

interface ZenGardenGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const ZenGardenGame: React.FC<ZenGardenGameProps> = ({ onComplete, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPattern, setCurrentPattern] = useState('waves');
  const [timeSpent, setTimeSpent] = useState(0);
  const [strokeCount, setStrokeCount] = useState(0);

  const patternTypes = [
    { id: 'waves', name: 'Waves', icon: '🌊', description: 'Flowing wave patterns' },
    { id: 'circles', name: 'Circles', icon: '⭕', description: 'Concentric circles' },
    { id: 'lines', name: 'Lines', icon: '📏', description: 'Parallel lines' },
    { id: 'spirals', name: 'Spirals', icon: '🌀', description: 'Spiral patterns' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Set initial styles - sand background
    context.fillStyle = '#f5f5dc';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add sand texture
    for (let i = 0; i < 1000; i++) {
      context.fillStyle = `rgba(139, 69, 19, ${Math.random() * 0.1})`;
      context.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
    setStrokeCount(prev => prev + 1);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.strokeStyle = '#8B4513';
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    switch (currentPattern) {
      case 'waves':
        drawWavePattern(context, x, y);
        break;
      case 'circles':
        drawCirclePattern(context, x, y);
        break;
      case 'lines':
        drawLinePattern(context, x, y);
        break;
      case 'spirals':
        drawSpiralPattern(context, x, y);
        break;
      default:
        context.lineTo(x, y);
        context.stroke();
    }
  };

  const drawWavePattern = (context: CanvasRenderingContext2D, x: number, y: number) => {
    context.beginPath();
    for (let i = -20; i <= 20; i += 2) {
      const waveX = x + i;
      const waveY = y + Math.sin(i * 0.3) * 5;
      if (i === -20) {
        context.moveTo(waveX, waveY);
      } else {
        context.lineTo(waveX, waveY);
      }
    }
    context.stroke();
  };

  const drawCirclePattern = (context: CanvasRenderingContext2D, x: number, y: number) => {
    for (let radius = 5; radius <= 25; radius += 5) {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.stroke();
    }
  };

  const drawLinePattern = (context: CanvasRenderingContext2D, x: number, y: number) => {
    context.beginPath();
    for (let i = -30; i <= 30; i += 6) {
      context.moveTo(x + i, y - 15);
      context.lineTo(x + i, y + 15);
    }
    context.stroke();
  };

  const drawSpiralPattern = (context: CanvasRenderingContext2D, x: number, y: number) => {
    context.beginPath();
    let angle = 0;
    let radius = 0;
    context.moveTo(x, y);
    
    for (let i = 0; i < 50; i++) {
      angle += 0.3;
      radius += 0.5;
      const spiralX = x + Math.cos(angle) * radius;
      const spiralY = y + Math.sin(angle) * radius;
      context.lineTo(spiralX, spiralY);
    }
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = '#f5f5dc';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Re-add sand texture
    for (let i = 0; i < 1000; i++) {
      context.fillStyle = `rgba(139, 69, 19, ${Math.random() * 0.1})`;
      context.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }
    
    setStrokeCount(0);
  };

  const finishSession = () => {
    const score = Math.min(Math.round((strokeCount * 5) + (timeSpent / 60) * 10), 100);
    onComplete(score);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <motion.button
            onClick={onBack}
            className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-md rounded-full transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Zen Garden
            </h2>
            <p className="text-gray-600">Create peaceful patterns in virtual sand</p>
          </div>
        </div>

        {/* Pattern Selection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Pattern</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {patternTypes.map((pattern) => (
              <motion.button
                key={pattern.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  currentPattern === pattern.id 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setCurrentPattern(pattern.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl mb-2">{pattern.icon}</div>
                <div className="text-sm font-medium">{pattern.name}</div>
                <div className="text-xs text-gray-600">{pattern.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 mb-6 border border-white/20">
          <canvas
            ref={canvasRef}
            className="w-full h-96 cursor-crosshair rounded-xl"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{strokeCount}</div>
                <div className="text-sm text-gray-600">Strokes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <motion.button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full flex items-center space-x-2 font-medium hover:bg-gray-300 transition-colors"
                onClick={clearCanvas}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear</span>
              </motion.button>
              
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full font-medium flex items-center space-x-2 shadow-lg"
                onClick={finishSession}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-4 h-4" />
                <span>Complete</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
