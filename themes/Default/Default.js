import { autoConvert } from "../../helpers/General.js";

export default class DefaultUI {


    convertAccuracy(accuracy) {
        return autoConvert("2AfterComma", accuracy) + "%";
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
        return autoConvert("diff", difficulty);
    }


    convertTimeElapsed(timeElapsed) {
        return autoConvert("time", timeElapsed);
    }


    convertStar(star) {
        return autoConvert("1AfterComma", star);
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
