class fishing_area {
    static data = null;

    static initialize(name) {
        main.transition(() => {
            // Create initial HTML
            if (fishing_area.get_data() == null) {
                fishing_area.create_elements();
            }

            // Set the game state
            main.set_state(main.states.fishing);
            // Load fishing area CSS
            css.load(["fishing_areas"]);
            // Set the area data
            fishing_area.data = area_data.get(name);

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
        $("<div>")
            .attr("id", "resource-counters")
            .appendTo(parent);
        $("<div>")
            .attr("id", "resource-buttons")
            .appendTo(parent);
    }

    static update() {

    }

    static get_data() {
        return fishing_area.data;
    }
}