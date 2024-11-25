//Initialise the variables
let audioElement = new Audio('4.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItemplay = document.getElementsByClassName('songItemPlay');
let Next = document.getElementById('next');
let Previous = document.getElementById('previous');
let songs = [
    {songName: "SunRoof", filePath:"1.mp3",coverPath:"s1.jpg"},
    {songName: "Apna Bana Le", filePath:"2.mp3",coverPath:"b1.jpg"},
    {songName: "Afreen Afreen", filePath:"3.mp3",coverPath:"a1.jpeg"},
    {songName: "Pehla Pyaar", filePath:"4.mp3",coverPath:"p1.jpg"},
    {songName: "Humsafar", filePath:"5.mp3",coverPath:"h1.jpg"},
    {songName: "Tum hi ho", filePath:"6.mp3",coverPath:"R.jpg"},
    {songName: "Tu jaane ja", filePath:"7.mp3",coverPath:"t1.jpg"},
    {songName: "Kun Faya Kun", filePath:"8.mp3",coverPath:"k1.jpg"}   
]



//Adding songInfo

let currentSongName = document.getElementById('currentSongName');

const updateSongName = (index) => {
    currentSongName.textContent = songs[index].songName;
};

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress; 
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

let songIndex = 0; // Track the current song index

const songItems = Array.from(document.getElementsByClassName('songItemPlay')); // Song buttons

// Reset all play buttons to 'play' state
const makeAllPlays = () => {
    songItems.forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

// Play a specific song
const playSong = (index) => {
    songIndex = index; // Update the current song index
    audioElement.src = `${songIndex + 1}.mp3`; // Set the audio source
    audioElement.currentTime = 0;
    audioElement.play(); // Play the song
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays(); // Reset all other buttons
    songItems[songIndex].classList.remove('fa-play');
    songItems[songIndex].classList.add('fa-pause'); // Highlight the current song
    updateSongName(songIndex);
};

// Pause the current song
const pauseSong = () => {
    audioElement.pause(); // Pause the song
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    songItems[songIndex].classList.remove('fa-pause');
    songItems[songIndex].classList.add('fa-play'); // Update the current button
};

// Handle individual song play/pause buttons
songItems.forEach((element, index) => {
    element.addEventListener('click', () => {
        if (songIndex === index && !audioElement.paused) {
            pauseSong(); // Pause if the same song is clicked again
        } else {
            playSong(index); // Play the selected song
        }
    });
});

// Handle master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex); // Play the current song
    } else {
        pauseSong(); // Pause the current song
    }
});



Next.addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
    songItems[songIndex].classList.remove('fa-play');
    songItems[songIndex].classList.add('fa-pause'); 
    updateSongName(songIndex);
})

Previous.addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    makeAllPlays();
    songItems[songIndex].classList.remove('fa-play');
    songItems[songIndex].classList.add('fa-pause'); 
    updateSongName(songIndex);
})

//volume slider
const volumeSlider = document.getElementById('volumeSlider');
const volumeUp = document.getElementById('volumeUp');
const volumeDown = document.getElementById('volumeDown');

// Set initial volume
audioElement.volume = 0.5;

// Handle slider change
volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value; // Update volume
});

// Increase volume
volumeUp.addEventListener('click', () => {
    audioElement.volume = Math.min(audioElement.volume + 0.1, 1); // Cap at 1.0
    volumeSlider.value = audioElement.volume; // Update slider
});

// Decrease volume
volumeDown.addEventListener('click', () => {
    audioElement.volume = Math.max(audioElement.volume - 0.1, 0); // Cap at 0.0
    volumeSlider.value = audioElement.volume; // Update slider
});

