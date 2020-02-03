class Modules {
    static async initialize() {
        Debug.write("Modules", "Initializing modules");
        Modules.data = {};

        // Source folders to find modules
        const sources = ["views", "art", "data"];

        for (const source of sources) {
            // Get the path for this data folder
            const path = "src/" + source + "/";

            // Get the manifest for this data folder
            const manifest = await $.get(path + source + ".manifest");
            Debug.write("Modules", "Found manifest: " + source + ".manifest");

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

                const contents = await $.get(path + file);

                // Split art files into their individual assets
                if (source == "art") {
                    Modules.data.art[fileName] = {};

                    // The name of this art piece
                    let name = "";
                    // The art piece contents
                    let art = "";

                    for (const line of contents.split("\n")) {
                        // Check if this line is the ID of a new piece
                        if (line.startsWith("#")) {
                            // Make sure an empty piece is not added
                            if (name != "") {
                                Modules.data.art[fileName][name] = art;
                                
                                art = "";
                            }

                            name = line.split(":")[1].trim();
                        } else {
                            art += line;
                        }
                    }
                } else {
                    Modules.data[source][fileName] = contents;
                }
            }
        }
    }

    static loadView(id, parent, remove) {
        Debug.write("Modules", "Loading view: " + id + ".html");

        // Get the view HTML
        const view = Modules.data.views[id];

        const loadContainer = (resolve) => {
            $(view)
                .hide()
                .fadeIn()
                .appendTo(parent == null ? "#content" : parent);

            resolve();
        };

        return new Promise((resolve) => {
            if (remove != null) {
                $.when(Modules.clearElements(remove)).done(() => {
                    loadContainer(resolve);
                });
            } else {
                loadContainer(resolve);
            }
        });
    }

    static clearElements(selectors) {
        return new Promise((resolve) => {
            // Convert a single selector into an array
            if (typeof(selectors) == "string") {
                selectors = [selectors];
            }

            for (let index = 0; index < selectors.length; index++) {
                const current = selectors[index];

                const element = $(current)
                    .fadeOut(400, () => {
                        element.remove();

                        // Only resolve the promise on the last 
                        if (index == selectors.length - 1) {
                            resolve();
                        }
                    });
                }
        });
    }

    static clearModal() {
        Modules.clearElements(".modal-container");
    }

    static getArt(file, id) {
        return Modules.data.art[file][id];
    }
}