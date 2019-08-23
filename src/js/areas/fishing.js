class fishing {
    static data = null;

    static initialize(name) {
        main.transition(() => {
            // Create initial HTML
            if (fishing.get_data() == null) {
                fishing.create_elements();
            }

            // Set the game state
            main.set_state(main.states.fishing);
            // Load fishing area CSS
            css.replace(["areas/fishing"]);
            // Set the area data
            fishing.data = area_data.get(name);

            if (name == "lake") {
                new button({
                    parent: "#resource-buttons",
                    text: "Forage for worms"
                });
            }

            // Create fishing buttons
            new button({
                parent: "#resource-buttons",
                text: "Cast out line"
            });
            new button({
                parent: "#resource-buttons",
                text: "Reel in line"
            });
        });
    }

    static create_elements() {
        const parent = $("#content");

        // Create the counters section
        const counters = $("<div>")
            .attr("id", "resource-counters")
            .appendTo(parent);

        // Create the fish counters
        const fish_counters = $("<div>")
            .attr("id", "fish-counters")
            .attr("section-header", "Fish")
            .addClass("section")
            .appendTo(counters);
        // Create area headers and counter holders
        const data = area_data.get_list();
        for (const name in data) {
            const settings = data[name];

            // Create this area's counter section
            const section = $("<div>")
                .attr("id", settings.internal + "-counters")
                .appendTo(fish_counters);

            // Create the header
            const header = $("<div>")
                .addClass("counter-header centered")
                .text(settings.display)
                .appendTo(section);
            $("<div>")
                .addClass("counter-break")
                .appendTo(header);

            // Create the fish counters
            const fish_data = settings.fish;
            for (const fish_name in fish_data) {
                const fish = fish_data[fish_name];

                const fish_counter = $("<div>")
                    .addClass("counter")
                    .text(fish.display + ": ")
                    .hide()
                    .appendTo(section);
                // Create the current fish count
                $("<span>")
                    .attr("id", fish.internal + "-count")
                    .text("0")
                    .appendTo(fish_counter);
                // Create the max fish count
                $("<span>")
                    .attr("id", fish.internal + "-max")
                    .addClass("counter-max")
                    .text("/" + fish.max)
                    .hide()
                    .appendTo(fish_counter);
            }
        }
        
        // Bundle up the rest of the counters so they're stacked on top of each other
        const misc = $("<div>")
            .attr("id", "misc-counters")
            .appendTo(counters);
        for (const id of ["bait", "tackle", "boat"]) {
            $("<div>")
                .attr("id", id + "-counters")
                .attr("section-header", utils.capitalize(id))
                .addClass("section")
                .appendTo(misc);
        }

        // Create the buttons section
        $("<div>")
            .attr("id", "resource-buttons")
            .appendTo(parent);
    }

    static update() {

    }

    static create_fish_counter() {
    }

    static create_misc_counter() {

    }

    static get_data() {
        return fishing.data;
    }
}