console.log("Welcome to Nakshatra's Music Player");

// === Initial Setup ===

// Tracks the current song index in the playlist
let songIndex = 0;

// Creates an audio element for playing songs
let audioElement = new Audio('songs/1.mp3');

// Selecting important DOM elements for control and display
let masterPlay = document.getElementById('masterPlay'); // Master play/pause button
let myProgressBar = document.getElementById('myProgressBar'); // Progress/seek bar
let gif = document.getElementById('gif'); // Visual animation when song plays
let masterSongName = document.getElementById('masterSongName'); // Song title display
let songItems = Array.from(document.getElementsByClassName('songItem')); // List of song items

// === Song Data ===
// An array of songs with title, file path, and cover image
let songs = [
    {songName: "Ram Siya Ram", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Jaane nahi denge tujhe", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Zamana Laage", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Qayamat", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Ishq Hain Zindagi", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Badass RaviKumar", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Jaane tu ", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Meri Aashiqui ", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Lut Gaye", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Hawa Banke", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

// === Set song names and images dynamically ===
songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; // Set cover image
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; // Set song title
})

// === Master Play/Pause Button Logic ===
masterPlay.addEventListener('click', () => {
    // If song is not playing or is at the beginning
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play(); // Play the song
        masterPlay.classList.remove('fa-play-circle'); // Change icon to pause
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; // Show playing GIF
    }
    else{
        audioElement.pause(); // Pause the song
        masterPlay.classList.remove('fa-pause-circle'); // Change icon back to play
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; // Hide playing GIF
    }
})

// === Update progress bar as song plays ===
audioElement.addEventListener('timeupdate', () => { 
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress; // Reflect current time on seek bar
})

// === Allow user to seek by dragging the progress bar ===
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100; // Jump to new time
})

// === Reset all play buttons in the song list to 'play' icon ===
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// === Play the selected song when its play button is clicked ===
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        makeAllPlays(); // Reset all other songs' icons

        songIndex = parseInt(e.target.id); // Get song index from clicked button

        e.target.classList.remove('fa-play-circle'); // Change icon to pause
        e.target.classList.add('fa-pause-circle');

        // Load the selected song
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0; // Start from beginning
        audioElement.play();
        gif.style.opacity = 1; // Show animation
        masterPlay.classList.remove('fa-play-circle'); // Sync master icon
        masterPlay.classList.add('fa-pause-circle');
    })
})

// === Next Button Logic ===
document.getElementById('next').addEventListener('click', () => {
    // Go to first song if at the end
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }

    // Load and play next song
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// === Previous Button Logic ===
document.getElementById('previous').addEventListener('click', () => {
    // Stay at the first song if already there
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }

    // Load and play previous song
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
// Volume control buttons
let volUp = document.getElementById("volUp");
let volDown = document.getElementById("volDown");

// Increase volume
volUp.addEventListener('click', () => {
    if (audioElement.volume < 1) {
        audioElement.volume = Math.min(1, audioElement.volume + 0.1);
        console.log("Volume:", Math.round(audioElement.volume * 100));
    }
});

// Decrease volume
volDown.addEventListener('click', () => {
    if (audioElement.volume > 0) {
        audioElement.volume = Math.max(0, audioElement.volume - 0.1);
        console.log("Volume:", Math.round(audioElement.volume * 100));
    }
});
