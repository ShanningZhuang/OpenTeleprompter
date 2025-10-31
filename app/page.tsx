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
  marginTop: number; // percentage
  marginBottom: number; // percentage
  marginHorizontal: number; // percentage (left and right combined)

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
  marginTop: 10, // 10%
  marginBottom: 10, // 10%
  marginHorizontal: 5, // 5%
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

const defaultContent = `Welcome to Your Professional Teleprompter

This is a demonstration of the teleprompter's smooth scrolling capabilities.

INTRODUCTION

Hello and welcome! Today, I'm excited to share with you an incredible tool designed to make your presentations, videos, and live streams more professional and engaging.

Whether you're a content creator, public speaker, educator, or business professional, this teleprompter will help you deliver your message with confidence while maintaining eye contact with your audience or camera.

KEY FEATURES

Let me walk you through some of the amazing features this teleprompter offers:

CUSTOMIZABLE TEXT SETTINGS
You have complete control over how your text appears. Adjust the font size from small to extra large, modify line height for comfortable reading, and fine-tune letter spacing to match your preferences.

Choose from eye-friendly color combinations that reduce strain during long recording sessions. Whether you prefer classic white on black, or high-contrast yellow on black, we've got you covered.

FLEXIBLE DISPLAY OPTIONS
Position your teleprompter panel exactly where you need it - full screen, top half, bottom half, or either side of your screen.

Enable mirror mode for use with physical teleprompter hardware. The horizontal flip feature is perfect for use with teleprompter glass, while vertical flip gives you additional flexibility for unique setups.

Adjust margins on all four sides to create the perfect reading zone that matches your camera setup and personal preferences.

SMOOTH PLAYBACK CONTROL
Start and stop scrolling with a simple click or press the spacebar for hands-free operation.

Adjust the scroll speed in real-time to match your speaking pace. Whether you're a fast talker or prefer a slower, more deliberate delivery, you can fine-tune the speed from 0.1x to 5.0x.

The built-in timer helps you track your presentation length, ensuring you stay within your allotted time.

READING INDICATOR
The customizable reading indicator line helps you maintain your place on screen. Position it anywhere from top to bottom to match your natural eye level.

Choose any color for your indicator to ensure it's visible against your chosen background and text colors.

FULLSCREEN MODE
Press F or click the Fullscreen button to enter a distraction-free reading mode. Perfect for actual presentations and recordings.

All your controls remain easily accessible at the top of the screen, allowing you to adjust speed or pause without leaving fullscreen mode.

Press F again or ESC to exit fullscreen and return to the settings panel.

CONFIGURATION MANAGEMENT
Found the perfect setup? Export your configuration to save all your settings in a JSON file.

Import your saved configuration anytime to instantly restore your preferred settings.

Reset to defaults with a single click if you want to start fresh.

KEYBOARD SHORTCUTS

For maximum efficiency, use these keyboard shortcuts:

SPACEBAR - Play and pause scrolling
F - Toggle fullscreen mode
R - Reset scroll position to the beginning

PRACTICAL APPLICATIONS

YOUTUBE VIDEOS
Create professional videos without stumbling over your words. Maintain eye contact with the camera while reading your script naturally.

LIVE STREAMING
Engage with your audience while staying on message. Perfect for webinars, live shows, and virtual events.

PRESENTATIONS
Deliver confident presentations without relying on notes. Look at your audience while covering all your key points.

EDUCATIONAL CONTENT
Teachers and instructors can create clear, well-organized lessons without losing their train of thought.

BUSINESS COMMUNICATIONS
Record polished company announcements, training videos, and marketing messages with ease.

TIPS FOR SUCCESS

Start with a slower speed and gradually increase as you become more comfortable reading from the teleprompter.

Practice your script a few times to become familiar with the content. The teleprompter is a guide, not a replacement for preparation.

Adjust the reading indicator to match your natural eye level on the screen. This helps maintain a natural appearance on camera.

Use natural pauses and inflection in your voice. Don't let the scrolling pace dictate your delivery - you control the speed.

Experiment with different font sizes and colors to find what's most comfortable for your eyes, especially during long recording sessions.

GETTING STARTED

Ready to try it yourself? Simply paste your script into the content area, adjust the settings to your liking, and click play!

Use the preview panel to see how your teleprompter will look before going fullscreen.

Fine-tune the speed and position until everything feels natural and comfortable.

Then enter fullscreen mode and deliver your best performance!

CONCLUSION

Thank you for choosing this teleprompter application. Whether you're creating content, delivering presentations, or communicating with your audience, this tool is designed to help you perform at your best.

Remember, the key to great teleprompter use is practice. The more you use it, the more natural and confident you'll become.

Now it's your turn - paste your script, customize your settings, and start creating amazing content!

Good luck with your presentations, videos, and live streams. You've got this!

---

This demonstration script is designed to showcase the teleprompter's capabilities. Replace this text with your own script to get started.

Happy recording! 🎬`;

