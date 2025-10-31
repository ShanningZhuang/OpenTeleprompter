# Teleprompter App

A professional teleprompter application for speakers, presenters, and video creators. Read your scripts while maintaining eye contact with your camera or audience.

## Features

### Text Customization
- Adjustable font size (16-120px)
- Line height control
- Letter spacing adjustment
- Text alignment (left, center, right)
- Customizable text and background colors
- Eye-friendly color presets

### Display Settings
- Multiple panel position layouts (full screen, top/bottom/left/right half)
- Mirror mode with horizontal and vertical flip options
- Adjustable margins on all sides
- Perfect for physical teleprompter rigs

### Playback Controls
- Play/pause functionality
- Adjustable scroll speed (0.1x - 5.0x)
- Built-in timer
- Reset function
- **Fullscreen mode** for distraction-free reading
- **Collapsible settings sidebar** in fullscreen mode for on-the-fly adjustments

### Reading Indicator
- Customizable position (0-100% from top)
- Adjustable color
- Helps track reading progress

### Configuration Management
- Export settings to JSON file
- Import previously saved configurations
- Reset to default settings

### Keyboard Shortcuts
- **Space** - Play/Pause
- **F** - Toggle Fullscreen
- **R** - Reset scroll position
- **S** - Toggle Settings Sidebar (in fullscreen mode)
- **C** - Toggle Control Panel (in fullscreen mode)
- **↑ Arrow Up** - Scroll up manually
- **↓ Arrow Down** - Scroll down manually
- **← Arrow Left** - Decrease speed by 0.1x
- **→ Arrow Right** - Increase speed by 0.1x

## Getting Started

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

This application is optimized for Vercel deployment:

### Option 1: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy

### Option 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/teleprompter)

## Usage

1. **Paste your script** into the "Teleprompter Content" area
2. **Customize settings** using the control panels:
   - Adjust font size, colors, and spacing
   - Set your preferred panel position
   - Configure margins and mirror mode if needed
   - Position the reading indicator
3. **Click Play** to start scrolling (or press **Space**)
4. **Click Fullscreen** to enter fullscreen mode (or press **F**)
5. **Adjust speed** in real-time as needed
6. **Export your configuration** to save your preferences for future use

### Tips for Best Results
- Use fullscreen mode for distraction-free reading
- Click "Settings" or press **S** in fullscreen to access the sidebar for quick adjustments
- Adjust the reading indicator to match your eye level on screen
- Start with a slower speed and gradually increase
- Use keyboard shortcuts for quick control during presentations
- The sidebar in fullscreen mode lets you change font size, colors, margins, and more without exiting

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- Optimized for [Vercel](https://vercel.com/) deployment

## License

MIT
