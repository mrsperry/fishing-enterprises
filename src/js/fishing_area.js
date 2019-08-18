class fishing_area {
    static data = null;

    constructor(name) {
        fishing_area.data = areas.get_area_data(name);
    }

    static update() {
        console.log("fishing area update");
    }
}