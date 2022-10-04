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
}
