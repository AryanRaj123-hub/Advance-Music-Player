let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songTitle = document.getElementById("song-title");
let songArtist = document.getElementById("song-artist");
let songImg = document.querySelector(".song-img");
let volumeControl = document.getElementById("volume");
let volumeDisplay = document.getElementById("volume-display");
let muteIcon = document.getElementById("mute-icon");

const playlist = [
    {
        title: "Kasturi",
        artist: "Arijit Singh, Prasad S, Kunnal Verma",
        src: "media/Kasturi_64(PagalWorld.com.sb).mp3",
        img: "media/photo.png",
    },
    {
        title: "Wishlist",
        artist: "Dino James",
        src: "media/new_320_Wishlist - Dino James.mp3",
        img: "media/photo.png",
    },
    {
        title: "Sweetheart",
        artist: "Kedarnath",
        src: "media/Sweetheart - Kedarnath 2019 320KBPS.mp3",
        img: "media/photo.png",
    },
];

let currentSongIndex = 0;

// Load Song
function loadSong(index) {
    const songData = playlist[index];
    song.src = songData.src;
    songTitle.innerText = songData.title;
    songArtist.innerText = songData.artist;
    songImg.src = songData.img;
    progress.value = 0;
    song.pause();
    ctrlIcon.classList.add("fa-play");
    ctrlIcon.classList.remove("fa-pause");
}

// Play/Pause Functionality
function playpause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

// Update Progress Bar
song.addEventListener("timeupdate", () => {
    progress.value = song.currentTime;
    progress.max = song.duration;
});

// Seek Functionality
progress.onchange = function () {
    song.currentTime = progress.value;
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
};

// Next Song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

// Previous Song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}

// Auto Next Song
song.addEventListener("ended", nextSong);

// Volume Control
song.volume = 1; // Default volume 100%
volumeControl.addEventListener("input", function () {
    let volume = volumeControl.value / 100;
    song.volume = volume;
    // Update Volume Display Text
    volumeDisplay.innerText = `${Math.round(volume * 100)}%`;
});

// Mute/Unmute Functionality
let isMuted = false;
muteIcon.addEventListener("click", function () {
    isMuted = !isMuted;
    song.muted = isMuted; // Toggle mute
    if (isMuted) {
        muteIcon.classList.remove("fa-volume-xmark");
        muteIcon.classList.add("fa-volume-mute");
        volumeControl.value = 0; // Set volume to 0 when muted
    } else {
        muteIcon.classList.remove("fa-volume-mute");
        muteIcon.classList.add("fa-volume-xmark");
        volumeControl.value = song.volume * 100; // Reset volume to previous value
    }
});