export default function Home() {
  const [config, setConfig] = useState<TeleprompterConfig>(defaultConfig);
  const [content, setContent] = useState(defaultContent);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fullscreenScrollRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scrolling
  useEffect(() => {
    if (isPlaying) {
      const activeScrollRef = isFullscreen ? fullscreenScrollRef.current : scrollRef.current;
      if (activeScrollRef) {
        const interval = setInterval(() => {
          setScrollPosition((prev) => {
            const newPosition = prev + config.speed;
            const currentRef = isFullscreen ? fullscreenScrollRef.current : scrollRef.current;
            if (currentRef) {
              const maxScroll = currentRef.scrollHeight - currentRef.clientHeight;
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
    }
  }, [isPlaying, config.speed, isFullscreen]);

  // Update scroll position
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollPosition;
    }
    if (fullscreenScrollRef.current) {
      fullscreenScrollRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  // Sync manual scrolling to state
  useEffect(() => {
    const handleManualScroll = (ref: HTMLDivElement | null) => {
      if (ref && !isPlaying) {
        setScrollPosition(ref.scrollTop);
      }
    };

    const previewHandler = () => handleManualScroll(scrollRef.current);
    const fullscreenHandler = () => handleManualScroll(fullscreenScrollRef.current);

    const previewElement = scrollRef.current;
    const fullscreenElement = fullscreenScrollRef.current;

    previewElement?.addEventListener('scroll', previewHandler);
    fullscreenElement?.addEventListener('scroll', fullscreenHandler);

    return () => {
      previewElement?.removeEventListener('scroll', previewHandler);
      fullscreenElement?.removeEventListener('scroll', fullscreenHandler);
    };
  }, [isPlaying]);


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

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await fullscreenRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.code === "KeyF" && !e.repeat) {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === "KeyR" && !e.repeat) {
        e.preventDefault();
        resetScroll();
      } else if (e.code === "KeyS" && !e.repeat && isFullscreen) {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Control Bar */}
      <div className="mb-6 bg-[#1a1a1a] rounded-lg p-4 border border-gray-800">
        <div className="flex items-center justify-center gap-4 flex-wrap">
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
          <button
            onClick={toggleFullscreen}
            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] px-6 py-2 rounded-lg transition-colors"
          >
            {isFullscreen ? "⛶ Exit Fullscreen" : "⛶ Fullscreen"}
          </button>
          <div className="text-lg font-mono">{formatTime(elapsedTime)}</div>
          <div className="flex items-center gap-3 min-w-[200px]">
            <label className="text-sm whitespace-nowrap">Speed: {config.speed.toFixed(1)}x</label>
            <input
              type="range"
              value={config.speed}
              onChange={(e) => updateConfig({ speed: parseFloat(e.target.value) })}
              step="0.1"
              min="0"
              max="3"
              className="flex-1"
            />
          </div>
        </div>
        <div className="text-xs text-gray-400 text-center mt-2">
          Keyboard: Space = Play/Pause | F = Fullscreen | R = Reset | S = Settings (in fullscreen)
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
              <div className="space-y-3">
                <div>
                  <label className="text-sm block mb-1">↑ Top: {config.marginTop}%</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={config.marginTop}
                    onChange={(e) => updateConfig({ marginTop: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm block mb-1">↓ Bottom: {config.marginBottom}%</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={config.marginBottom}
                    onChange={(e) => updateConfig({ marginBottom: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm block mb-1">↔ Horizontal: {config.marginHorizontal}%</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={config.marginHorizontal}
                    onChange={(e) => updateConfig({ marginHorizontal: parseInt(e.target.value) })}
                    className="w-full"
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
            className="relative h-96 overflow-hidden rounded border border-gray-700"
            style={{
              backgroundColor: config.backgroundColor,
            }}
          >
            {/* Reading Indicator */}
            <div
              className="absolute left-0 right-0 h-0.5 z-10 pointer-events-none"
              style={{
                top: `${config.indicatorPosition}%`,
                backgroundColor: config.indicatorColor,
              }}
            />

            {/* Content */}
            <div
              ref={scrollRef}
              className="h-full overflow-y-scroll"
              style={{
                paddingTop: `${config.marginTop}%`,
                paddingBottom: `${config.marginBottom}%`,
                paddingLeft: `${config.marginHorizontal}%`,
                paddingRight: `${config.marginHorizontal}%`,
                transform: `${config.mirrorHorizontal ? "scaleX(-1)" : ""} ${config.mirrorVertical ? "scaleY(-1)" : ""}`,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
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

      {/* Fullscreen Teleprompter View */}
      <div
        ref={fullscreenRef}
        className={`${
          isFullscreen ? "fixed inset-0 z-50 flex flex-col" : "hidden"
        }`}
        style={{
          backgroundColor: config.backgroundColor,
        }}
      >
        {/* Fullscreen Controls */}
        <div className="bg-black/80 p-4 flex items-center justify-center gap-4">
          <button
            onClick={togglePlayPause}
            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] px-6 py-2 rounded-lg transition-colors text-white"
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
          <button
            onClick={resetScroll}
            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] px-6 py-2 rounded-lg transition-colors text-white"
          >
            ⏹ Reset
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] px-6 py-2 rounded-lg transition-colors text-white"
          >
            ⚙ Settings
          </button>
          <button
            onClick={toggleFullscreen}
            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] px-6 py-2 rounded-lg transition-colors text-white"
          >
            ⛶ Exit
          </button>
          <div className="text-lg font-mono text-white">{formatTime(elapsedTime)}</div>
          <div className="flex items-center gap-3 text-white min-w-[200px]">
            <label className="text-sm whitespace-nowrap">Speed: {config.speed.toFixed(1)}x</label>
            <input
              type="range"
              value={config.speed}
              onChange={(e) => updateConfig({ speed: parseFloat(e.target.value) })}
              step="0.1"
              min="0"
              max="3"
              className="flex-1"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full bg-black/95 border-l border-gray-700 transition-transform duration-300 overflow-y-auto ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ width: "320px", zIndex: 60 }}
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Quick Settings</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:text-gray-300 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <label className="text-sm text-white block mb-2">Font Size: {config.fontSize}px</label>
              <input
                type="range"
                min="16"
                max="120"
                value={config.fontSize}
                onChange={(e) => updateConfig({ fontSize: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Line Height */}
            <div className="mb-4">
              <label className="text-sm text-white block mb-2">Line Height: {config.lineHeight}</label>
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

            {/* Letter Spacing */}
            <div className="mb-4">
              <label className="text-sm text-white block mb-2">Letter Spacing: {config.letterSpacing}px</label>
              <input
                type="range"
                min="-2"
                max="10"
                value={config.letterSpacing}
                onChange={(e) => updateConfig({ letterSpacing: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Text Alignment */}
            <div className="mb-4">
              <label className="text-sm text-white block mb-2">Text Alignment</label>
              <div className="flex gap-2">
                {(["left", "center", "right"] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => updateConfig({ textAlign: align })}
                    className={`flex-1 py-2 rounded transition-colors ${
                      config.textAlign === align
                        ? "bg-[#3a3a3a] border border-gray-600 text-white"
                        : "bg-[#2a2a2a] border border-gray-700 text-white"
                    }`}
                  >
                    {align === "left" && "⬅"}
                    {align === "center" && "↔"}
                    {align === "right" && "➡"}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-4">
              <label className="text-sm text-white block mb-2">Colors</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Text</label>
                  <input
                    type="color"
                    value={config.textColor}
                    onChange={(e) => updateConfig({ textColor: e.target.value })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Background</label>
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Eye-friendly Presets */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-2">Quick Color Presets</label>
              <div className="flex flex-wrap gap-2">
                {eyeFriendlyColors.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() =>
                      updateConfig({ textColor: preset.text, backgroundColor: preset.bg })
                    }
                    className="w-10 h-10 rounded border border-gray-600 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: preset.bg, color: preset.text }}
                    title={preset.name}
                  >
                    A
                  </button>
                ))}
              </div>
            </div>

            {/* Margins */}
            <div className="mb-4">
              <label className="text-sm text-white block mb-2">Margins</label>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Top: {config.marginTop}%</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={config.marginTop}
                    onChange={(e) => updateConfig({ marginTop: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Bottom: {config.marginBottom}%</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={config.marginBottom}
                    onChange={(e) => updateConfig({ marginBottom: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Horizontal: {config.marginHorizontal}%</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={config.marginHorizontal}
                    onChange={(e) => updateConfig({ marginHorizontal: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Indicator Position */}
            <div className="mb-4">
              <label className="text-sm text-white block mb-2">Indicator Position: {config.indicatorPosition}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={config.indicatorPosition}
                onChange={(e) => updateConfig({ indicatorPosition: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Indicator Color */}
            <div className="mb-4">
              <label className="text-sm text-white block mb-2">Indicator Color</label>
              <input
                type="color"
                value={config.indicatorColor}
                onChange={(e) => updateConfig({ indicatorColor: e.target.value })}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>

            {/* Mirror Modes */}
            <div className="mb-4">
              <label className="text-sm text-white block mb-2">Mirror Mode</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-white">
                  <input
                    type="checkbox"
                    checked={config.mirrorHorizontal}
                    onChange={(e) => updateConfig({ mirrorHorizontal: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Horizontal Flip</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-white">
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
          </div>
        </div>

        {/* Fullscreen Content */}
        <div className="flex-1 relative overflow-hidden">
          {/* Reading Indicator */}
          <div
            className="absolute left-0 right-0 h-1 z-10 pointer-events-none"
            style={{
              top: `${config.indicatorPosition}%`,
              backgroundColor: config.indicatorColor,
            }}
          />

          {/* Scrolling Content */}
          <div
            ref={fullscreenScrollRef}
            className="h-full overflow-y-scroll"
            style={{
              paddingTop: `${config.marginTop}%`,
              paddingBottom: `${config.marginBottom}%`,
              paddingLeft: `${config.marginHorizontal}%`,
              paddingRight: `${config.marginHorizontal}%`,
              transform: `${config.mirrorHorizontal ? "scaleX(-1)" : ""} ${config.mirrorVertical ? "scaleY(-1)" : ""}`,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
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
      </div>
    </div>
  );
}
