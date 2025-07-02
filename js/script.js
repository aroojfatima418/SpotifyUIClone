//code to get data from fetch api when backend isn't involve this is not a best way because when backend involve we use server to get data
console.log("let's write javascript")
let songs;
let currFolder;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || (seconds < 0)) {
        return "00:00"
    }
    const minutes = Math.floor(seconds / 60);
    const remainingseconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedseconds = String(remainingseconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedseconds} `
}
let currentsong = new Audio;
async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/javascript/JSProject2/${folder}/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li class="flex_center">
                            <div class="music"><img class="invert" src="svgs/music.svg" alt="music"></div>
                            <div class="info">
                                <div> ${song}</div>
                            </div>
                            <div class="playnow flex_center_center">
                                <div>Play Now</div>
                                <div><img class="invert" src="svgs/play.svg" alt="play"></div>
                            </div>
                        </li>`
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", () => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    return songs;
}
function playmusic(track, pause = false) {
    currentsong.src = `/javascript/JSProject2/${currFolder}/` + track
    if (!pause) {
        currentsong.play();
        play.src = "svgs/pause.svg"
    }
    let songname = document.querySelector(".songname")
    songname.innerHTML = track
    let songtime = document.querySelector(".songtime")
    songtime.innerHTML = "00:00 / 00:00"
}
async function main() {
    songs = await getsongs("songs/Acoustic_music");
    playmusic(songs[0], true);
    let play = document.querySelector("#play")
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "svgs/pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "svgs/play.svg"
        }
    })
    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        document.querySelector(".seekbar").style.backgroundColor = "red";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;
    })
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-112%";
    })
    let previous = document.querySelector("#previous")
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1])
        }
    })
    let next = document.querySelector("#next")
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1])
        }
    })
    let lessthan = document.querySelector(".lessthan")
    lessthan.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1])
        }
    })
    let greaterthan = document.querySelector(".greaterthan")
    greaterthan.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1])
        }
    })
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100;
    })
    let volume = document.querySelector(".volume");
    volume.addEventListener("click", (vol) => {
        if (vol.target.src.includes("volume.svg")) {
            vol.target.src = vol.target.src.replace("volume.svg", "mute.svg")
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
            currentsong.volume = 0;
        }
        else {
            vol.target.src = vol.target.src.replace("mute.svg", "volume.svg")
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
            currentsong.volume = 0.1;
        }
    })
    Array.from(document.querySelectorAll(".first_card")).forEach((e) => {
        e.addEventListener("click", async (item) => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
        })
    })
    Array.from(document.querySelectorAll(".first_artist")).forEach((e) => {
        e.addEventListener("click", async (item) => {
            console.log("first artist is clicked")
            console.log(item, item.currentTarget.dataset.folder)
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
        })
    })
}
main();