console.log("Welcome to Spotify");
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songIndex = 0;
let songItems = Array.from(document.getElementsByClassName("songItems"));
let songItemPlay = document.getElementsByClassName('songItemPlay');
let masterSongName = document.getElementById("masterSongName");

let songs = [
    {songName:"Warrio - Mortals (feat. Laura Brehm) [NCS Release]",filePath:"/songs/1.mp3",coverPath:"/covers/1.jpg"},
    {songName:"Cielo - Huma-Huma",filePath:"/songs/2.mp3",coverPath:"/covers/2.jpg"},
    {songName:"DEAF KEV - Invincible [NCS Release]-320k",filePath:"/songs/3.mp3",coverPath:"/covers/3.jpg"},
    {songName:"Different Heaven & EH!DE - My Heart [NCS Release]-320k",filePath:"/songs/4.mp3",coverPath:"/covers/4.jpg"},
    {songName:"Janji-Heroes-Tonight-feat-Johnning-NCS-Release)",filePath:"/songs/5.mp3",coverPath:"/covers/5.jpg"},
    {songName:"Tu hi meri shab hai - Gangster",filePath:"/songs/6.mp3",coverPath:"/covers/6.jpg"},
    {songName:"Bheegi bheegi - Gangster",filePath:"/songs/7.mp3",coverPath:"/covers/7.jpg"},
    {songName:"Ya Ali - Gangster",filePath:"/songs/8.mp3",coverPath:"/covers/8.jpg"},
];






masterPlay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime === 0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        gif.style.opacity = 0;

    }
   
});







audioElement.addEventListener('timeupdate',()=>{
    let progress = ((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * (audioElement.duration/100);
})


songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    if (!audioElement.paused){
        let i = songIndex;
        element.addEventListener('click',(e)=>{
            songIndex = parseInt(e.target.id)
            if (i === songIndex){
                e.target.classList.remove("fa-paused-circle");
                e.target.classList.add("fa-play-circle");
                masterPlay.classList.remove("fa-paused-circle");
                masterPlay.classList.add("fa-play-circle");
                audioElement.pause();
            }
        })
    }
    element.addEventListener('click',(e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        masterSongName.innerText = songs[songIndex].songName;
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `/songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

        
    })
});

document.getElementById('next').addEventListener('click',()=>{
    if (songIndex >= 7){
        songIndex = 0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `/songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex <= 0){
        songIndex = 7;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `/songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

