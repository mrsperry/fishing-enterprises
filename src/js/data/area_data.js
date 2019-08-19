class area_data {
    static area_list = {
        lake: {
            display: "Lake"
        },
        river: {
            display: "River"
        },
        pier: {
            display: "Pier"
        },
        reef: {
            display: "Reef"
        },
        spear_fishing: {
            display: "Spear Fishing"
        },
        deep_sea: {
            display: "Deep Sea"
        }
    };

    static get_list() {
        return area_data.area_list;
    }

    static get(area) {
        return area_data.area_list[area];
    }
}