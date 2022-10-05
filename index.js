document.getElementById("toPostContent").addEventListener("submit", submitPost);

async function submitPost(e) {
	// Prevent Refresh
	e.preventDefault();
	// Setting Id
	const resOne = await fetch(
		"https://futureproof-journal.herokuapp.com/journal"
	);
	const dataOne = await resOne.json();
	// Date & Time
	const date = Date.now();
	const today = new Date(date);
	const todaysDate = today.toLocaleDateString();
	const time = new Date().toLocaleTimeString();
	// New Journal
	const postData = {
		id: dataOne.length + 1,
		title: e.target.postTitle.value,
		content: e.target.postContent.value,
		username: "",
		icon: "",
		emoji: [
			{
				emojiUsed: false,
				emojiOne: 0,
			},
			{
				emojiUsed: false,
				emojiTwo: 0,
			},
			{
				emojiUsed: false,
				emojiThree: 0,
			},
		],
		gif: e.target.gif.value, //!This is the selected gif's URL
		date: todaysDate,
		time: time,
		comments: [{}],
	};
	sendToBackend(postData);
	appendPost();
	// Reload
	setTimeout(() => {
		location.reload();
	}, 200);
}

async function sendToBackend(newEntry) {
	try {
		fetch("https://futureproof-journal.herokuapp.com/journal/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newEntry),
		});
	} catch (error) {
		console.log(error);
	}
}

async function appendPost() {
	try {
		const res = await fetch(
			"https://futureproof-journal.herokuapp.com/journal"
		);
		const data = await res.json();
		data.map((post) => {
			console.log(post);
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
			const title = document.createElement("h5");
			const content = document.createElement("p");
			const r1c3 = document.createElement("div");
			const view = document.createElement("a");
			const r2 = document.createElement("div");
			const r2c1 = document.createElement("div");
			const dope = document.createElement("div");
			const r2c2 = document.createElement("div");
			const r2c3 = document.createElement("div");
			const timeDate = document.createElement("span");
			const r2c4 = document.createElement("div");
			const id = document.createElement("span");
			// Set elements
			navA.classList.add('p-1', 'rounded');
			navA.href = `#post${post.id}`;
			navA.textContent = `${post.id}`;
			dirRow.id = `post${post.id}`;
			dirRow.classList.add("row", "mb-2", "px-4");
			container.classList.add("container-fluid", "postPreview");
			r1.classList.add("row");
			r1c1.classList.add("col-2", "py-2", "d-flex", "justify-content-center");
			userCard.classList.add("card");
			userIcon.src = post.icon;
			userIcon.classList.add("card-img-top");
			userIcon.alt = "User Icon";
			userCardBody.classList.add("card-body", "p-1", "border-top");
			username.classList.add("card-title", "m-0");
			username.textContent = post.username;
			r1c2.classList.add("col-8", "py-2");
			// r1c2.style.width = "100px";
			title.textContent = post.title;
			content.textContent = post.content;
			r1c3.classList.add("col-2", "mt-2", "d-flex", "justify-content-end");
			view.setAttribute("role", "button");
			view.classList.add("btn", "btn-secondary");
			// view.href = "./post.html";
			view.style.height = "40px";
			view.appendChild(document.createTextNode("View"));
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
			r2c2.appendChild(
				document.createTextNode(
					`${post.comments.length > 1 ? "Comments: " : "Comment:"} ${
						post.comments.length
					}, DOPE: 0`
				)
			);
			r2c3.classList.add("col", "d-flex", "justify-content-end");
			timeDate.textContent = `${post.time.slice(0, 5)} ${post.date}`;
			r2c4.classList.add("col-1", "d-flex", "justify-content-end");
			id.textContent = `${post.id}`;

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
			r1c2.appendChild(title);
			r1c2.appendChild(content);
			r1.appendChild(r1c3);
			r1c3.appendChild(view);
			container.appendChild(r2);
			r2.appendChild(r2c1);
			r2c1.appendChild(dope);
			r2.appendChild(r2c2);
			r2.appendChild(r2c3);
			r2c3.appendChild(timeDate);
			r2.appendChild(r2c4);
			r2c4.appendChild(id);
			//!Somehow tell post.html which post to expect to fetch
			view.addEventListener("click", () => {
				// Store
				localStorage.setItem("id", post.id);
				// go to post.html
				setTimeout(() => {
					location.href = "post.html";
				}, 250);
			});
		});

		// todo Example appending post
		
		// <div id="scrollSpyNav" ...	//todo nav
		// <a class="p-1 rounded" href="#post0">0</a> //?navA

		// <div id="scrollSpy" ...		//todo dir
		/*<div id="post0" class="row mb-2 px-4">	//?dirRow
			<div class="container-fluid postPreview">	//?container
				<div class="row">	//?r1
					<div class="col-2 py-2 d-flex justify-content-center">	//?r1c1
						<div class="card">		//?userCard
							<img src="./img/userlcon/defaultUser.png" class="card-img-top" alt="Default User Icon">	//?userIcon
							<div class="card-body p-1 border-top">	//?userCardBody
								<p class="card-title m-0">User1</p>	//?username
							</div>
						</div>
					</div>
					<div class="col-8 py-2">	//?r1c2
						<h5>Happy Day!</h5>	//?title
						<p>Today, I ...<br>...</p>	//?content
					</div>
					<div class="col-2 mt-2 d-flex justify-content-end">	//?r1c3
						<a role="button" class="btn btn-secondary" href="./post.html" style="height:3em;">View</a>	//?view
					</div>
				</div>
				<div class="row pb-2">	//?r2
					<div class="col-2 d-flex justify-content-center">	//?r2c1
						<button class="btn btn-sm btn-outline-danger">DOPE</button>	//?dope
					</div>
					<div class="col ms-2 reactionCount d-flex justify-content-start">comment x DOPE y</div>	//?r2c2
					<div class="col d-flex justify-content-end">	//?r2c3
						<span>14:21 03/Oct/2022</span>	//?timeDate
					</div>
					<div class="col-1 d-flex justify-content-end">	//?r2c4
						<span>id</span>	//?id
					</div>
				</div>
			</div>
		</div> */
	} catch (error) {
		console.log(error);
	}
}
appendPost();

