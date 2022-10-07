const darkMode = document.querySelector("#darkMode");


darkMode.addEventListener("click", () => {
	switchDarkMode();
});

function switchDarkMode() {
	const frontPage = document.getElementById("frontPage");
	const username = document.getElementById("usernameInput")

	if (frontPage.style.left === "1px") {
		frontPage.style.color = "black";
		frontPage.style.left = "unset";
		frontPage.style.right = "1px";
		//backgrounds
		document.body.style.backgroundColor = "white";
		document.body.style.color = "black";
		frontPage.style.backgroundColor = "white"
		username.classList = "form-control bg-light"

	} else {
		frontPage.style.color = "white";
		frontPage.style.left = "1px";
		frontPage.style.right = "unset";
		// backgrounds
		document.body.style.backgroundColor = "lightgrey";
		document.body.style.color = "white";
		frontPage.style.backgroundColor = "darkgrey"
		username.classList = "form-control bg-dark"
	}
}
