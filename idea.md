## Main Function
This app displays scrolling text (like a teleprompter) for speakers, presenters, and video creators to read while presenting or recording, helping them maintain eye contact with the camera/audience without memorizing scripts.

## Key Features:

**Text Customization:**
- Font size, line height, and letter spacing controls
- Text alignment options
- Customizable text and background colors
- Eye-friendly color presets

**Display Settings:**
- Multiple panel position layouts
- Mirror mode (horizontal/vertical flip) for use with physical teleprompter rigs
- Adjustable margins on all sides

**Playback Controls:**
- Play/pause functionality
- Speed adjustment (shown as 1.0x)
- Timer display

**Reading Indicator:**
- Customizable position and color
- Helps track reading progress

**Configuration Management:**
- Export/import settings
- Reset to default option

The app essentially lets you paste your script into the "Teleprompter Content" area, customize how it displays, and then have it scroll automatically at your preferred speed while you read it - commonly used for video production, presentations, live streaming, or public speaking.

## Deployment

I would like to deploy it in the Vercel. So you can pick the framework that best suits the Vercel.

## Style

Here's a detailed style description you can pass to LLMs:

## Visual Style & Design System

**Color Scheme:**
- Background: Pure black (#000000) or very dark gray
- Primary UI elements: Dark gray (#1a1a1a to #2a2a2a) with subtle borders
- Text: Light gray/white for high contrast
- Accent: Minimal use, mostly monochromatic
- Overall theme: Dark mode, high-contrast interface

**Layout Structure:**
- Three-column grid layout for settings panels (Text Settings | Display Settings | Indicator Settings)
- Two-column layout below settings (Teleprompter Content | Preview)
- Full-width control bar at top with playback controls
- Consistent padding and spacing throughout (approximately 16-24px gaps)

**Component Styling:**

*Panels/Sections:*
- Dark gray rounded containers with subtle borders
- Section headers in uppercase white text (e.g., "TEXT SETTINGS")
- Grouped logically by function

*Buttons:*
- Rounded rectangle buttons with dark gray background
- Icon-only buttons for common actions (play, pause, mirror, etc.)
- Text buttons for secondary actions (Export/Import Configuration)
- Hover states implied through consistent styling

*Input Controls:*
- Number inputs with dark background and light text
- Sliders with gray track and white handle
- Toggle switches with subtle on/off states
- Dropdown-style color pickers

*Icons:*
- Simple, outlined style icons
- Monochromatic (white/light gray)
- Consistent stroke weight

**Typography:**
- Sans-serif font family (appears to be system font or modern sans-serif)
- Multiple text sizes: Large for preview text, medium for labels, small for values
- Weight hierarchy: Regular for body, medium/bold for headers
- Letter spacing: Comfortable, not too tight

**Interactive Elements:**
- Text alignment buttons (left, center, right) with icon representations
- Color palette selector with circular swatches labeled "Eye-friendly Colors"
- Panel position selector with visual grid icons
- Margin controls with directional indicators (arrows for top, bottom, left, right)

**Overall Aesthetic:**
- Minimalist, professional interface
- Focus on functionality over decoration
- Clean, uncluttered design
- Studio/production tool aesthetic (similar to video editing software)
- High information density but well-organized
- Modern web app design patterns

**Spacing & Proportions:**
- Generous whitespace between sections
- Consistent 8px or 16px grid system
- Balanced element sizes
- Responsive-looking layout that adapts to screen size

This is a professional, dark-themed teleprompter application with a clean, modern interface optimized for content creators and presenters. The design prioritizes usability and readability with high contrast and clear visual hierarchy.