//
const title = document.querySelector("#journal-title");
const content = document.querySelector("#journal-content");
const icon = document.querySelector("#journal-icon");
const date = document.querySelector("#journal-date");
const idElm = document.querySelector("#journal-id");

getId();

function getId() {
	const id = localStorage.getItem("id");

	getAndSetSpecificJournal(id);
}

async function getAndSetSpecificJournal(id) {
	const res = await fetch(
		`https://futureproof-journal.herokuapp.com/journal/${id}`
	);
	const data = await res.json();
	console.log(data);
	// append data
	title.textContent = data.title;
	content.textContent = data.content;
	icon.src = data.icon;
	date.textContent = data.time + " " + data.date;
	idElm.textContent = data.id;
	// Get all comments
	document
		.getElementById("postComment")
		.addEventListener("submit", submitComment);

	function submitComment(e) {
		e.preventDefault();
		const commentData = {
			username: "User1",
			icon: "./img/userlcon/defaultUser.png",
			id: 0,
			time: new Date().toLocaleTimeString("en-GB"),
			date: new Date().toLocaleDateString("en-GB"),
			content: e.target.commentContent.value,
			emoji: e.target.emoji.value,
			// gif: e.target.
		};
		console.log("hi");
		appendComment(commentData);
	}

	function appendComment(comment) {
		// Grabhold directory
		const dir = document.getElementById("exampleComment");

		// Create elements
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
		dirRow.classList.add("row", "mb-2", "px-4");
		container.classList.add("container-fluid", "comment");
		r1.classList.add("row");
		r1c1.classList.add("col-2", "py-2", "d-flex", "justify-content-center");
		userCard.classList.add("card");
		userIcon.src = comment.icon;
		userIcon.classList.add("card-img-top");
		userIcon.alt = "User Icon";
		userCardBody.classList.add("card-body", "p-1", "border-top");
		username.classList.add("card-title", "m-0");
		username.textContent = comment.username;
		r1c2.classList.add("col", "m-2", "commentContent");
		content.textContent = comment.content;
		r1c3.classList.add("col-4", "py-2", "d-flex", "justify-content-between");
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
		r2c2.appendChild(document.createTextNode("comment x DOPE y"));
		r2c3.classList.add("col", "d-flex", "justify-content-end");
		timeDate.textContent = `${comment.time.slice(0, 5)} ${comment.date}`;
		r2c4.classList.add("col-1", "d-flex", "justify-content-end");
		id.textContent = comment.id;

		// Append elements
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
}
