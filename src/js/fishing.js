class Fishing {
    static initialize() {
        const parent = $("#fishing-fish-counters");

        for (const area of Modules.getAreas()) {
            const section = $("<div>")
                .attr("id", area.internal + "-fishing-counters")
                .addClass("fishing-counter-section")
                .appendTo(parent);

            const header = $("<div>")
                .addClass("fishing-section-header centered border-bottom")
                .text(area.display + " (")
                .appendTo(section);
            $("<span>")
                .attr("id", area.internal + "-caught-counter")
                .text("0")
                .appendTo(header);
            $("<span>")
                .attr("id", area.internal + "-caught-max")
                .text("/" + Object.keys(area.fish).length + ")")
                .appendTo(header);

            if (area.internal != "lake") {
                header.addClass("border-top");
            }

            for (const key in area.fish) {
                Utils.createCounter(area.fish[key], section);
            }
        }

        for (const key of ["bait", "tackle"]) {
            const section = $("#fishing-" + key + "-counters");

            for (const value of Modules.getResources(key)) {
                Utils.createCounter(value, section);
            }
        }

        Modules.loadView("fishing/area-selector", "#fishing-counters", false);
    }
}