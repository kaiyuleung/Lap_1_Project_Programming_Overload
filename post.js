// Post Attributes
const title = document.querySelector("#journal-title");
const content = document.querySelector("#journal-content");
const icon = document.querySelector("#journal-icon");
const date = document.querySelector("#journal-date");
const idElm = document.querySelector("#journal-id");
const username = document.querySelector("#journal-username");
const postId = getId();

// Get  Id from local storage
function getId() {
	const id = localStorage.getItem("id");
	getAndSetSpecificJournal(id);
	return id;
}

getId();

function submitComment() {
	// Get Elements
	const newComment = document.querySelector("#new-comment").value;
	console.log(newComment);
	// Check character length
	if (newComment > 220)
		return window.alert("Sorry too long, enter less than 220 characters.");
	// get form data
	const commentData = {
		commentId: "",
		commentUsername: "",
		commentIcon: "",
		commentBody: newComment,
		commentDate: new Date().toLocaleDateString("en-GB"),
		commentTime: new Date().toLocaleTimeString("en-GB"),
		emoji: "",
	};

	sendCommentToBackend(commentData);
	// Reload
	setTimeout(() => {
		location.reload();
	}, 200);
}

async function sendCommentToBackend(commentData) {
	try {
		fetch(
			`https://futureproof-journal.herokuapp.com/journal/${postId}/new-comment`,
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(commentData),
			}
		);
	} catch (error) {
		console.log(error);
	}
}

async function getAndSetSpecificJournal(id) {
	const res = await fetch(
		`https://futureproof-journal.herokuapp.com/journal/${id}`
	);
	const data = await res.json();
	// append data
	title.textContent = data.title;
	content.textContent = data.content;
	icon.src = data.icon;
	date.textContent = data.time + " " + data.date;
	idElm.textContent = `ID: ${data.id}`;
	username.textContent = data.username;
	// Get all comments
	document
		.getElementById("button-addon2")
		.addEventListener("click", submitComment);
}

appendComment(postId);

