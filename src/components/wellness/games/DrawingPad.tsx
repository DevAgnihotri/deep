import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Palette, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface DrawingPadProps {
  onComplete: (score: number) => void;
  onExit: () => void;
}

export const DrawingPad: React.FC<DrawingPadProps> = ({ onComplete, onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#10b981');
  const [brushSize, setBrushSize] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const [drawingTime, setDrawingTime] = useState(0);

  const colors = [
    '#10b981', // emerald
    '#3b82f6', // blue
    '#ef4444', // red
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#6366f1', // indigo
  ];

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setDrawingTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameStarted) setGameStarted(true);
    
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const finishDrawing = () => {
    // Calculate score based on drawing time (longer = more therapeutic)
    const timeScore = Math.min(100, drawingTime * 2);
    const finalScore = Math.max(50, timeScore); // Minimum 50 points for participation
    onComplete(finalScore);
  };

  if (!gameStarted && drawingTime === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={onExit}
              variant="outline" 
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>

          <div className="text-6xl mb-6">🎨</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mindful Drawing</h2>
          <p className="text-gray-600 mb-6">
            Express yourself through colors and shapes. Let your creativity flow and find peace through art.
          </p>
          
          <div className="space-y-3 text-sm text-gray-600 mb-6">
            <div className="flex items-center justify-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Choose colors and brush sizes</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span>🧘‍♀️</span>
              <span>Draw mindfully - no pressure, just enjoy</span>
            </div>
          </div>

          <Button
            onClick={() => setGameStarted(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-full text-lg font-semibold"
          >
            Start Drawing
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🎨</div>
              <span className="font-bold text-xl text-gray-800">Mindful Drawing</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Time: {Math.floor(drawingTime / 60)}:{(drawingTime % 60).toString().padStart(2, '0')}
              </div>
              <Button 
                onClick={onExit}
                variant="outline" 
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tools Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tools</h3>
              
              {/* Color Palette */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Colors</label>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        currentColor === color ? 'border-gray-800' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setCurrentColor(color)}
                    />
                  ))}
                </div>
              </div>

              {/* Brush Size */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Brush Size: {brushSize}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={clearCanvas}
                  variant="outline"
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear Canvas
                </Button>
                
                <Button
                  onClick={finishDrawing}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                >
                  Finish Drawing
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border border-gray-200 rounded-xl cursor-crosshair w-full h-auto"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{ touchAction: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
