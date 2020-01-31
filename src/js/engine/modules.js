class Modules {
    static async initialize() {
        Debug.write("Modules", "Initializing modules");
        Modules.data = {};

        // Source folders to find modules
        const sources = ["views"];

        for (const source of sources) {
            // Get the path for this data folder
            const path = "src/" + source + "/";

            // Get the manifest for this data folder
            const manifest = await $.get(path + source + ".manifest");
            Debug.write("Modules", "Found source tree for '" + source + "'");

            // Initialize this data folder's object
            Modules.data[source] = {};

            // Load all files in the manifest
            for (const file of manifest.split("\n")) {
                const fileName = file.split(".")[0];
                Modules.data[source][fileName] = await $.get(path + file);
            }
        }
    }

    static loadView(id, persistent) {
        Debug.write("Modules", "Loading view '" + id + "'");

        const loadContainer = () => {
            const view = Modules.data.views[id];
                
            const container = $("<div>")
                .html(view)
                .hide()
                .fadeIn()
                .appendTo("body");

            // Mark this container as removable
            if (persistent == false) {
                container.attr("id", "module-container");
            }
        };

        // Check if a container already exists
        const container = $("#module-container");
        if (container.length != 0) {
            // Fade out the container
            container.fadeOut(400, () => {
                loadContainer();
            });
        } else {
            loadContainer();
        }
    }
}