const delayPromis = (delay: number) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve("yo");
		}, delay * 1000);
	});

export const generateRandom = () => {};

export const visualizeChange = async (
	txt: string,
	patt: string,
	updatePattern: any,
	delay: number
) => {
	const pattern = patt.split("");
	const text = txt.split("");
	const M = patt.length;
	const N = txt.length;
	const temp = [];
	const searchBox = document.getElementById("search-box");
	const patternFoundCounter = document.getElementById(
		"pattern-found-counter"
	);
	for (let i = 0; i <= N - M; i++) {
		let j;
		searchBox!.style.left = `${2 * i + i * 0.5 + 1}rem`;
		for (j = 0; j < M; j++) {
			if (text[i + j] != pattern[j]) {
				searchBox!.style.width = `${0.5 * 0 + (0 + 1) * 2}rem`;
				break;
			}
			searchBox!.style.width = `${0.5 * j + (j + 1) * 2}rem`;

			await delayPromis(delay);
		}

		if (j == M) {
			temp.push({ start: i, end: M - 1 });
			patternFoundCounter!.innerHTML = temp.length;
			updatePattern([...temp]);
		}
		await delayPromis(delay);
	}
};
