

export default class UIInterface {

    constructor() {        
        this.bsrElement = document.querySelector("i.data-bsr");
        this.diffElement = document.querySelector("i.data-diff");
        this.mapTypeElement = document.querySelector("i.data-mapType");
        this.songNameElement = document.querySelector("i.data-songName");
        this.songSubNameElement = document.querySelector("i.data-songSubName");
        this.songAuthorElement = document.querySelector("i.data-songAuthor");
        this.starsElement = document.querySelector("i.data-stars");
        this.coverElement = document.querySelector("i.data-cover");
        this.lengthElement = document.querySelector("i.data-length");
        this.mapperElement = document.querySelector("i.data-mapper");
    }

    update(data) {

    }

    updateBSR(bsr) {
        document.getElementById("bsr").innerHTML = bsr;
    }

}