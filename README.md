
# Music Player Application

A professional web-based music player built with React, TypeScript, and modern web technologies. This application provides a complete audio playback experience with playlist management, audio controls, and support for multiple audio formats.

## Features

### Core Functionality
- **Audio Playback**: Play, pause, and control audio files with HTML5 audio API
- **Multiple Format Support**: Compatible with MP3, MP4, WAV, OGG, AAC, FLAC, and WebM audio formats
- **Playlist Management**: Create, manage, and organize your music collection
- **Progress Control**: Seek to any position in the song with interactive progress bar
- **Volume Control**: Adjustable volume slider with visual feedback
- **Time Display**: Shows current time and total duration for each track

### Advanced Features
- **Shuffle Mode**: Randomize song order for varied listening experience
- **Repeat Modes**: 
  - No repeat: Play through playlist once
  - Repeat All: Loop entire playlist
  - Repeat One: Loop current song
- **Song Information**: Display track title, artist, and album information
- **Visual Feedback**: Animated audio visualization bars
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Interface
- **Modern Design**: Gradient backgrounds with glass-morphism effects
- **Intuitive Controls**: Easy-to-use play/pause, skip, and volume controls
- **Interactive Playlist**: Click to play songs, remove unwanted tracks
- **Visual Indicators**: Highlight currently playing song
- **File Upload**: Drag-and-drop or click to upload multiple audio files

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom gradients and animations
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React icon set
- **Build Tool**: Vite for fast development and optimized builds
- **Audio Handling**: HTML5 Audio API

## Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm, yarn, or pnpm package manager

### Windows Setup
1. **Install Node.js**:
   - Download from [nodejs.org](https://nodejs.org/)
   - Run the installer and follow setup wizard
   - Verify installation: `node --version` and `npm --version`

2. **Clone and Setup Project**:
   ```cmd
   git clone <repository-url>
   cd music-player
   npm install
   npm run dev
   ```

3. **Access Application**:
   - Open browser and navigate to `http://localhost:8080`

### macOS Setup
1. **Install Node.js**:
   ```bash
   # Using Homebrew (recommended)
   brew install node
   
   # Or download from nodejs.org
   ```

2. **Clone and Setup Project**:
   ```bash
   git clone <repository-url>
   cd music-player
   npm install
   npm run dev
   ```

3. **Access Application**:
   - Open browser and navigate to `http://localhost:8080`

### Linux Setup
1. **Install Node.js**:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm
   
   # CentOS/RHEL/Fedora
   sudo dnf install nodejs npm
   
   # Arch Linux
   sudo pacman -S nodejs npm
   ```

2. **Clone and Setup Project**:
   ```bash
   git clone <repository-url>
   cd music-player
   npm install
   npm run dev
   ```

3. **Access Application**:
   - Open browser and navigate to `http://localhost:8080`

## How to Use

### Getting Started
1. **Launch the Application**: Start the development server and open in browser
2. **Upload Music**: Click "Upload Music Files" button to add audio files
3. **Select Multiple Files**: Hold Ctrl (Windows/Linux) or Cmd (Mac) to select multiple files
4. **Supported Formats**: Upload MP3, MP4, WAV, OGG, AAC, FLAC, or WebM files

### Playing Music
1. **Start Playback**: Click any song in the playlist or use the play button
2. **Control Playback**: Use play/pause, skip forward/backward buttons
3. **Adjust Volume**: Use the volume slider to control audio level
4. **Seek Position**: Click anywhere on the progress bar to jump to that position

### Playlist Management
1. **View Playlist**: Songs appear in the right sidebar after upload
2. **Play Specific Song**: Click on any song in the playlist to play it
3. **Remove Songs**: Click the trash icon next to any song to remove it
4. **Track Information**: View song title, artist, and duration

### Advanced Controls
1. **Shuffle Mode**: Click shuffle button to randomize playback order
2. **Repeat Options**: 
   - Click repeat button once for "Repeat All"
   - Click again for "Repeat One"
   - Click third time to disable repeat
3. **Visual Feedback**: Current song is highlighted in the playlist

## Code Structure

### Main Components
- **MusicPlayer.tsx**: Core player component with audio controls and state management
- **Playlist.tsx**: Playlist display and management component
- **SongInfo.tsx**: Current song information and visual display
- **audioUtils.ts**: Utility functions for time formatting and audio operations

### Key Features Implementation
- **Audio Control**: Uses HTML5 Audio API with React refs for playback control
- **State Management**: React hooks for player state, playlist, and user preferences
- **File Handling**: FileReader API for processing uploaded audio files
- **Responsive Design**: Tailwind CSS grid system for mobile-first responsive layout

## Development Notes

### Code Quality
- **TypeScript**: Full type safety with interfaces for Song objects
- **Component Architecture**: Modular, reusable components with clear responsibilities
- **Code Documentation**: Comprehensive comments explaining functionality
- **Error Handling**: Graceful handling of audio loading and playback errors

### Performance Optimizations
- **Lazy Loading**: Audio files loaded only when needed
- **Memory Management**: Proper cleanup of audio objects and event listeners
- **Efficient Rendering**: React optimization patterns to prevent unnecessary re-renders

## Browser Compatibility

- **Chrome**: Full support for all features
- **Firefox**: Full support for all features
- **Safari**: Full support with some format limitations
- **Edge**: Full support for all features

## File Format Support

| Format | Extension | Browser Support |
|--------|-----------|----------------|
| MP3    | .mp3      | Universal      |
| MP4    | .mp4, .m4a| Universal      |
| WAV    | .wav      | Universal      |
| OGG    | .ogg      | Chrome, Firefox|
| AAC    | .aac      | Most browsers  |
| FLAC   | .flac     | Chrome, Edge   |
| WebM   | .webm     | Chrome, Firefox|

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes with proper comments and documentation
4. Test thoroughly across different browsers and devices
5. Submit a pull request with detailed description

## License

This project is created for educational purposes. Feel free to use, modify, and distribute according to your needs.

## Support

For issues, questions, or contributions:
1. Check existing documentation
2. Review code comments for implementation details
3. Test with different audio file formats
4. Ensure browser compatibility for your use case

---

**Built with modern web technologies for an exceptional music listening experience.**
