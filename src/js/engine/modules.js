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
            for (let file of manifest.split("\n")) {
                let fileName = file.split(".")[0];

                // Check if a stylesheet should be loaded with this module
                if (fileName.startsWith("+")) {
                    fileName = fileName.substring(1);
                    file = file.substring(1);

                    Debug.write("Modules", "Adding stylesheet: " + fileName + ".css");
                    // Add the stylesheet
                    $("<link>")
                        .attr("rel", "stylesheet")
                        .attr("type", "text/css")
                        .attr("href", "src/css/" + fileName + ".css")
                        .appendTo("head");
                }

                Modules.data[source][fileName] = await $.get(path + file);
            }
        }
    }

    static loadView(id, persistent) {
        Debug.write("Modules", "Loading view '" + id + "'");

        // Get the view HTML
        const view = Modules.data.views[id];

        if (persistent) {
            $(view)
                .hide()
                .fadeIn()
                .appendTo("body");
            return;
        }

        const loadContainer = () => {
            $("<div>")
                .attr("id", "module-container")
                .html(view)
                .hide()
                .fadeIn()
                .appendTo("body");
        };

        // Check if a container already exists
        const container = $("#module-container");
        if (container.length != 0) {
            // Fade out and remove the container
            container.fadeOut(400, () => {
                container.remove();

                loadContainer();
            });
        } else {
            loadContainer();
        }
    }

    static clearModal() {
        const modal = $(".modal-container")
            .fadeOut(400, () => {
                modal.remove();
            });
    }
}