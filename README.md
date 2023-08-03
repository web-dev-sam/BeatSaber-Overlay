# Simple & themeable Beatsaber Overlay

&nbsp;

## How To
Make sure you have the mod DataPuller installed. If you are a streamer just use the following url as a source in obs or other streaming programs: https://beat-saber-overlay-f9wzhc7zt-webedy.vercel.app/overlay.html. Or If you want to use another Theme just include it in the url like this: https://beat-saber-overlay-f9wzhc7zt-webedy.vercel.app/overlay.html?theme=Moonlit.

Overview of all themes with pictures is coming soon. Currently there are two themes available: `Default` & `Moonlit`.

&nbsp;

## What is different?
* Specially made for easy development of new themes by other devs. No node stuff, no overengineering.
* You are welcome to contribute your own themes, feel free to open a pull request.

&nbsp;

## How can I develop my own theme?
1. Create a folder for your own theme under `themes/`. And add the corresponding HTML, JS and CSS files.
2. Make sure your folder and files have the same name.
3. Register your theme in the `index.js` file by adding it to the `THEMES` constant.
4. Start your VSCode Live Server (Its an extension for VSCode).
5. Start beatsaber and playing a replay or something when developing your theme under https://beat-saber-overlay-f9wzhc7zt-webedy.vercel.app/overlay.html?theme=YourThemeName
6. Have fun designing and creating your theme!

&nbsp;

## How theme development is designed:
* `YourTheme.html`: This contains only the HTML you need for your overlay. Use the `<span data="Accuracy"></span>` element to inject beatsaber data into your HTML. Check the console logs to see what data you can work with.
* `YourTheme.css`: This contains only the CSS you need for your overlay
* `YourTheme.js`: This file is used when...
  * you want to change/format the values you get from BeatSaber (example for accuracy: `91.2345678 -> "91.23%"`)
  * you want to execute any JS after an update of a value
The best way to understand is by looking at already existing themes.

