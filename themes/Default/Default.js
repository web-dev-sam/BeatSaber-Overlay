

export default class DefaultUI {


    convertAccuracy(accuracy) {
        return (Math.round(accuracy * 100) / 100) + "%";
    }


    convertSongName(songName, el, allData) {
        if (allData.SongAuthor) {
            return `${songName} - ${allData.SongAuthor}`;
        }
        return songName;
    }


    convertMapper(mapper) {
        if (mapper)
            return `[${mapper}]`;
        return "";
    }


    convertDifficulty(difficulty) {
        return difficulty.replace("Plus", "+");
    }


    convertTimeElapsed(timeElapsed, el, allData) {
        const hours = Math.floor(timeElapsed / 3600);
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;

        let time = "";
        if (hours > 0) time += hours + ":";
        if (minutes < 10) 
            time += (hours > 0 ? "0" : "") + minutes + ":";
        else time += minutes + ":";
        if (seconds < 10) 
            time += "0" + seconds;
        else time += seconds; 

        return time;
    }


    convertStar(star) {
        return Math.round(star * 10) / 10;
    }


    updateDifficulty(difficulty) {
        document.getElementById("diff").setAttribute("diff", difficulty);
    }


    updateTimeElapsed(timeElapsed, allData) {
        if (allData.Length > 0) {
            document.getElementById("time-prog").style.width = (timeElapsed / allData.Length) * 100 + "%";
        }
    }


    updatecoverImage(coverImage) {
        const imageElement = document.getElementById("cover-img");
        if (imageElement.src !== coverImage && coverImage) {
            imageElement.src = coverImage;
        }
    }

}
