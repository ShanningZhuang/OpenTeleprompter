# Quick Start Guide

## Running the App Locally

### First Time Setup
```bash
# Already installed, but if starting fresh:
npm install
```

### Start Development Server
```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Using the Teleprompter

### Basic Workflow
1. Paste your script in the "Teleprompter Content" textarea
2. Adjust settings to your preference (optional)
3. Click "Fullscreen" button (or press F)
4. Click "Play" (or press Space) to start scrolling
5. Press S to open settings sidebar for quick adjustments
6. Press Space to pause/resume
7. Press R to reset

### Recommended Settings for First Use

**For Presentations:**
- Font Size: 60-80px
- Speed: 1.5-2.0x
- Text Align: Center
- Indicator Position: 50% (middle of screen)

**For Video Recording:**
- Font Size: 48-60px
- Speed: 1.0-1.5x
- Text Align: Center
- Mirror Horizontal: ON (if using a physical teleprompter mirror)

**For Practice/Rehearsal:**
- Font Size: 40-50px
- Speed: 0.5-1.0x
- Text Align: Left or Center

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Play/Pause |
| F | Fullscreen |
| R | Reset |
| S | Settings Sidebar (fullscreen only) |

## Common Questions

**Q: The text is scrolling too fast/slow**
A: Adjust the Speed value in the control bar. In fullscreen, press S to open the sidebar (speed is also in the top control bar).

**Q: Can I save my settings?**
A: Yes! Click "Export Configuration" in the Indicator Settings panel. You can reload it later with "Import Configuration".

**Q: How do I use this with a physical teleprompter?**
A: Enable "Horizontal Flip" in Display Settings. This mirrors the text for use with teleprompter glass.

**Q: The scrollbar is showing**
A: The scrollbar is hidden in both preview and fullscreen modes. If you see it, try refreshing the page.

**Q: How do I adjust where I'm reading on screen?**
A: Move the "Indicator Position" slider. This red line shows your reading position. Adjust it to match your camera/eye level. In fullscreen, press S to access this setting in the sidebar.

**Q: Can I adjust settings while in fullscreen?**
A: Yes! Press S or click the "Settings" button to open the sidebar. You can adjust font size, colors, margins, alignment, and more without exiting fullscreen.

## Deploying to Vercel

### Quick Deploy
```bash
npm install -g vercel
vercel
```

Follow the prompts and your app will be live in minutes!

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Next Steps

- Read [README.md](README.md) for full feature list
- Check [FIXES.md](FIXES.md) for recent bug fixes and improvements
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
- Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for technical details

## Need Help?

1. Check that you're running the latest version: `npm run build`
2. Clear your browser cache and refresh
3. Try a different browser (Chrome, Firefox, Safari, Edge all supported)
4. Make sure JavaScript is enabled

Enjoy your teleprompter! 🎬
