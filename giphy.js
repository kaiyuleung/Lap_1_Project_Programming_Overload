const GiphyAPI = 'https://api.giphy.com/v1/gifs/search?api_key=XEAkZeR976diLYKcNhMlxn8S9Uvbbfza&rating=pg&q=';
const GifLimit = 6;
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
        // !Example
        // <div class="col">
        //     <input type="radio" id="gif1" name="gif" value="gif1">
        //     <label class="p-2 m-2" for="gif1">
        //         <img src="*" alt="gif1">
        //     </label>
        // </div>
        // <div class="col">
        //     <input type="radio" id="gif2" name="gif" value="gif2">
        //     <label class="p-2 m-2" for="gif2">
        //          <img src="*" alt="gif2">
        //     </label>
        // </div>

        let col = document.createElement('div');
        let radio = document.createElement('input');
        let label = document.createElement('label');
        let image = document.createElement('img');

        col.classList.add('col');
        radio.type = "radio";
        radio.id = `gif${index}`;
        radio.name = "gif";
        radio.value = gif.images.fixed_height_small.url;
        label.classList.add('p-2', 'm-2');
        label.setAttribute('for', `gif${index}`);
        image.src = gif.images.fixed_height_small.url;
        image.alt = `gif${index}`;

        gifSearchResult.appendChild(col);
        col.appendChild(radio);
        col.appendChild(label);
        label.appendChild(image);



        // selectedGif.setAttribute('onClick', "return false;");
        
    }
}


// gifSearchResults.addEventListener('click', x = console.log(x.target.src))

//

