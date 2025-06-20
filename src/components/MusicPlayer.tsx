
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Shuffle, Repeat, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import Playlist from './Playlist';
import SongInfo from './SongInfo';
import { Song } from '../types/Song';
import { formatTime } from '../utils/audioUtils';

/**
 * Main Music Player Component
 * Handles audio playback, playlist management, and user interactions
 */
const MusicPlayer: React.FC = () => {
  // Audio reference for controlling playback
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // State management for player functionality
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');

  // Get current song object
  const currentSong = songs[currentSongIndex];

  /**
   * Handle file upload and create song objects
   * Supports multiple audio formats (mp3, mp4, wav, ogg, etc.)
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newSongs: Song[] = [];
    
    Array.from(files).forEach((file, index) => {
      // Validate audio file types
      if (file.type.startsWith('audio/')) {
        const song: Song = {
          id: Date.now() + index,
          title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
          artist: 'Unknown Artist',
          album: 'Unknown Album',
          duration: 0,
          url: URL.createObjectURL(file),
          file: file
        };
        newSongs.push(song);
      }
    });

    setSongs(prevSongs => [...prevSongs, ...newSongs]);
  };

  /**
   * Toggle play/pause functionality
   */
  const togglePlayPause = () => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  /**
   * Skip to next song in playlist
   * Handles shuffle and repeat modes
   */
  const nextSong = () => {
    if (songs.length === 0) return;

    let nextIndex;
    if (isShuffled) {
      // Random next song when shuffle is enabled
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    setCurrentSongIndex(nextIndex);
  };

  /**
   * Skip to previous song in playlist
   */
  const previousSong = () => {
    if (songs.length === 0) return;

    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
  };

  /**
   * Handle progress bar seeking
   */
  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    
    const seekTime = (value[0] / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  /**
   * Handle volume control
   */
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  /**
   * Handle song end - determine next action based on repeat mode
   */
  const handleSongEnd = () => {
    switch (repeatMode) {
      case 'one':
        // Repeat current song
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
        break;
      case 'all':
        // Move to next song
        nextSong();
        break;
      default:
        // Stop playing at end of playlist
        if (currentSongIndex < songs.length - 1) {
          nextSong();
        } else {
          setIsPlaying(false);
        }
    }
  };

  /**
   * Select and play specific song from playlist
   */
  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
  };

  /**
   * Remove song from playlist
   */
  const removeSong = (index: number) => {
    const newSongs = songs.filter((_, i) => i !== index);
    setSongs(newSongs);
    
    // Adjust current song index if necessary
    if (index < currentSongIndex) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else if (index === currentSongIndex && newSongs.length > 0) {
      setCurrentSongIndex(Math.min(currentSongIndex, newSongs.length - 1));
    }
  };

  // Effect to handle audio events and metadata loading
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => handleSongEnd();

    // Add event listeners for audio events
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);

    // Set initial volume
    audio.volume = volume / 100;

    // Cleanup event listeners
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [currentSongIndex, repeatMode, volume]);

  // Effect to auto-play when song changes
  useEffect(() => {
    if (currentSong && audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  return (
    <div className="min-h-screen p-4 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Music Player
          </h1>
          <p className="text-gray-300 mt-2">Professional Audio Player with Playlist Management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Player Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Song Information Display */}
            <SongInfo song={currentSong} />

            {/* Player Controls Card */}
            <Card className="bg-black/30 backdrop-blur-md border-gray-700">
              <CardContent className="p-6">
                {/* Progress Bar */}
                <div className="mb-6">
                  <Slider
                    value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
                    onValueChange={handleSeek}
                    max={100}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Main Control Buttons */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={`text-white hover:bg-white/20 ${isShuffled ? 'text-purple-400' : ''}`}
                  >
                    <Shuffle className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={previousSong}
                    disabled={songs.length === 0}
                    className="text-white hover:bg-white/20"
                  >
                    <SkipBack className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={togglePlayPause}
                    disabled={!currentSong}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4"
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={nextSong}
                    disabled={songs.length === 0}
                    className="text-white hover:bg-white/20"
                  >
                    <SkipForward className="h-6 w-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setRepeatMode(
                      repeatMode === 'none' ? 'all' : 
                      repeatMode === 'all' ? 'one' : 'none'
                    )}
                    className={`text-white hover:bg-white/20 ${repeatMode !== 'none' ? 'text-purple-400' : ''}`}
                  >
                    <Repeat className="h-5 w-5" />
                    {repeatMode === 'one' && <span className="text-xs ml-1">1</span>}
                  </Button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-gray-400" />
                  <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-400 w-10">{volume}%</span>
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="bg-black/30 backdrop-blur-md border-gray-700">
              <CardContent className="p-6">
                <div className="text-center">
                  <input
                    type="file"
                    multiple
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg cursor-pointer hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Music Files
                  </label>
                  <p className="text-gray-400 text-sm mt-2">
                    Supports MP3, MP4, WAV, OGG and other audio formats
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Playlist Section */}
          <div className="lg:col-span-1">
            <Playlist
              songs={songs}
              currentSongIndex={currentSongIndex}
              onSongSelect={selectSong}
              onSongRemove={removeSong}
            />
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={currentSong?.url}
          preload="metadata"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
