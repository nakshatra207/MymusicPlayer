
/**
 * Song interface definition
 * Represents a single audio track with metadata
 */
export interface Song {
  id: number;           // Unique identifier for the song
  title: string;        // Song title (derived from filename)
  artist: string;       // Artist name (default: "Unknown Artist")
  album: string;        // Album name (default: "Unknown Album")
  duration: number;     // Song duration in seconds
  url: string;          // Audio file URL (blob URL for uploaded files)
  file?: File;          // Original file object (for uploaded files)
}
