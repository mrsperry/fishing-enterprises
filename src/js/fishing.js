class Fishing {
    static initialize() {
        Fishing.isFishing = Fishing.toggleLine(false);
        Fishing.interval = null;

        const parent = $("#fishing-fish-counters");

        for (const area of Modules.getAreas()) {
            const section = $("<div>")
                .attr("id", area.internal + "-fishing-counters")
                .addClass("fishing-counter-section")
                .hide()
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
                Utils.createCounter(fish, section, true);

                // Set default fish values
                fish.count = 0;
                fish.total = 0;
            }
        }

        for (const key of ["bait", "tackle"]) {
            const section = $("#fishing-" + key + "-counters");

            for (const value of Modules.getResources(key)) {
                Utils.createCounter(value, section, true);

                // Set default bait and tackle values
                value.count = 0;
                value.total = 0;
                value.purchased = false;
            }
        }

        Modules.loadView("fishing/area-selector", "#fishing-counters", false);
    }

    static toggleLine(state) {
        Fishing.isFishing = state;
        Debug.write("Fishing", "Fishing state: " + state);

        $("#cast-out-line-button")
            .prop("disabled", state);
        $("#reel-in-line-button")
            .prop("disabled", !state);

        if (state) {
            Fishing.interval = window.setInterval(Fishing.catchFish, 1250);
            Messenger.write("You cast out your line as far as your arm permits");
        } else {
            window.clearInterval(Fishing.interval);
            Messenger.write("You reel your line in")
        }
    }

    static catchFish() {
        const areas = Modules.getAreasAsObject();
        const area = areas[Areas.getCurrentArea()];
        const fish = Utils.randomObject(area.fish);
        
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
            if (!areas[Areas.getCurrentArea()].fish[fish.after].caught) {
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
                // Edge case for minnows as they are used as bait but can be caught
                if (resource.type == "minnows") {
                    if (areas["lake"].fish.minnows.count < resource.amount) {
                        return;
                    } else {
                        continue;
                    }
                }

                if (resources[type][resource.type].count < resource.amount) {
                    return;
                }
            }
        }

        // Add the fish
        const amount = Utils.random(1, fish["max-caught"] == null ? 1 : fish["max-caught"]);
        fish.count += amount;

        if (!fish.caught) {
            Messenger.write(fish.display + ": " + fish.message);
        }
        fish.caught = true;
        
        // Update area section
        $("#" + area.internal + "-fishing-counters")
            .fadeIn();

        // Update counters
        $("#" + fish.internal + "-counter")
            .fadeIn();
        const fishCount = $("#" + fish.internal + "-count")
            .text(fish.count);

        if (fish.count == fish.max) {
            fish["show-max"] = true;

            fishCount.addClass("fishing-max");
            $("#" + fish.internal + "-max")
                .fadeIn();
        }

        Debug.write("Fishing", "Caught " + amount + " " + fish.internal);
    }
}