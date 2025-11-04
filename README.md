# FocusMate

A modern Pomodoro timer application built with Next.js and TypeScript. FocusMate helps you maintain focus and boost productivity using the proven Pomodoro Technique with 25-minute work sessions.

## Features

- **Pomodoro Timer**: Classic 25-minute focus sessions with 5-minute short breaks and 25-minute long breaks after every 4 sessions
- **Session Tracking**: Track your completed sessions and full work cycles throughout the day
- **Background Music**: Multiple ambient music tracks to help you maintain focus during work sessions
- **Break Music**: Separate calming music selection for your break periods
- **Volume Controls**: Adjustable volume and mute functionality for all audio
- **Desktop Notifications**: Get notified when sessions end and breaks are over
- **Motivational Messages**: Random motivational quotes displayed during focus sessions
- **Progress Tracking**: Visual progress indicators and session logs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Beautiful UI**: Modern gradient-based design with smooth animations
- **Background Images**: Rotating background images with smooth crossfade transitions

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Optimization**: Sharp
- **Audio**: HTML5 Audio API with royalty-free music from Incompetech and Free Music Archive

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/focusMate.git
cd focusMate
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## How to Use

1. Click "Start Focus Session" on the home page
2. Select your preferred background music from the dropdown menu
3. Enable or disable desktop notifications
4. Click "Start Focus Session" to begin your first Pomodoro
5. Work focused for 25 minutes until the timer rings
6. Take a 5-minute short break
7. After 4 completed sessions, enjoy a 25-minute long break
8. Repeat to build momentum and maintain productivity

## Project Structure

```
focusMate/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with font configuration
│   │   ├── page.tsx             # Main page with view management
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── FocusTimer.tsx       # Main timer component
│   │   ├── HeroSection.tsx      # Landing page hero
│   │   ├── SettingsPanel.tsx    # Session setup panel
│   │   ├── MusicControls.tsx    # Music player controls
│   │   ├── MotivationBanner.tsx # Motivational messages
│   │   └── PomodoroInfoModal.tsx # Information modal
│   └── lib/
│       └── music.ts             # Music track definitions
├── public/
│   ├── images/                  # Background images
│   └── audio/                   # Audio files for notifications
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## Features Explanation

### Pomodoro Technique
The application implements the classic Pomodoro Technique:
- 25-minute focus sessions
- 5-minute short breaks
- 25-minute long breaks after every 4 sessions
- Visual and audio cues for session transitions

### Session Persistence
Your session count and completed cycles are saved to local storage, so you don't lose progress if you refresh the page.

### Music Integration
The app includes curated royalty-free ambient music tracks that loop continuously. You can switch between tracks anytime during your session.

### Notifications
With permission, the app sends browser notifications when:
- A focus session completes
- A break period ends
- A long break finishes

## Browser Compatibility

FocusMate works best on modern browsers that support:
- HTML5 Audio API
- Web Notifications API
- CSS Grid and Flexbox
- ES6+ JavaScript features

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Acknowledgments

This project was developed with assistance from Claude Code, an AI coding assistant by Anthropic.

Music sources:
- Incompetech (Kevin MacLeod) - Licensed under Creative Commons
- Free Music Archive - Royalty-free tracks

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome. Please feel free to submit a pull request or open an issue for bugs and feature requests.

## Contact

Created by Mahmoud Ibrahim

For questions or feedback, please open an issue on the repository.
