/// player.js - Music player functionality using a class-based structure
class MusicPlayer {
  constructor() {
    // Main audio element used for playback
    this.audio = new Audio();

    // Array to hold song objects (name, file, URL)
    this.playlist = [];

    // Keeps track of the current song index in the playlist
    this.currentTrackIndex = 0;

    // Boolean to track play/pause state
    this.isPlaying = false;

    // === DOM Elements (UI controls & display) ===
    this.progressBar = document.getElementById('myProgressBar');
    this.playButton = document.getElementById('masterPlay');
    this.nextButton = document.getElementById('next');
    this.prevButton = document.getElementById('previous');
    this.songNameDisplay = document.getElementById('masterSongName');
    this.gifDisplay = document.getElementById('gif');
    this.songItems = document.querySelectorAll('.songItemPlay');

    // Set up event listeners and drag-and-drop support
    this.initEventListeners();
    this.setupDragAndDrop();
  }

  // === Bind event listeners to the UI ===
  initEventListeners() {
    // Play/Pause master control
    this.playButton.addEventListener('click', () => {
      if (this.playlist.length === 0) return;
      this.togglePlay();
    });

    // Skip to next track
    this.nextButton.addEventListener('click', () => {
      if (this.playlist.length === 0) return;
      this.nextTrack();
    });

    // Go back to previous track
    this.prevButton.addEventListener('click', () => {
      if (this.playlist.length === 0) return;
      this.prevTrack();
    });

    // Jump to a specific part of the song when progress bar changes
    this.progressBar.addEventListener('input', () => {
      this.seek(this.progressBar.value);
    });

    // Auto-play next track when the current one ends
    this.audio.addEventListener('ended', () => {
      this.nextTrack();
    });

    // Update progress bar in real-time
    this.audio.addEventListener('timeupdate', () => {
      this.updateProgressBar();
    });

    // Assign click event to each song item
    this.songItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.playTrack(index);
      });
    });
  }

  // === Add drag-and-drop functionality to the song container ===
  setupDragAndDrop() {
    const container = document.querySelector('.container');

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      container.style.border = '2px dashed #fff'; // visual feedback
    });

    container.addEventListener('dragleave', () => {
      container.style.border = 'none';
    });

    container.addEventListener('drop', (e) => {
      e.preventDefault();
      container.style.border = 'none';

      const files = e.dataTransfer.files;
      this.handleFiles(files); // send files to handler
    });
  }

  // === Handle manual file uploads or drag-drop ===
  handleFiles(files) {
    const audioFiles = Array.from(files).filter(file =>
      file.type.startsWith('audio/') || file.name.endsWith('.mp3')
    );

    if (audioFiles.length === 0) {
      alert('Please drop only audio files (MP3, etc.)');
      return;
    }

    // Convert files to playlist format
    audioFiles.forEach(file => {
      const url = URL.createObjectURL(file);
      this.playlist.push({
        name: file.name.replace(/\.[^/.]+$/, ""), // strip extension
        url: url,
        file: file
      });
    });

    // Auto-play the first track if this is the first batch
    if (!this.isPlaying && this.playlist.length === audioFiles.length) {
      this.playTrack(0);
    }
  }

  // === Play selected track based on index ===
  playTrack(index) {
    if (index < 0 || index >= this.playlist.length) return;

    this.currentTrackIndex = index;
    const track = this.playlist[index];

    // Load selected audio into the player
    this.audio.src = track.url;
    this.songNameDisplay.textContent = track.name;
    this.gifDisplay.style.opacity = 1;

    // Start playing and update UI
    this.audio.play()
      .then(() => {
        this.isPlaying = true;
        this.playButton.classList.remove('fa-play-circle');
        this.playButton.classList.add('fa-pause-circle');
      })
      .catch(error => {
        console.error('Playback failed:', error);
      });
  }

  // === Toggle between play and pause ===
  togglePlay() {
    if (this.playlist.length === 0) return;

    if (this.isPlaying) {
      this.audio.pause();
      this.playButton.classList.remove('fa-pause-circle');
      this.playButton.classList.add('fa-play-circle');
    } else {
      this.audio.play()
        .then(() => {
          this.playButton.classList.remove('fa-play-circle');
          this.playButton.classList.add('fa-pause-circle');
        })
        .catch(error => {
          console.error('Playback failed:', error);
        });
    }

    this.isPlaying = !this.isPlaying;
  }

  // === Move to the next track in the playlist ===
  nextTrack() {
    const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.playTrack(nextIndex);
  }

  // === Move to the previous track ===
  prevTrack() {
    const prevIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.playTrack(prevIndex);
  }

  // === Seek to a position in the current song ===
  seek(percent) {
    const duration = this.audio.duration;
    if (isNaN(duration)) return;

    this.audio.currentTime = (percent / 100) * duration;
  }

  // === Update the progress bar as the song plays ===
  updateProgressBar() {
    if (isNaN(this.audio.duration)) return;

    const currentTime = this.audio.currentTime;
    const duration = this.audio.duration;
    const progressPercent = (currentTime / duration) * 100;

    this.progressBar.value = progressPercent;
  }
}

// === Initialize the player after the DOM is fully loaded ===
document.addEventListener('DOMContentLoaded', () => {
  const player = new MusicPlayer(); // create player instance

  // Optional: expose the player globally (useful for debugging)
  window.musicPlayer = player;

  // Create hidden input to manually add music
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.multiple = true;
  fileInput.accept = 'audio/*';
  fileInput.style.display = 'none';

  // Load files when user selects them via input
  fileInput.addEventListener('change', (e) => {
    player.handleFiles(e.target.files);
    fileInput.value = ''; // reset input value
  });

  document.body.appendChild(fileInput); // add input to the page

  // Add a visible "Add Music" button in the navbar
  const nav = document.querySelector('nav ul');
  const addMusicItem = document.createElement('li');
  addMusicItem.textContent = 'Add Music';
  addMusicItem.style.cursor = 'pointer';

  // When clicked, trigger the hidden file input
  addMusicItem.addEventListener('click', () => {
    fileInput.click();
  });

  // Append the button to the nav menu
  nav.appendChild(addMusicItem);
});
