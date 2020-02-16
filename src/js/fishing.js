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
                const fish = area.fish[key];
                Utils.createCounter(fish, section);

                // Set default fish values
                fish.count = 0;
                fish.total = 0;
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

    static catchFish(fish) {
        // Check if the fish passes the random check
        if (Utils.random(0, 100) > fish.chance) {
            return;
        }

        // Check if there is room
        if (fish.count == fish.max) {
            return;
        }

        // Check if there is a prerequisite fish and if it has been caught
        if (fish.after != null) {
            if (!Modules.getAreasAsObject()[Areas.currentArea].fish[fish.after].caught) {
                return;
            }
        }

        const resources = Modules.getResourcesAsObject();
        // Check if there is enough bait and tackle
        for (const type of ["bait", "tackle"]) {
            if (fish[type] == null) {
                continue;
            }

            for (const resource of fish[type]) {
                if (resources[type][resource.type].count < resource.amount) {
                    return;
                }
            }
        }

        // Add the fish
        const amount = Utils.random(1, fish["max-caught"] == null ? 1 : fish["max-caught"]);
        fish.count += amount;
        fish.caught = true;
        
        // Update the counters
        $("#" + fish.internal + "-count")
            .text(fish.count);

        Debug.write("Fishing", "Caught " + amount + " " + fish.internal);
    }
}