async function appendComment(postId) {
	try {
		// Grab hold directory
		const res = await fetch(
			`https://futureproof-journal.herokuapp.com/journal/${postId}`
		);
		const data = await res.json();
		data.comments.length > 0 &&
			data.comments.map((comment) => {
				// Grab hold directory
				const nav = document.getElementById("scrollSpyNavDir");
				const dir = document.getElementById("scrollSpyDir");
				// Create elements
				const navA = document.createElement("a");
				const dirRow = document.createElement("div");
				const container = document.createElement("div");
				const r1 = document.createElement("div");
				const r1c1 = document.createElement("div");
				const userCard = document.createElement("div");
				const userIcon = document.createElement("img");
				const userCardBody = document.createElement("div");
				const username = document.createElement("p");
				const r1c2 = document.createElement("div");
				const content = document.createElement("p");
				const r1c3 = document.createElement("div");
				const emoji = document.createElement("img");
				const gif = document.createElement("img");
				const r2 = document.createElement("div");
				const r2c1 = document.createElement("div");
				const dope = document.createElement("button");
				const r2c2 = document.createElement("div");
				const r2c3 = document.createElement("div");
				const timeDate = document.createElement("span");
				const r2c4 = document.createElement("div");
				const id = document.createElement("span");
				// Set elements
				navA.classList.add('p-1', 'rounded');
				navA.href = `#comment${comment.commentId.substring(0, 4)}`;
				navA.textContent = `${comment.commentId.substring(0, 4)}`;
				dirRow.id = `comment${comment.commentId.substring(0, 4)}`;
				dirRow.classList.add("row", "mb-2", "px-4");
				container.classList.add("container-fluid", "comment");
				r1.classList.add("row");
				r1c1.classList.add("col-2", "py-2", "d-flex", "justify-content-center");
				userCard.classList.add("card");
				userIcon.src = comment.commentIcon;
				userIcon.classList.add("card-img-top");
				userIcon.alt = "User Icon";
				userCardBody.classList.add("card-body", "p-1", "border-top");
				username.classList.add("card-title", "m-0");
				username.textContent = comment.commentUsername;
				r1c2.classList.add("col", "m-2", "commentContent");
				content.textContent = comment.commentBody;
				r1c3.classList.add(
					"col-4",
					"py-2",
					"d-flex",
					"justify-content-between"
				);
				emoji.src = "";
				emoji.alt = "emoji";
				emoji.height = "80";
				emoji.width = "80";
				gif.src = "";
				gif.alt = "gif";
				gif.height = "80";
				gif.width = "80";
				r2.classList.add("row", "pb-2");
				r2c1.classList.add("col-2", "d-flex", "justify-content-center");
				dope.classList.add("btn", "btn-sm", "btn-outline-danger");
				dope.textContent = "DOPE";
				r2c2.classList.add(
					"col",
					"ms-2",
					"reactionCount",
					"d-flex",
					"justify-content-start"
				);
				//!comment count and dope count//
				r2c2.appendChild(document.createTextNode("Comments: 0, DOPE: 0"));
				r2c3.classList.add("col", "d-flex", "justify-content-end");
				timeDate.textContent = comment.commentTime + " " + comment.commentDate;
				r2c4.classList.add("col-1", "d-flex", "justify-content-end");
				id.textContent = `${comment.commentId.substring(0, 4)}`;

				// Append elements
				nav.after(navA);
				dir.after(dirRow);
				dirRow.appendChild(container);
				container.appendChild(r1);
				r1.appendChild(r1c1);
				r1c1.append(userCard);
				userCard.appendChild(userIcon);
				userCard.appendChild(userCardBody);
				userCardBody.appendChild(username);
				r1.appendChild(r1c2);
				r1c2.appendChild(content);
				r1.appendChild(r1c3);
				r1c3.appendChild(emoji);
				r1c3.appendChild(gif);
				container.appendChild(r2);
				r2.appendChild(r2c1);
				r2c1.appendChild(dope);
				r2.appendChild(r2c2);
				r2.appendChild(r2c3);
				r2c3.appendChild(timeDate);
				r2.appendChild(r2c4);
				r2c4.appendChild(id);
			});
	} catch (error) {
		console.log(error);
	}

	//todo Example Comment Entry
	// <div class="row mb-2 px-4">  //?dirRow//
	//     <div class="container-fluid comment">    //?container//
	//         <div class="row">    //?r1//
	//             <div class="col-2 py-2 d-flex justify-content-center">   //?r1c1//
	//                 <div class="card">  //?userCard//
	//                     <img src="./img/userlcon/defaultUser.png" class="card-img-top" alt="Default User Icon"> //?userIcon//
	//                     <div class="card-body p-1 border-top">  //?userCardBody//
	//                         <p class="card-title m-0">User1</p> //?username//
	//                     </div>
	//                 </div>
	//             </div>
	//             <div class="col m-2 commentContent">  //?r1c2//
	//                 <p>I have a nice day too!</p>  //?content//
	//             </div>
	//             <div class="col-4 py-2 d-flex justify-content-between">  //?r1c3//
	//                 <img src="" alt="emoji" height="80px" width="80px">  //?emoji//
	//                 <img src="" alt="gif" height="80px" width="80px">    //?gif//
	//             </div>
	//         </div>
	//         <div class="row pb-2">   //?r2//
	//             <div class="col-2 d-flex justify-content-center">    //?r2c1//
	//                 <button class="btn btn-sm btn-outline-danger">DOPE</button>  //?dope//
	//             </div>
	//             <div class="col ms-2 reactionCount d-flex justify-content-start">comment x DOPE y</div>  //?r2c2//
	//             <div class="col d-flex justify-content-end"> //?r2c3//
	//                 <span>14:21 03/Oct/2022</span>   //?timeDate//
	//             </div>
	//             <div class="col-1 d-flex justify-content-end"> //?r2c4//
	//                 <span>id</span>  //?id//
	//             </div>
	//         </div>
	//     </div>
	// </div>
}

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
	const post = document.getElementById("post");
	if (post.style.left ) {
		post.style.color = "grey";
		post.style.left = "unset";
		post.style.right = "1px";
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
		post.style.color = "white";
		post.style.left = "unset";
		post.style.right = "1px";
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
