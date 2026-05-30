import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Download, RefreshCw, AlertCircle } from 'lucide-react';
import originalPortrait from '../assets/portrait_original.png';
import transparentPortrait from '../assets/portrait_transparent.png';

export default function BgRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up ObjectURLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (originalUrl && originalUrl !== originalPortrait) {
        URL.revokeObjectURL(originalUrl);
      }
      if (resultUrl && resultUrl !== transparentPortrait) {
        URL.revokeObjectURL(resultUrl);
      }
    };
  }, [originalUrl, resultUrl]);

  // Load the pre-loaded sample
  const handleLoadSample = () => {
    setFile(null);
    setError(null);
    setOriginalUrl(originalPortrait);
    setResultUrl(transparentPortrait);
    setProgressPercent(100);
  };

  const processImage = async (imageSource: File) => {
    setLoading(true);
    setError(null);
    setProgressPercent(0);
    setProgressMsg('Uploading image...');

    let currentPercent = 0;
    const progressInterval = setInterval(() => {
      if (currentPercent < 95) {
        currentPercent += Math.floor(Math.random() * 5) + 2;
        if (currentPercent > 95) currentPercent = 95;
        setProgressPercent(currentPercent);

        if (currentPercent < 25) {
          setProgressMsg('Uploading image...');
        } else if (currentPercent < 50) {
          setProgressMsg('Sending image to AI server...');
        } else if (currentPercent < 85) {
          setProgressMsg('Processing background removal...');
        } else {
          setProgressMsg('Downloading result...');
        }
      }
    }, 300);

    try {
      const formData = new FormData();
      formData.append('image', imageSource);

      const response = await fetch('http://localhost:5000/remove-background', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`The backend server returned an error (Status: ${response.status})`);
      }

      const resultBlob = await response.blob();
      if (!resultBlob.type.startsWith('image/')) {
        throw new Error('Received an invalid response format from the server (not an image).');
      }

      const url = URL.createObjectURL(resultBlob);
      
      clearInterval(progressInterval);
      setProgressPercent(100);
      setResultUrl(url);
      setLoading(false);
    } catch (err: any) {
      clearInterval(progressInterval);
      console.error(err);
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError(
          'Failed to connect to the background removal server. Please ensure the backend server is running on http://localhost:5000.'
        );
      } else {
        setError(err?.message || 'An unexpected error occurred during background removal.');
      }
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const prevUrl = originalUrl;
      const url = URL.createObjectURL(selectedFile);
      setOriginalUrl(url);
      setResultUrl(null);
      if (prevUrl && prevUrl !== originalPortrait) {
        URL.revokeObjectURL(prevUrl);
      }

      processImage(selectedFile);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
        const prevUrl = originalUrl;
        const url = URL.createObjectURL(droppedFile);
        setOriginalUrl(url);
        setResultUrl(null);
        if (prevUrl && prevUrl !== originalPortrait) {
          URL.revokeObjectURL(prevUrl);
        }
        processImage(droppedFile);
      } else {
        setError('Please drop a valid image file (PNG, JPG, WebP).');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setError(null);
    setProgressPercent(0);
  };

  // Slider controls
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handleSliderMove(e.clientX);
      }
    };
    const handleWindowTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        handleSliderMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('touchmove', handleWindowTouchMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section id="remove-bg" className="py-24 md:py-32 bg-brand-lavender-light/20 relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Background Remover Studio
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Upload your photo, <span className="text-gradient">we'll cut it out</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Experience studio-quality background removal. Private, fast, and high-resolution.
          </p>
        </div>

        {/* Studio Card Container */}
        <div className="bg-white rounded-3xl border border-slate-100/80 shadow-xl overflow-hidden p-6 md:p-10 glow-purple">
          <AnimatePresence mode="wait">

            {/* STAGE 1: Dropzone (No image uploaded yet) */}
            {!originalUrl && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-brand-purple/50 bg-slate-50/50 hover:bg-brand-purple/2 rounded-2xl py-20 px-8 text-center cursor-pointer transition-all duration-300 group"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-brand-purple group-hover:shadow-md transition-all duration-300 mb-6">
                  <Upload className="w-8 h-8" />
                </div>

                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                  Drag and drop your image here
                </h3>
                <p className="text-slate-400 text-sm mb-6 max-w-sm">
                  Supports PNG, JPG, JPEG, and WebP format. Max file size 15MB.
                </p>

                <button className="cursor-pointer px-6 py-3 rounded-xl bg-gradient-brand text-white font-medium text-sm transition-all hover:brightness-110 shadow-md shadow-brand-purple/2 shadow-brand-purple/10">
                  Select Image File
                </button>

                <div className="mt-12 flex flex-col items-center gap-3">
                  <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                    Or try a sample:
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoadSample();
                    }}
                    className="cursor-pointer group flex items-center gap-3 p-1.5 pr-4 bg-white border border-slate-100 hover:border-brand-purple rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-left"
                  >
                    <img
                      src={originalPortrait}
                      alt="Sample thumbnail"
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-brand-purple">Sample Portrait</div>
                      <div className="text-[10px] text-slate-400">Instantly preview cutout</div>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* STAGE 2: Processing / Loading */}
            {originalUrl && loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 px-8 text-center"
              >
                <div className="relative w-32 h-32 mb-8">
                  {/* Glowing Spinner */}
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                  <div className="absolute inset-0 rounded-full border-4 border-brand-purple border-t-transparent animate-spin" />
                  <div className="absolute inset-4 rounded-2xl bg-brand-purple/5 flex items-center justify-center text-brand-purple animate-pulse">
                    <Sparkles className="w-8 h-8" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">
                  AI is cutting out background...
                </h3>
                <p className="text-brand-purple font-medium text-sm mb-6 animate-pulse">
                  {progressMsg}
                </p>

                {/* Progress bar */}
                <div className="w-full max-w-md h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-brand transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 font-semibold">{progressPercent}%</span>
              </motion.div>
            )}

            {/* STAGE 3: Error */}
            {error && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 px-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-6 border border-red-100">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                  Background Removal Failed
                </h3>
                <p className="text-slate-500 text-sm max-w-md mb-8">
                  {error}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="cursor-pointer px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm transition-all hover:bg-slate-50"
                  >
                    Go Back
                  </button>
                  {file && (
                    <button
                      onClick={() => processImage(file)}
                      className="cursor-pointer px-6 py-2.5 rounded-xl bg-gradient-brand text-white font-semibold text-sm transition-all hover:brightness-110 shadow-md shadow-brand-purple/20"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* STAGE 4: Output / Comparison Slider */}
            {originalUrl && resultUrl && !loading && !error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Area (Slider) */}
                <div className="lg:col-span-8">
                  <div
                    ref={sliderContainerRef}
                    onMouseDown={(e) => {
                      isDragging.current = true;
                      handleSliderMove(e.clientX);
                    }}
                    onTouchStart={(e) => {
                      isDragging.current = true;
                      handleSliderMove(e.touches[0].clientX);
                    }}
                    className="relative h-[300px] sm:h-[400px] md:h-[450px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none bg-slate-100 border border-slate-100"
                  >
                    {/* Checkerboard Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,8px_0px] bg-slate-200" />

                    {/* Cutout output */}
                    <img
                      src={resultUrl}
                      alt="Cutout Output"
                      className="absolute inset-0 h-full w-full object-contain pointer-events-none"
                    />

                    {/* Original image underlay clipped */}
                    <div
                      className="absolute inset-0 overflow-hidden pointer-events-none bg-white"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img
                        src={originalUrl}
                        alt="Original"
                        className="absolute inset-0 h-full w-[400px] sm:w-[600px] md:w-[700px] object-contain pointer-events-none max-w-none"
                        style={{ width: sliderContainerRef.current?.getBoundingClientRect().width }}
                      />
                    </div>

                    {/* Labels */}
                    <div className="absolute top-4 left-4 glassmorphism px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-800 shadow-sm pointer-events-none">
                      Original
                    </div>
                    <div className="absolute top-4 right-4 glassmorphism px-2.5 py-1 rounded-lg text-xs font-semibold text-brand-purple shadow-sm pointer-events-none">
                      AI Cutout
                    </div>

                    {/* Draggable vertical bar */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_8px_rgba(0,0,0,0.3)] pointer-events-none"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow flex items-center justify-center gap-0.5">
                        <span className="w-0.5 h-3.5 bg-slate-400 rounded-full" />
                        <span className="w-0.5 h-3.5 bg-slate-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Control Panel Area */}
                <div className="lg:col-span-4 flex flex-col justify-center gap-6">
                  <div>
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md mb-2 inline-block">
                      Success
                    </span>
                    <h3 className="font-display font-black text-2xl text-slate-900 mb-2">
                      Background removed!
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Download your transparent PNG. Built with alpha channel mask for professional edits.
                    </p>
                  </div>

                  <hr className="border-slate-100" />

                  <div className="flex flex-col gap-3">
                    <a
                      href={resultUrl}
                      download={file ? `snapcut-${file.name.split('.')[0]}.png` : 'snapcut-cutout.png'}
                      className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-brand text-white font-semibold text-sm transition-all hover:brightness-110 shadow-lg shadow-brand-purple/20 active:scale-98"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Cutout (PNG)</span>
                    </a>

                    <button
                      onClick={handleReset}
                      className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-brand-purple/40 text-slate-700 hover:text-brand-purple font-semibold text-sm bg-white hover:bg-slate-50 transition-all active:scale-98"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Upload Another Image</span>
                    </button>
                  </div>

                  <div className="p-4 bg-brand-lavender/50 border border-brand-lavender/40 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-4.5 h-4.5 text-brand-purple mt-0.5 flex-shrink-0" />
                    <div className="text-[11px] text-slate-500 leading-normal">
                      <strong>Tip:</strong> Move the vertical slider bar back and forth to inspect edges, hair strands, and color bleed quality.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
