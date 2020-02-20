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
                if (source == "art") {
                    Modules.loadArt(contents, fileName);
                } else {
                    Modules.data[source][fileName] = contents;
                }
            }
        }
    }

    static loadArt(contents, fileName) {
        Modules.data.art[fileName] = {};

        // The name of this art piece
        let name = "";
        // The art piece contents
        let art = "";

        const lines = contents.split("\n");
        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];

            // Check if this line is the ID of a new piece
            if (line.startsWith("#")) {
                // Make sure an empty piece is not added
                if (name != "") {
                    Modules.data.art[fileName][name] = art.substring(0, art.length - 2);
                    
                    art = "";
                }

                name = line.split(":")[1].trim();
            } else {
                art += line;
            }

            // Add the final art piece in the file
            if (index == lines.length - 1) {
                Modules.data.art[fileName][name] = art.substring(0, art.length - 2);
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
            if (remove) {
                $.when(Modules.clearElements(remove)).done(() => {
                    loadContainer(resolve);
                });
            } else {
                loadContainer(resolve);
            }
        });
    }

    static loadCSS(path) {
        Debug.write("Modules", "Loading CSS: " + path + ".css");

        $("<link>")
            .attr("rel", "stylesheet")
            .attr("type", "text/css")
            .attr("href", "src/css/" + path + ".css")
            .addClass("temp-css")
            .appendTo("head");
    }

    static clearElements(selectors) {
        return new Promise((resolve) => {
            // Convert a single selector into an array
            if (typeof(selectors) == "string") {
                selectors = [selectors];
            }

            for (let index = 0; index < selectors.length; index++) {
                const current = selectors[index];

                for (const selected of $(current)) {
                    $(selected).fadeOut(400, () => {
                        $(selected).remove();

                        // Only resolve the promise on the last 
                        if (index == selectors.length - 1) {
                            resolve();
                        }
                    });
                }
            }
        });
    }

    static clearModal() {
        Modules.clearElements(".modal-container");
    }

    static getArt(file, id) {
        return Modules.data.art[file][id];
    }

    static getAreas() {
        const areas = [];
        for (const key in Modules.data.data.areas) {
            areas.push(Modules.data.data.areas[key]);
        }
        return areas;
    }

    static getAreasAsObject() {
        return Modules.data.data.areas;
    }

    static getResources(type) {
        const resources = [];
        for (const key in Modules.data.data.fishing[type]) {
            resources.push(Modules.data.data.fishing[type][key]);
        }

        return resources;
    }

    static getResourcesAsObject() {
        return Modules.data.data.fishing;
    }

    static updateResource(type, id, amount) {
        const resource = Modules.getResourcesAsObject()[type][id];
        resource.count += amount;
        
        let result = true;
        if (resource.count > resource.max) {
            resource.count = resource.max;
            result = false;
        } else if (resource.count < 0) {
            resource.count = 0;
        }

        // Update elements
        const counters = $("#fishing-" + type + "-counters");
        if (counters.css("visibility") == "hidden") {
            Utils.fadeVisibility(counters[0]);
        }

        $("#" + id + "-counter").fadeIn();
        const count = $("#" + id + "-count").text(resource.count);

        if (resource.count == resource.max) {
            count.addClass("fishing-max");

            resource["show-max"] = true;
            $("#" + id + "-max").show();
        } else {
            count.removeClass("fishing-max");
        }

        return result;
    }
}