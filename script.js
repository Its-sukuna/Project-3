const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
	{
		album: "Clouds",
		emblem: "unbelievable yes yes unconvincible",
		"bg-color": ["#bcd4e6", "#0D1827"],
		"accent-color": "#a1caf1",
		url: "https://s11279.pcdn.co/wp-content/uploads/2021/03/clouds-1024x1024.jpg",
		spotify:
			"https://open.spotify.com/embed/track/1mvI5pGoh84IiFSbWxEkGH?utm_source=generator"
	},
    {
		album: "3 A.M.",
		emblem: "yes i ain't what you want no more",
		"bg-color": ["#536872", "#0D1827"],
		"accent-color": "#91a3b0",
		url:
			"https://i.ytimg.com/vi/Z2VLOkCSoX8/maxresdefault.jpg",
		spotify:
			"https://open.spotify.com/embed/track/1CDPxTsKRhI0wWel01w4Vy?utm_source=generator"
	},
	{
		album: "The Search",
		emblem: "thoughts tellin' me i'm lost gettin' too loud",
		"bg-color": ["#b2beb5", "#0D1827"],
		"accent-color": "#848482",
		url: "https://wallpapercave.com/wp/wp4640542.jpg",
		spotify:
			"https://open.spotify.com/embed/track/3oLe5ZILASG8vU5dxIMfLY?utm_source=generator"
	},
	{
		album: "Wait",
		emblem: "what you thinking? what you thinking?",
		"bg-color": ["#8fbc8f", "#0D1827"],
		"accent-color": "#a3c1ad",
		url:
			"https://i.pinimg.com/originals/18/1e/11/181e11917177e1844cc26c31bc56b2ad.jpg",
		spotify:
			"https://open.spotify.com/embed/track/7EQBIAZHD2QAh9sgtjZJgI?utm_source=generator"
	},
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
	}
};
let index = 0;

const updateDisplay = (index) => {
	let DELIMITER = "";

	const album = albums[index];

	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = index + 1;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	if (index === 3) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	heroDiv.classList.add("album-transition");
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(index);