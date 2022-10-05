const darkMode = document.querySelector("#darkMode");
const toPost = document.getElementById("toPost")
const toPostContent = document.getElementById("toPostContent")
// const mainPage = document.getElementById("mainPage")
const postPreview = document.querySelector(".postPreview")
const firstCard = document.querySelector(".card")
const anyInput = document.querySelector(".input-group")
const postTitle =document.getElementById("postTitle")
const postContent = document.getElementById("postContent")
const userInfoCard = document.getElementById("userInfoCard")
const reactionCount = document.querySelector(".reactionCount")
const cardTitle = document.querySelector(".card-body")
const toPostSubmit = document.getElementById("toPostSubmit")
const exampleCard = document.getElementById("exampleCard")

darkMode.addEventListener("click", () => {
	switchDarkMode();
});

function switchDarkMode() {
	const toPostTitle = document.getElementById("frontPage");
	if (frontPage.style.left === "1px") {
		frontPage.style.color = "grey";
		frontPage.style.left = "unset";
		frontPage.style.right = "1px";
		// borders 
		postTitle.style.border = "1px solid white";
		//backgrounds
		document.body.style.backgroundColor = "white";
		document.body.style.color = "black";
		toPost.style.backgroundColor = "lightpink";  // make a post form --- works
		// toPostContent.style.backgroundColor = "#red"; //not working
		postPreview.style.backgroundColor = "white"; //ONLY 1st comment -- works
		firstCard.style.backgroundColor = "white" //only 1st card -- works 
		postTitle.style.backgroundColor = "white" //Title in "make a post"
		postContent.style.backgroundColor = "white" //share your story
		reactionCount.style.backgroundColor = "white" //1st comment reaction count
		exampleCard.style.backgroundColor = "white"
		toPostSubmit.classList = "btn btn-outline-secondary" //submit button 
		// appendPost.backgroundColor = "white"

		//letters
		toPost.style.color = "black";
		postPreview.style.color = "black";
		firstCard.style.color = "black";
		postTitle.style.color = "black";
		postContent.style.color = "black"
	} else {
		frontPage.style.color = "white";
		frontPage.style.left = "1px";
		frontPage.style.right = "unset";
		// styles
		document.body.style.backgroundColor = "darkgrey";
		document.body.style.color = "grey";
		// searchBar.style.color = "white";
		postTitle.style.border = "1px solid white"; //border of the to post tiltle
		toPost.style.backgroundColor = "black"; //make a post form 
		// toPostContent.style.backgroundColor = "#orange"; //not working
		postPreview.style.backgroundColor = "black"; // ONLY 1st comment
		firstCard.style.backgroundColor = "lightgrey" //ONLY 1st card 
		postTitle.style.backgroundColor = "black"; //title in "make a post"
		postContent.style.backgroundColor = "black" //share your story 
		postContent.style.border = "solid 1px white"
		reactionCount.style.backgroundColor = "grey" //1st comment reaction count
		exampleCard.style.backgroundColor = "lightgrey" //example card
		toPostSubmit.classList = "btn btn-outline-light" //submit button
		// appendPost.backgroundColor = "black"


		toPost.style.color = "white";
		postPreview.style.color = "white";
		firstCard.style.color = "white";
		// postContent.style.color = "purple"
		// postTitle.style.color = "purple"
		// anyInput.style.color = "orange";
	}
}
