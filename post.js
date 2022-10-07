document.getElementById('GiphySearch').addEventListener('click',x =>{
	setTimeout(() => {
		for (const radio of document.querySelectorAll('input[name="gif"]')){
				radio.addEventListener('click', e => {
					const gifPreview = document.getElementById("gifPreview");
					gifPreview.src = gifPreview.src.slice(0,4) == "http" ? e.target.value : "./img/gifNotFound.jpg";
				})
			}
	}, 200);
});

// Post Attributes
const title = document.querySelector("#journal-title");
const content = document.querySelector("#journal-content");
const icon = document.querySelector("#journal-icon");
const date = document.querySelector("#journal-date");
const idElm = document.querySelector("#journal-id");
const username = document.querySelector("#journal-username");
const postId = getId();
const postGif = document.getElementById('postGif');

// Get Id from local storage
function getId() {
	const id = localStorage.getItem("id");
	getAndSetSpecificJournal(id);
	return id;
}

getId();

function submitComment(e) {
	// Prevent Refresh
	e.preventDefault();
	// Get Elements
	const newComment = document.querySelector("#new-comment").value;
	// Check character length
	if (newComment.length > 220)
		return window.alert("Sorry too long, enter less than 220 characters.");
	// get form data
	const commentData = {
		commentId: "",
		commentUsername: "",
		commentIcon: "",
		commentBody: newComment,
		commentDate: new Date().toLocaleDateString("en-GB"),
		commentTime: new Date().toLocaleTimeString("en-GB"),
		gif: e.target.gif.value,
		like: 0,
		dislike: 0,
	};

	sendCommentToBackend(commentData);
	// Reload
	setTimeout(() => {
		location.reload();
	}, 200);
}

async function sendCommentToBackend(commentData) {
	try {
		await fetch(
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
	idElm.textContent = `${data.id}`;
	username.textContent = data.username;
	postGif.src = data.gif.slice(0,4) == "http" ? data.gif : "./img/gifNotFound.jpg";
	document.getElementById("commentCount").textContent = `Comments ${data.comments.length}`;
	document.getElementById("emojiOneCount").textContent = `😀 ${data.emojiOne}`;
	document.getElementById("emojiOneCount").setAttribute('data-id', postId);
	document.getElementById("emojiTwoCount").textContent = `🔥 ${data.emojiTwo}`;
	document.getElementById("emojiTwoCount").setAttribute('data-id', postId);
	document.getElementById("emojiThreeCount").textContent = `❤ ${data.emojiThree}`;
	document.getElementById("emojiThreeCount").setAttribute('data-id', postId);
	// Get all comments
	// document
	// 	.getElementById("button-addon2")
	// 	.addEventListener("click", submitComment);
	document.getElementById("postComment").addEventListener('submit',submitComment);
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
			data.comments.map((comment,index) => {
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
				const commentIDGif = document.createElement("img");
				const r2 = document.createElement("div");
				const r2c1 = document.createElement("div");
				const r2c2 = document.createElement("div");
				const like = document.createElement("button");
				const dislike = document.createElement("button");
				const r2c3 = document.createElement("div");
				const timeDate = document.createElement("span");
				const r2c4 = document.createElement("div");
				const id = document.createElement("span");
				// Set elements
				navA.classList.add('p-1', 'rounded');
				navA.href = `#comment${index}`;
				navA.textContent = `${index}`;
				dirRow.id = `comment${index}`;
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
				r1c3.classList.add("col-4", "py-2", "d-flex", "justify-content-between");
				commentIDGif.id = `comment${index}Gif`;
				commentIDGif.classList.add('img-thumbnail');
				commentIDGif.src = comment.gif.slice(0,4) == "http" ? comment.gif : "./img/gifNotFound.jpg";
				commentIDGif.alt = "Gif Preview";
				r2.classList.add("row", "pb-2");
				r2c1.classList.add('col-2');
				r2c2.classList.add("col-4", "d-flex", "justify-content-around");
				like.classList.add("btn", "btn-sm", "btn-outline-primary", "like-btn");
				like.setAttribute('data-id', `${comment.commentId}`);
				like.textContent = `Likes ${comment.like}`;
				dislike.classList.add("btn", "btn-sm", "btn-outline-secondary", "dislike-btn");
				dislike.setAttribute('data-id', `${comment.commentId}`);
				dislike.textContent = `Dislikes ${comment.dislike}`;
				r2c3.classList.add("col", "d-flex", "justify-content-end");
				timeDate.textContent = comment.commentTime + " " + comment.commentDate;
				r2c4.classList.add("col-1", "d-flex", "justify-content-end");
				id.textContent = `${index}`;

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
				r1c3.appendChild(commentIDGif);
				container.appendChild(r2);
				r2.appendChild(r2c1);
				r2.appendChild(r2c2)
				r2c2.appendChild(like);
				r2c2.appendChild(dislike);
				r2.appendChild(r2c3);
				r2c3.appendChild(timeDate);
				r2.appendChild(r2c4);
				r2c4.appendChild(id);
			});
	} catch (error) {
		console.log(error);
	}

	//todo Example Comment Entry

	// <span id="scrollSpyNavDir"></span>	//todo nav
	// <a class="p-1 rounded" href="#post0">0</a> //?navA

	// <span id="scrollSpyDir"></span>		//todo dir
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
	// 				<img id="commentIDGif" class="img-thumbnail" src="./img/gifNotFound.jpg" alt="Gif Preview">	//?commentIDGif
	//             </div>
	//         </div>
	//         <div class="row pb-2">   //?r2//
	//             <div class="col-2"></div>    //?r2c1//
	// 				<div class="col-4 d-flex justify-content-around">	//?r2c2
	// 					<button class="btn btn-sm btn-outline-primary like-btn" data-id="ID">Likes x</button>	//?like
	// 					<button class="btn btn-sm btn-outline-secondary dislike-btn" data-id="ID">Dislikes y</button>	//?dislike
	// 				</div>
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


//Emojis Update
for (let emoji of ["One", "Two", "Three"]){
	setTimeout(() => {
		const emojiBtn = document.querySelectorAll(`.emoji${emoji}-btn`);
		emojiBtn.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const id = e.target.getAttribute("data-id");
				emojiIncrementor(id, emoji);
			});
		});
	}, 500);
}
	

