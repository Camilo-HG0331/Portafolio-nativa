const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Replace .box img styles to include aspect-ratio and object-fit
const boxImgRegex = /\.box img \{([^}]+)\}/;
if (css.match(boxImgRegex)) {
    const newStyle = `.box img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}`;
    css = css.replace(boxImgRegex, newStyle);
    fs.writeFileSync('css/style.css', css);
    console.log("CSS updated");
} else {
    console.log("Regex not matched");
}
