document.addEventListener("DOMContentLoaded", function() {
    // Get all the audio elements
    var audioElements = document.querySelectorAll(".audiosources audio");
    var images = document.querySelectorAll(".genre-box img");
    var playPauseButton = document.getElementById("playPauseButton");
    var volumeSlider = document.getElementById("volumeSlider");
    var progressBar = document.getElementById("progressBar");
    var currentAudio; // To keep track of the currently playing audio
    var recentlyPlayedList = document.getElementById("recentlyPlayedList");
    var recentlyPlayed = []; // Array to keep track of recently played songs

    images.forEach(function(image, index) {
        image.addEventListener("click", function() {
            // Pause all audio elements
            audioElements.forEach(function(audio) {
                audio.pause();
            });

            var audio = audioElements[index];
            togglePlay(audio);
            currentAudio = audio;
            updateRecentlyPlayed(audio);
        });
    });

    playPauseButton.addEventListener("click", function() {
        if (currentAudio) {
            togglePlay(currentAudio);
        }
    });

    volumeSlider.addEventListener("input", function() {
        if (currentAudio) {
            currentAudio.volume = volumeSlider.value;
        }
    });

    progressBar.addEventListener("click", function(event) {
        if (currentAudio) {
            var pos = (event.offsetX / progressBar.offsetWidth) * currentAudio.duration;
            currentAudio.currentTime = pos;
        }
    });

    function togglePlay(audio) {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i class="bi bi-play-fill"></i>';
        }
    }

    setInterval(updateProgressBar, 500); // Update progress bar every 500 milliseconds

    function updateProgressBar() {
        if (currentAudio && !currentAudio.paused) {
            var progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressBar.value = progress;
        }
    }

    function updateRecentlyPlayed(audio) {
        // Add the played song to the recently played list
        if (recentlyPlayed.includes(audio)) {
            // Remove the previously played instance of the same song
            var index = recentlyPlayed.indexOf(audio);
            recentlyPlayed.splice(index, 1);
        } else if (recentlyPlayed.length === 3) {
            // If there are already 3 songs, remove the oldest one
            recentlyPlayed.shift();
        }
        recentlyPlayed.push(audio);

        // Update the Recently Played list in the HTML
        recentlyPlayedList.innerHTML = ""; // Clear the list
        recentlyPlayed.forEach(function(recentlyPlayedAudio) {
            var listItem = document.createElement("li");
            listItem.textContent = recentlyPlayedAudio.getAttribute("id");
            recentlyPlayedList.appendChild(listItem);
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    var toggleMenuButton = document.getElementById("toggleMenuButton");
    var menuSide = document.querySelector(".menu_side");

    toggleMenuButton.addEventListener("click", function() {
        menuSide.classList.toggle("collapsed");
    });
});
