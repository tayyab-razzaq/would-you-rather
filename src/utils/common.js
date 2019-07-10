export const testImage = (url, timeout = 5000) => new Promise((resolve, reject) => {
    let timer;
    const img = new Image();
    const errorMethod = () => {
        clearTimeout(timer);
        reject();
    };
    img.onerror = errorMethod;
    img.onabort = errorMethod;
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