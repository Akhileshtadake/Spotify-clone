//Initialise the variables
let audioElement = new Audio('4.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItemplay = document.getElementsByClassName('songItemPlay');
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


//Handle play/pause click

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');

    }
})


//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress; 
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        let songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
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
})

document.getElementById('previous').addEventListener('click', ()=>{
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
})

