class area_data {
    static area_list = {
        lake: {
            internal: "lake",
            display: "Lake"
        },
        river: {
            internal: "river",
            display: "River"
        },
        pier: {
            internal: "pier",
            display: "Pier"
        },
        reef: {
            internal: "reef",
            display: "Reef"
        },
        spear_fishing: {
            internal: "spear-fishing",
            display: "Spear Fishing"
        },
        deep_sea: {
            internal: "deep-sea",
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