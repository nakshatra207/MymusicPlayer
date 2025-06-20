
/**
 * Audio utility functions
 * Helper functions for audio-related operations
 */

/**
 * Format time in seconds to MM:SS format
 * @param seconds - Time in seconds
 * @returns Formatted time string (MM:SS)
 */
export const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) {
    return '00:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Get supported audio formats
 * @returns Array of supported MIME types
 */
export const getSupportedAudioFormats = (): string[] => {
  return [
    'audio/mpeg',      // MP3
    'audio/mp4',       // MP4 Audio
    'audio/wav',       // WAV
    'audio/ogg',       // OGG
    'audio/aac',       // AAC
    'audio/flac',      // FLAC
    'audio/webm',      // WebM Audio
  ];
};

/**
 * Check if a file is a supported audio format
 * @param file - File to check
 * @returns boolean indicating if file is supported
 */
export const isAudioFile = (file: File): boolean => {
  return getSupportedAudioFormats().includes(file.type) || 
         file.type.startsWith('audio/');
};

/**
 * Extract metadata from audio file (basic implementation)
 * In a real-world application, you might use a library like jsmediatags
 * @param file - Audio file
 * @returns Promise with basic metadata
 */
export const extractAudioMetadata = async (file: File): Promise<{
  title: string;
  artist: string;
  album: string;
}> => {
  // Basic metadata extraction from filename
  const filename = file.name.replace(/\.[^/.]+$/, '');
  
  // Try to parse artist - title format
  const parts = filename.split(' - ');
  
  if (parts.length >= 2) {
    return {
      title: parts[1].trim(),
      artist: parts[0].trim(),
      album: 'Unknown Album'
    };
  }
  
  return {
    title: filename,
    artist: 'Unknown Artist',
    album: 'Unknown Album'
  };
};
