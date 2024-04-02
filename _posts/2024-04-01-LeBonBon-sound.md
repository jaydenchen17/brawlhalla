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
        width: 200px;  Adjust the width of the images */
        height: auto;
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

<!-- JavaScript to play sound -->
<script>
function playSound(soundFile) {
    var audio = new Audio(soundFile);
    audio.play();
}
</script>

</body>
</html>
