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
			const dir = document.getElementById("examplePost");
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
			dirRow.id = `${post.id}`;
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
			r1c2.classList.add("col", "py-2");
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
			// dope.appendChild(document.createTextNode("DOPE"));
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
			id.textContent = post.id;

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
/* <div class="row mb-2 px-4">
    <div class="container-fluid postPreview">
        <div class="row">
            <div class="col-2 py-2 d-flex justify-content-center">
                <div class="card">
                    <img src="./img/userlcon/defaultUser.png" class="card-img-top" alt="Default User Icon">
                    <div class="card-body p-1 border-top">
                        <p class="card-title m-0">User1</p>
                    </div>
                </div>
            </div>
            <div class="col py-2">
                <h5>Happy Day!</h5>
                <p>Today, I ...<br>...</p>
            </div>
            <div class="col-2 mt-2 d-flex justify-content-end">
                <a role="button" class="btn btn-secondary" href="./post.html" style="height:3em;">View</a>
            </div>
        </div>
        <div class="row pb-2">
            <div class="col-2 d-flex justify-content-center">
                <button class="btn btn-sm btn-outline-danger">DOPE</button>
            </div>
            <div class="col ms-2 reactionCount d-flex justify-content-start">comment x DOPE y</div>
            <div class="col d-flex justify-content-end">
                <span>14:21 03/Oct/2022</span>
            </div>
            <div class="col-1 d-flex justify-content-end">
                <span>id</span>
            </div>
        </div>
    </div>
</div> */
	} catch (error) {
		console.log(error);
	}
}

appendPost();
