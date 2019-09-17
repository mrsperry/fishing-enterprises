class art_data {
    // List of all files to parse art from
    static files = ["worm_game", "shop", "areas"];

    static initialize() {
        // Set the holder object
        art_data.data = {};

        // Go through all art files
        for (const name of art_data.files) {
            // Get the file via Ajax
            $.get("src/art/" + name + ".art", (lines) => {
                // Parse the art data
                art_data.parse(name, lines.split("\n"));
            });
        }
    }

    static parse(parent, lines) {
        // Adds art to the holder object
        const add_art = (id, lines) => {
            // Get rid of excess spacing
            lines = lines.trimRight();

            // Check if this is the first piece of art for this parent
            if (art_data.data[parent] == null) {
                art_data.data[parent] = {};
            }

            // Set the art
            art_data.data[parent][id] = lines;
        }

        // The name of the art piece
        let name;
        // The lines of the art piece
        let art = "";

        // Go through all the lines of this art file
        for (const line of lines) {
            // Check for the start of a new piece of art (format: #name:test)
            if (line.startsWith("#name")) {
                // If there is a current art piece, add it
                if (name != null) {
                    add_art(name, art);
                }

                // Set the name of this art piece
                name = line.split(":")[1].trim();
                // Reset the art lines
                art = "";

                // Don't add the piece delimiter
                continue;
            }

            // Make sure there is an art piece to add to
            if (name != null) {
                // Add this line to the art piece
                art += line + "\n";
            }
        }

        // Handle the final art piece stored
        add_art(name, art);
    }

    static get(parent, id) {
        return art_data.data[parent][id];
    }
}