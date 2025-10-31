"use client";

import { useState, useEffect, useRef } from "react";

interface TeleprompterConfig {
  // Text settings
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: "left" | "center" | "right";
  textColor: string;
  backgroundColor: string;

  // Display settings
  panelPosition: "top" | "bottom" | "left" | "right" | "full";
  mirrorHorizontal: boolean;
  mirrorVertical: boolean;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;

  // Playback settings
  speed: number;

  // Indicator settings
  indicatorPosition: number;
  indicatorColor: string;
}

const defaultConfig: TeleprompterConfig = {
  fontSize: 48,
  lineHeight: 1.6,
  letterSpacing: 0,
  textAlign: "center",
  textColor: "#ffffff",
  backgroundColor: "#000000",
  panelPosition: "full",
  mirrorHorizontal: false,
  mirrorVertical: false,
  marginTop: 100,
  marginBottom: 100,
  marginLeft: 100,
  marginRight: 100,
  speed: 1.0,
  indicatorPosition: 50,
  indicatorColor: "#ff0000",
};

const eyeFriendlyColors = [
  { name: "White on Black", text: "#ffffff", bg: "#000000" },
  { name: "Yellow on Black", text: "#ffff00", bg: "#000000" },
  { name: "Green on Black", text: "#00ff00", bg: "#000000" },
  { name: "Black on White", text: "#000000", bg: "#ffffff" },
  { name: "Black on Yellow", text: "#000000", bg: "#ffff00" },
];

