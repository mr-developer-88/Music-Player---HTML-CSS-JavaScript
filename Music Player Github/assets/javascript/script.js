document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        progress: document.getElementById("progress"),
        song: document.getElementById("song"),
        controlIcon: document.getElementById("controlIcon"),
        playPauseBtn: document.querySelector(".play-pause-btn"),
        forwardBtn: document.querySelector(".controls .forward"),
        backwardBtn: document.querySelector(".controls .backward"),
        songName: document.querySelector(".music-player h1"),
        artistName: document.querySelector(".music-player p"),
    };

    const playList = [
        { title: "Symphony", name: "Clean Bandit ft. Zara Larsson", source: "/assets/Music/Music 1.mp3" },
        { title: "Pawn It All", name: "Alicia Keys", source: "/assets/Music/Music 2.mp3" },
        { title: "Seni Dert Etmeler", name: "Madrigal", source: "/assets/Music/Music 3.mp3" },
        { title: "Instant Crush", name: "Daft Punk ft. Julian Casablancas", source: "/assets/Music/Music 4.mp3" },
        { title: "As It Was", name: "Harry Styles", source: "/assets/Music/Music 5.mp3" },
        { title: "Physical", name: "Dua Lipa", source: "/assets/Music/Music 6.mp3" },
        { title: "Delicate", name: "Taylor Swift", source: "/assets/Music/Music 7.mp3" },
    ];

    let currentSongIndex = 3;

    const updateSongInfo = () => {
        const currentSong = playList[currentSongIndex];
        elements.songName.textContent = currentSong.title;
        elements.artistName.textContent = currentSong.name;
        elements.song.src = currentSong.source;
        elements.song.load(); // ensure that the audio elements loads the new source
    };

    const setProgress = () => {
        if(!elements.song.paused) {
            elements.progress.value = elements.song.currentTime;
        };
    };

    const setProgressMax = () => {
        elements.progress.max = elements.song.duration;
        elements.progress.value = elements.song.currentTime;
    }

    const pauseSong = () => {
        elements.song.pause();
        elements.controlIcon.classList.replace("fa-pause", "fa-play");
    }

    const playSong = () => {
        elements.song.play().catch(error => {
            console.error("Error playing song", error);
        })
        elements.controlIcon.classList.replace("fa-play", "fa-pause")
    }

    const togglePlayPause = () => {
        elements.song.paused ? playSong() : pauseSong();
    }

    const changeSong = (direction) => {
        currentSongIndex = (currentSongIndex + direction + playList.length) % playList.length;
        updateSongInfo();
        playSong();
    }

    elements.playPauseBtn.addEventListener("click", togglePlayPause);

    elements.progress.addEventListener("input", () => {
        elements.song.currentTime = elements.progress.value;
    })

    elements.progress.addEventListener("change", playSong);
    elements.forwardBtn.addEventListener("click", () => changeSong(1));
    elements.backwardBtn.addEventListener("click", () => changeSong(-1));

    elements.song.addEventListener("timeupdate", setProgress);
    elements.song.addEventListener("loadedmetadata", setProgressMax);

    updateSongInfo();
    
    new Swiper(".swiper", {
        effect: "coverflow",
        centeredSlides: true,
        initialSlide: 3,
        slidesPerView: "auto",
        allowTouchMove: false,
        spaceBetween: 40,
        coverflowEffect: {
            rotate: 25,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: false,
        },
        navigation: {
            nextEl: ".forward",
            prevEl : ".backward",
        },
    });
});