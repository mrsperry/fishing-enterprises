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

    static loadView(id) {
        Debug.write("Modules", "Loading view '" + id + "'");
        const view = Modules.data.views[id];
        
        $("<div>")
            .addClass("module-container")
            .html(view)
            .appendTo("body");
    }
}