export default function Home() {
  const [config, setConfig] = useState<TeleprompterConfig>(defaultConfig);
  const [content, setContent] = useState("Paste your script here...\n\nThis is your teleprompter content area.\n\nThe text will scroll smoothly at your preferred speed.\n\nYou can customize font size, colors, and many other settings.\n\nPerfect for presentations, videos, and live streaming!");
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scrolling
  useEffect(() => {
    if (isPlaying && scrollRef.current) {
      const interval = setInterval(() => {
        setScrollPosition((prev) => {
          const newPosition = prev + config.speed;
          if (scrollRef.current) {
            const maxScroll = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
            if (newPosition >= maxScroll) {
              setIsPlaying(false);
              return maxScroll;
            }
          }
          return newPosition;
        });
      }, 16); // ~60fps
      return () => clearInterval(interval);
    }
  }, [isPlaying, config.speed]);

  // Update scroll position
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  // Timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const updateConfig = (updates: Partial<TeleprompterConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify({ config, content }, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", "teleprompter-config.json");
    link.click();
  };

  const importConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (imported.config) setConfig(imported.config);
          if (imported.content) setContent(imported.content);
        } catch (error) {
          alert("Invalid configuration file");
        }
      };
      reader.readAsText(file);
    }
  };

  const resetConfig = () => {
    if (confirm("Reset all settings to default?")) {
      setConfig(defaultConfig);
      setScrollPosition(0);
      setElapsedTime(0);
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetScroll = () => {
    setScrollPosition(0);
    setElapsedTime(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Control Bar */}
      <div className="mb-6 bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={togglePlayPause}
            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] px-6 py-2 rounded-lg transition-colors"
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
          <button
            onClick={resetScroll}
            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] px-6 py-2 rounded-lg transition-colors"
          >
            ⏹ Reset
          </button>
          <div className="text-lg font-mono">{formatTime(elapsedTime)}</div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Speed:</label>
            <input
              type="number"
              value={config.speed}
              onChange={(e) => updateConfig({ speed: parseFloat(e.target.value) || 1 })}
              step="0.1"
              min="0.1"
              max="5"
              className="bg-[#2a2a2a] px-3 py-1 rounded w-20 text-center"
            />
            <span className="text-sm">x</span>
          </div>
        </div>
      </div>

      {/* Settings Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Text Settings */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
          <h2 className="text-sm font-semibold uppercase mb-4 tracking-wide">TEXT SETTINGS</h2>

          <div className="space-y-3">
            <div>
              <label className="text-sm block mb-1">Font Size: {config.fontSize}px</label>
              <input
                type="range"
                min="16"
                max="120"
                value={config.fontSize}
                onChange={(e) => updateConfig({ fontSize: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm block mb-1">Line Height: {config.lineHeight}</label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={config.lineHeight}
                onChange={(e) => updateConfig({ lineHeight: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm block mb-1">Letter Spacing: {config.letterSpacing}px</label>
              <input
                type="range"
                min="-2"
                max="10"
                value={config.letterSpacing}
                onChange={(e) => updateConfig({ letterSpacing: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm block mb-2">Text Alignment</label>
              <div className="flex gap-2">
                {(["left", "center", "right"] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => updateConfig({ textAlign: align })}
                    className={`flex-1 py-2 rounded transition-colors ${
                      config.textAlign === align
                        ? "bg-[#3a3a3a] border border-gray-600"
                        : "bg-[#2a2a2a] border border-gray-700"
                    }`}
                  >
                    {align === "left" && "⬅"}
                    {align === "center" && "↔"}
                    {align === "right" && "➡"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm block mb-2">Colors</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs block mb-1">Text</label>
                  <input
                    type="color"
                    value={config.textColor}
                    onChange={(e) => updateConfig({ textColor: e.target.value })}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs block mb-1">Background</label>
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs block mb-2">Eye-friendly Colors</label>
              <div className="flex flex-wrap gap-2">
                {eyeFriendlyColors.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      updateConfig({ textColor: preset.text, backgroundColor: preset.bg })
                    }
                    className="w-8 h-8 rounded border border-gray-600 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: preset.bg, color: preset.text }}
                    title={preset.name}
                  >
                    A
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
          <h2 className="text-sm font-semibold uppercase mb-4 tracking-wide">DISPLAY SETTINGS</h2>

          <div className="space-y-3">
            <div>
              <label className="text-sm block mb-2">Panel Position</label>
              <select
                value={config.panelPosition}
                onChange={(e) =>
                  updateConfig({ panelPosition: e.target.value as TeleprompterConfig["panelPosition"] })
                }
                className="w-full bg-[#2a2a2a] px-3 py-2 rounded border border-gray-700"
              >
                <option value="full">Full Screen</option>
                <option value="top">Top Half</option>
                <option value="bottom">Bottom Half</option>
                <option value="left">Left Half</option>
                <option value="right">Right Half</option>
              </select>
            </div>

            <div>
              <label className="text-sm block mb-2">Mirror Mode</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.mirrorHorizontal}
                    onChange={(e) => updateConfig({ mirrorHorizontal: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Horizontal Flip</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.mirrorVertical}
                    onChange={(e) => updateConfig({ mirrorVertical: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Vertical Flip</span>
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm block mb-2">Margins</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs block mb-1">↑ Top: {config.marginTop}px</label>
                  <input
                    type="number"
                    value={config.marginTop}
                    onChange={(e) => updateConfig({ marginTop: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#2a2a2a] px-2 py-1 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-1">↓ Bottom: {config.marginBottom}px</label>
                  <input
                    type="number"
                    value={config.marginBottom}
                    onChange={(e) => updateConfig({ marginBottom: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#2a2a2a] px-2 py-1 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-1">← Left: {config.marginLeft}px</label>
                  <input
                    type="number"
                    value={config.marginLeft}
                    onChange={(e) => updateConfig({ marginLeft: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#2a2a2a] px-2 py-1 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs block mb-1">→ Right: {config.marginRight}px</label>
                  <input
                    type="number"
                    value={config.marginRight}
                    onChange={(e) => updateConfig({ marginRight: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#2a2a2a] px-2 py-1 rounded text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicator Settings */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
          <h2 className="text-sm font-semibold uppercase mb-4 tracking-wide">INDICATOR SETTINGS</h2>

          <div className="space-y-3">
            <div>
              <label className="text-sm block mb-1">Position: {config.indicatorPosition}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={config.indicatorPosition}
                onChange={(e) => updateConfig({ indicatorPosition: parseInt(e.target.value) })}
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">
                Distance from top of screen
              </p>
            </div>

            <div>
              <label className="text-sm block mb-2">Indicator Color</label>
              <input
                type="color"
                value={config.indicatorColor}
                onChange={(e) => updateConfig({ indicatorColor: e.target.value })}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <h3 className="text-sm font-semibold uppercase mb-3 tracking-wide">CONFIGURATION</h3>
            <div className="space-y-2">
              <button
                onClick={exportConfig}
                className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] px-4 py-2 rounded transition-colors text-sm"
              >
                📥 Export Configuration
              </button>
              <label className="block">
                <input
                  type="file"
                  accept=".json"
                  onChange={importConfig}
                  className="hidden"
                />
                <span className="block w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] px-4 py-2 rounded transition-colors text-sm text-center cursor-pointer">
                  📤 Import Configuration
                </span>
              </label>
              <button
                onClick={resetConfig}
                className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] px-4 py-2 rounded transition-colors text-sm"
              >
                🔄 Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content and Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Content Editor */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
          <h2 className="text-sm font-semibold uppercase mb-3 tracking-wide">TELEPROMPTER CONTENT</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 bg-[#0a0a0a] text-white p-4 rounded border border-gray-700 resize-none focus:outline-none focus:border-gray-600"
            placeholder="Paste your script here..."
          />
        </div>

        {/* Preview */}
        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
          <h2 className="text-sm font-semibold uppercase mb-3 tracking-wide">PREVIEW</h2>
          <div
            ref={scrollRef}
            className="relative h-96 overflow-hidden rounded border border-gray-700"
            style={{
              backgroundColor: config.backgroundColor,
              transform: `scale${config.mirrorHorizontal ? "X" : ""}${config.mirrorVertical ? "Y" : ""}(-1)`,
            }}
          >
            {/* Reading Indicator */}
            <div
              className="absolute left-0 right-0 h-0.5 z-10"
              style={{
                top: `${config.indicatorPosition}%`,
                backgroundColor: config.indicatorColor,
              }}
            />

            {/* Content */}
            <div
              className="h-full overflow-y-scroll scrollbar-hide"
              style={{
                paddingTop: config.marginTop,
                paddingBottom: config.marginBottom,
                paddingLeft: config.marginLeft,
                paddingRight: config.marginRight,
              }}
            >
              <div
                style={{
                  fontSize: `${config.fontSize}px`,
                  lineHeight: config.lineHeight,
                  letterSpacing: `${config.letterSpacing}px`,
                  textAlign: config.textAlign,
                  color: config.textColor,
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {content}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            This preview shows how your teleprompter will look
          </p>
        </div>
      </div>
    </div>
  );
}
