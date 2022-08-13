

import DataPuller from './interfaces/DataPuller.js';
import DefaultUI from './themes/Default/Default.js';

export const Themes = {
    Default: DefaultUI,
};


export function start(theme, uiInterface) {
    fetch(`themes/${theme}/${theme}.html`)
        .then(response => response.text())
        .then(html => {
            document.body.innerHTML = html;
        })
        .then(() => {
            const css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = `themes/${theme}/${theme}.css`;
            document.head.appendChild(css);
        })
        .then(() => {
            const js = document.createElement("script");
            js.src = `themes/${theme}/${theme}.js`;
            js.type = "module";
            document.body.appendChild(js);
        }).finally(() => {
            new DataPuller(uiInterface);   
        });
}
