
export default class DataPuller {


    constructor(UIInterface) {
        this.livedataUrl = "ws:127.0.0.1:2946/BSDataPuller/LiveData";
        this.mapdataUrl = "ws:127.0.0.1:2946/BSDataPuller/MapData";
        this.livedataSocket = null;
        this.mapdataSocket = null;
        this.data = {};
        this.uiInterface = new UIInterface();

        this.connectToLiveData();
        this.connectToMapData();
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


    applyData() {
        console.log(this.data);

        for (const key in this.data) {
            const element = document.querySelector(`span[data="${key}"]`);
            if (element != null) {
                const converted = this.uiInterface["convert" + key]?.(this.data[key], element, this.data);
                element.innerText = converted == null ? (this.data[key] == null ? "-" : this.data[key]) : converted;
            }

            this.uiInterface["update" + key]?.(this.data[key], this.data);
        }
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
