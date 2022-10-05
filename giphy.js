const GiphyAPI = 'https://api.giphy.com/v1/gifs/search?api_key=XEAkZeR976diLYKcNhMlxn8S9Uvbbfza&rating=pg&q=';
const GifLimit = 3;
const gifSearchResults = document.getElementById('gifSearchResult');
const GiphySearchKeywords = document.getElementById('GiphySearchKeywords');

document.getElementById('GiphySearch').addEventListener('click',getGifs);

function getGifs(e){
    e.preventDefault();
    gifSearchResults.innerHTML = "";

    const url = `${GiphyAPI}${GiphySearchKeywords.value}&limit=${GifLimit}`;
    fetch(url, { mode: "cors" })
        .then(r => r.json())
        .then(x => appendGifs(x.data))
        .catch(console.warn)
};

function appendGifs(gifs){
    for (let [index, gif] of gifs.entries()){
        let selectedGif = document.createElement('input');
        selectedGif.type = "image";
        selectedGif.name = "gif";
        selectedGif.src = gif.images.fixed_height.url;
        selectedGif.alt = `gif${index}`;
        // selectedGif.classList.add()

        //return false;" would disable image input as a submitter
        selectedGif.setAttribute('onClick', "return false;");

        gifSearchResults.appendChild(selectedGif)
    }
}


// gifSearchResults.addEventListener('click', x = console.log(x.target.src))

//

