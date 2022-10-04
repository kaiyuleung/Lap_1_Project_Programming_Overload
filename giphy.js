"use strict";

const apiUrl = 'https://api.giphy.com/v1/gifs/search?api_key=XEAkZeR976diLYKcNhMlxn8S9Uvbbfza&rating=pg&q=';
const limitVal = 4;
const main = document.getElementById("results");
const form = document.getElementById("gifForm");
const searchInput = document.getElementById("search");

function clearPreviousResults() {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function createImages(gifs) {
    let i = 0;
    for (const gif of gifs) {

        const gifSrc = gif.images.fixed_height.url;
        const input = document.createElement("input");

        input.type = "image"
        input.name = "gif"
        input.src = gifSrc
        input.alt = "gif"
        input.id = `gif${i}`
        input.classList.add("results-gif")


        main.append(input)
        i++;
    }
}

async function getGifs(event) {
    event.preventDefault();
    clearPreviousResults();

    const searchInputValue = searchInput.value;
    const gifyUrl = `${apiUrl}${searchInputValue}&limit=${limitVal}`;
    const response = await fetch(gifyUrl, { mode: "cors" });
    const data = await response.json();
    const gifData = await data.data;

    createImages(gifData);
    searchInput.value = "";
}



document.getElementById('findGif').addEventListener('click',getGifs);

