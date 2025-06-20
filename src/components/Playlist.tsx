
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Music } from 'lucide-react';
import { Song } from '../types/Song';
import { formatTime } from '../utils/audioUtils';

interface PlaylistProps {
  songs: Song[];
  currentSongIndex: number;
  onSongSelect: (index: number) => void;
  onSongRemove: (index: number) => void;
}

/**
 * Playlist Component
 * Displays list of songs with play/remove functionality
 */
const Playlist: React.FC<PlaylistProps> = ({
  songs,
  currentSongIndex,
  onSongSelect,
  onSongRemove
}) => {
  return (
    <Card className="bg-black/30 backdrop-blur-md border-gray-700 h-fit">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Music className="h-5 w-5 mr-2" />
          Playlist ({songs.length} songs)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {songs.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No songs in playlist</p>
            <p className="text-sm">Upload audio files to get started</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className={`flex items-center p-3 border-b border-gray-700 hover:bg-white/10 cursor-pointer transition-colors ${
                  index === currentSongIndex ? 'bg-purple-600/30' : ''
                }`}
                onClick={() => onSongSelect(index)}
              >
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    index === currentSongIndex ? 'text-purple-400' : 'text-white'
                  }`}>
                    {song.title}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {song.artist} • {song.album}
                  </p>
                  {song.duration > 0 && (
                    <p className="text-xs text-gray-500">
                      {formatTime(song.duration)}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSongRemove(index);
                  }}
                  className="text-gray-400 hover:text-red-400 hover:bg-red-400/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Playlist;
