export function testImage(url, timeout=5000) {
	return new Promise((resolve, reject) => {
		let timer, img = new Image();
		img.onerror = img.onabort = () => {
			clearTimeout(timer);
			reject();
		};
		img.onload = () => {
			clearTimeout(timer);
			resolve();
		};
		timer = setTimeout(() => {
			img.src = '//!!!!/noexist.jpg';
			reject();
		}, timeout);
		img.src = url;
	});
}