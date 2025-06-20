
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Music } from 'lucide-react';
import { Song } from '../types/Song';

interface SongInfoProps {
  song: Song | undefined;
}

/**
 * Song Information Display Component
 * Shows current song details and album art placeholder
 */
const SongInfo: React.FC<SongInfoProps> = ({ song }) => {
  if (!song) {
    return (
      <Card className="bg-black/30 backdrop-blur-md border-gray-700">
        <CardContent className="p-8 text-center">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
            <Music className="h-20 w-20 text-white/50" />
          </div>
          <h2 className="text-2xl font-bold text-gray-400 mb-2">No Song Selected</h2>
          <p className="text-gray-500">Upload and select a song to start playing</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 backdrop-blur-md border-gray-700">
      <CardContent className="p-8 text-center">
        {/* Album Art Placeholder */}
        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-6 shadow-2xl">
          <Music className="h-20 w-20 text-white/80" />
        </div>

        {/* Song Information */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white truncate">
            {song.title}
          </h2>
          <p className="text-lg text-gray-300">
            {song.artist}
          </p>
          <p className="text-md text-gray-400">
            {song.album}
          </p>
        </div>

        {/* Visual Audio Bars Animation */}
        <div className="flex justify-center items-end space-x-1 mt-6 h-12">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-purple-600 to-pink-400 rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 100 + 20}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SongInfo;
