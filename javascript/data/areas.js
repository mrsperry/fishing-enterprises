class areas {
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

    static get_area_list() {
        return areas.area_list;
    }

    static get_area_data(area) {
        return areas.area_list[area];
    }
}