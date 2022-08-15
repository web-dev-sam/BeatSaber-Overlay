
/**
 * Returns the GET parameter with the given name.
 */
export function getParam(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * 
 * @param {String} converter The name of the converter to use.
 * @description Available converters:
 * - `1AfterComma`: Converts a number to a string with 1 decimal place after the comma.
 * - `2AfterComma`: Converts a number to a string with 2 decimal places after the comma.
 * - `3AfterComma`: Converts a number to a string with 3 decimal places after the comma.
 * - `time`: Converts seconds to a string with the time format HH:MM:SS.
 * - `diff`: Converts the difficulty to show "Expert+" instead of "ExpertPlus".
 */
export function autoConvert(converter, ...args) {
    const converters = {
        "1AfterComma": v => Math.round(v * 10) / 10,
        "2AfterComma": v => Math.round(v * 100) / 100,
        "3AfterComma": v => Math.round(v * 1000) / 1000,
        "time": function (totalSeconds) {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            let time = "";
            if (hours > 0) time += hours + ":";
            if (minutes < 10) 
                time += (hours > 0 ? "0" : "") + minutes + ":";
            else time += minutes + ":";
            if (seconds < 10) 
                time += "0" + seconds;
            else time += seconds; 

            return time;
        },
        "diff": function (difficulty) {
            return difficulty.replace("Plus", "+");
        }
    }
    return converters[converter](...args);
}