// function myFunction() {
// 	// const darkModeBtn = document.getElementById("darkModeBtn")
// 	// const element = document.body;
// 	// const toPost = document.getElementById("toPost")
// 	// element.classList.toggle("dark-mode");
// 	// toPost.classList.toggle("dark-mode")
// }
	

// //dark mode//

const darkMode = document.querySelector("#darkMode");
darkMode.addEventListener("click", () => {
	switchDarkMode();
});

function switchDarkMode() {
	const toPostTitle = document.getElementById("toPostTitle");
	
	
	const toPost = document.getElementById("toPost")
	const postPreview = document.querySelector(".postPreview")
	const firstCard = document.querySelector(".card")
	const postTitle =document.getElementById("postTitle")
	const postContent = document.getElementById("postContent")
	const reactionCount = document.querySelector(".reactionCount")
	const toPostSubmit = document.getElementById("toPostSubmit")

	if (toPostTitle.style.left === "1px") {
		toPostTitle.style.color = "grey";
		toPostTitle.style.left = "unset";
		toPostTitle.style.right = "1px";
		// borders 
		postTitle.style.border = "1px solid grey";
		postContent.style.border = "solid 1px black"
		//backgrounds
		document.body.style.backgroundColor = "tan";
		document.body.style.color = "black";

		toPost.style.backgroundColor = "lightpink";  // make a post form --- works
		postPreview.style.backgroundColor = "tan"; //ONLY 1st comment -- works
		firstCard.style.backgroundColor = "white" //only 1st card -- works 
		postTitle.style.backgroundColor = "white" //Title in "make a post"
		postContent.style.backgroundColor = "white" //share your story
		reactionCount.style.backgroundColor = "tan" //1st comment reaction count
		toPostSubmit.classList = "btn btn-outline-secondary" //submit button 

		//letters
		toPost.style.color = "black";
		postPreview.style.color = "black";
		firstCard.style.color = "black";
		postTitle.style.color = "black";
		postContent.style.color = "black"
	} else {
		toPostTitle.style.color = "white";
		toPostTitle.style.left = "1px";
		toPostTitle.style.right = "unset";
		// borders
		postTitle.style.border = "1px solid white"; //border of the to post tiltle
		postContent.style.border = "solid 1px white"
		// background colors
		document.body.style.backgroundColor = "darkgrey";
		document.body.style.color = "lightgrey";
		
		toPost.style.backgroundColor = "black"; //make a post form 
		postPreview.style.backgroundColor = "darkgrey"; // ONLY 1st comment
		firstCard.style.backgroundColor = "lightgrey" //ONLY 1st card 
		postTitle.style.backgroundColor = "black"; //title in "make a post"
		postContent.style.backgroundColor = "black" //share your story 
		reactionCount.style.backgroundColor = "darkgrey" //1st comment reaction count
		toPostSubmit.classList = "btn btn-outline-light" //submit button

		//letters
		toPost.style.color = "white";
		postPreview.style.color = "lightgrey";
		firstCard.style.color = "white";
	}
}