async function emojiIncrementor(id, emoji) {
	try {
		await fetch(
			`https://futureproof-journal.herokuapp.com/journal/${id}/emoji${emoji}`
		);
		setTimeout(() => {
			location.reload();
		}, 200);
	} catch (error) {}
}

//Like/Dislike Update
for (let reaction of ["like", "dislike"]){
	setTimeout(() => {
		const reactionBtn = document.querySelectorAll(`.${reaction}-btn`);
		reactionBtn.forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const id = e.target.getAttribute("data-id");
				reactionIncrementor(id, reaction);
			});
		});
	}, 500);
}
	

async function reactionIncrementor(id, reaction) {
	try {
		console.log(id,reaction);
		await fetch(
			`https://futureproof-journal.herokuapp.com/journal/${id}/${reaction}`
		);
		setTimeout(() => {
			location.reload();
		}, 200);
	} catch (error) {}
}


const darkMode = document.querySelector("#darkMode");


darkMode.addEventListener("click", () => {
	switchDarkMode();
});

function switchDarkMode() {
	const post = document.getElementById("post");
	const card = document.querySelector(".card")
	const commentSection = document.getElementById("commentSection")
	const submitBtn = document.getElementById("button-addon2")
	const newComment = document.getElementById("new-comment")
	const postContent = document.getElementById("postContent")


	if (post.style.left === "1px") {
		post.style.color = "grey";
		post.style.left = "unset";
		post.style.right = "1px";

		//body
		document.body.style.backgroundColor = "white";
		document.body.style.color = "black";

		// borders 
		postContent.style.border = "solid 1px black";

		//backgrounds
		post.style.backgroundColor = "pink";
		card.style.backgroundColor = "white";
		commentSection.style.backgroundColor = "white";
		submitBtn.classList = "btn btn-outline-secondary";
		newComment.style.backgroundColor = "white";

		//letters
		postContent.style.color = "black";

	} else {
		post.style.color = "white";
		post.style.left = "1px";
		post.style.right = "unset";

		//body
		post.style.backgroundColor = "black";
		document.body.style.backgroundColor = "grey";
		document.body.style.color = "black";
		submitBtn.classList = "btn btn-outline-light";

		// borders
		postContent.style.border = "solid 1px white";

		// background colors
		post.style.backgroundColor = "black"
		card.style.backgroundColor = "lightgrey";
		commentSection.style.backgroundColor = "darkgrey";
		newComment.style.backgroundColor = "black";
		
		//letters
		postContent.style.color = "white";
	}
}
