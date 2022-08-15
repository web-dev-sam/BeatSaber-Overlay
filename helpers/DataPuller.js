
export default class DataPuller {


    constructor(UIClass, debug) {
        this.livedataUrl = "ws:127.0.0.1:2946/BSDataPuller/LiveData";
        this.mapdataUrl = "ws:127.0.0.1:2946/BSDataPuller/MapData";
        this.livedataSocket = null;
        this.mapdataSocket = null;
        this.data = {};
        this.debug = debug;
        this.uiClass = new UIClass();

        if (this.debug == null) {
            this.connectToLiveData();
            this.connectToMapData();
        } else {
            this.receiveFakeData();
        }
    }


    connectToLiveData() {
        this.livedataSocket = new WebSocket(this.livedataUrl);
        this.connect(this.livedataSocket);
    }


    connectToMapData() {
        this.mapdataSocket = new WebSocket(this.mapdataUrl);
        this.connect(this.mapdataSocket);
    }


    connect(socket, mode) {
        socket.onopen = () => {};
        socket.onmessage = mode === "live" ? (m) => this.receiveLiveData(m) : (m) => this.receiveMapData(m);
        socket.onclose = this.reload;
        socket.onerror = this.reload;
    }


    receiveLiveData(message) {
        this.data = Object.assign(this.data, JSON.parse(message.data));
        this.applyData();
    }


    receiveMapData(message) {
        this.data = Object.assign(this.data, JSON.parse(message.data));
        this.applyData();
    }


    receiveFakeData() {
        this.data = {
            "GameVersion": "1.24.0",
            "PluginVersion": "2.0.12.0",
            "InLevel": true,
            "LevelPaused": true,
            "LevelFinished": false,
            "LevelFailed": false,
            "LevelQuit": false,
            "Hash": "85D1885E8D0290965AC49FBE0EC1CD44DED758F5",
            "SongName": "Labyrinth in Kowloon: Walled World",
            "SongSubName": "",
            "SongAuthor": "Camellia",
            "Mapper": "Shark & ThySpoon",
            "BSRKey": "1bf76",
            "coverImage": "https://eu.cdn.beatsaver.com/85d1885e8d0290965ac49fbe0ec1cd44ded758f5.jpg",
            "Length": 256,
            "TimeScale": 0,
            "MapType": "Standard",
            "Difficulty": "ExpertPlus",
            "CustomDifficultyLabel": "Maze",
            "BPM": 190,
            "NJS": 20,
            "Modifiers": {
                "noFailOn0Energy": true,
                "oneLife": false,
                "fourLives": false,
                "noBombs": false,
                "noWalls": false,
                "noArrows": false,
                "ghostNotes": false,
                "disappearingArrows": false,
                "smallNotes": false,
                "proMode": false,
                "strictAngles": false,
                "zenMode": false,
                "slowerSong": false,
                "fasterSong": false,
                "superFastSong": false
            },
            "ModifiersMultiplier": 1,
            "PracticeMode": false,
            "PracticeModeModifiers": {
                "songSpeedMul": 1,
                "startInAdvanceAndClearNotes": 0,
                "startSongTime": 0
            },
            "PP": 314.1028747558594,
            "Star": 7.28000020980835,
            "IsMultiplayer": false,
            "PreviousRecord": 1573611,
            "PreviousBSR": null,
            "unixTimestamp": 1660560799283,
            "Score": 208035,
            "ScoreWithMultipliers": 208035,
            "MaxScore": 0,
            "MaxScoreWithMultipliers": 0,
            "Rank": "SS",
            "FullCombo": true,
            "Combo": 240,
            "Misses": 0,
            "Accuracy": 97.83482551574707,
            "BlockHitScore": [
                0,
                0,
                0
            ],
            "PlayerHealth": 100,
            "ColorType": 0,
            "TimeElapsed": 54,
            "EventTrigger": 3
        };
        this.applyData();
    }


    applyData() {
        console.log(this.data);

        for (const key in this.data) {
            const element = document.querySelector(`span[data="${key}"]`);
            if (element != null) {
                const converted = this.uiClass["convert" + key]?.(this.data[key], element, this.data);
                element.innerText = converted == null ? (this.data[key] == null ? "-" : this.data[key]) : converted;
            }

            this.uiClass["update" + key]?.(this.data[key], this.data);
        }

        document.getElementById("overlay-wrapper").style.opacity = 1;
    }


    /**
     * @deprecated
     */
    reload() {
        document.body.innerHTML = "";
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    }
}
