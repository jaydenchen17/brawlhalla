---
toc: false
comments: true
layout: post
title: LeBron Soundboard
type: tangibles
courses: { compsci: {week: 1} }
permalink: /LEBONBONsound
---

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>What's Your Favorite LeBonBon?</title>
<style>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        padding: 0;
    }
    
    button {
        border: none;
        margin: 10px; /* Adjust the spacing between buttons */
    }
    
    img {
        width: 150px;  Adjust the width of the images */
        height: auto;
    }

    img:hover {
        transform: scale(1.1); /* Increase size on hover */
    }
</style>
</head>
<body>

<!-- Buttons to play sounds -->
<button onclick="playSound('audio/LeBron😆.mp3')">
    <img src="images/sunshine.png" alt="LeBonBon">
</button>

<button onclick="playSound('audio/ervil-lebaronsound.mp3')">
    <img src="images/evril-lebaron.jpeg" alt="Evril LeBaron">
</button>

<button onclick="playSound('audio/leshiesty.mp3')">
    <img src="images/leshiesty.png" alt="LeShiesty">
</button>

<button onclick="playSound('audio/LeBollywood.mp3')">
    <img src="images/lebollywood.png" alt="LeIndian">
</button>

<button onclick="playSound('audio/LeEmo.mp3')">
    <img src="images/LeEmo.png" alt="LeMetal">
</button>

<button onclick="playSound('audio/LeEgyptian.mp3')">
    <img src="images/LeEgyptian.png" alt="LeEgyptian">
</button>

<button onclick="playSound('audio/lecowboy.mp3')">
    <img src="images/LeCowboy.png" alt="LeCowboy">
</button>

<button onclick="playSound('audio/lechoir.mp3')">
    <img src="images/lechoir.png" alt="LeChoir">
</button>

<button onclick="playSound('audio/LeBrazil.mp3')">
    <img src="images/lebrazil.png" alt="LeBrazil">
</button>

<!-- JavaScript to play sound -->
<script>
var currentlyPlaying = null;

function playSound(soundFile) {
    if (currentlyPlaying) {
        currentlyPlaying.pause();
    }
    var audio = new Audio(soundFile);
    audio.play();
    currentlyPlaying = audio;
}
</script>

</body>
</html>
