class achievements {
    // Current queue of achievements
    static queue = [];
    // If achievements are currently being displayed
    static running = false;
    // The total number of achievements awarded
    static achieved = 0;

    static award(id) {
        const queue = achievements.queue;
        // Get the current achievement
        const data = achievements.achievement_list[id];

        // Check if this achievement has already been awarded
        if (data.awarded == true) {
            return;
        }

        // Push the achievement to the display queue
        data.awarded = true;
        queue.push(id);

        // Update the achievement menu so data isn't lost if the page is reloaded
        achievements.update_elements(id);

        // Check if the display queue is already being emptied
        if (achievements.running == false) {
            achievements.running = true;
            achievements.display();
        }
    }

    static display() {
        const queue = achievements.queue;
        const id = queue.shift();
        const data = achievements.achievement_list[id];

        // Create the achievement box
        const element = $("<div>")
            .addClass("achievement flex")
            // Have the box slide down
            .animate({
                marginTop: 100
            }, 1000, () => {
                // Make the box slide up after a delay
                window.setTimeout(() => {
                    element.animate({
                        marginTop: 0
                    }, 1000, () => {
                        element.remove();

                        // Check if there are more achievements in the display queue
                        if (queue.length != 0) {
                            achievements.display();
                        } else {
                            achievements.running = false;
                        }
                    });
                }, 5000);
            })
            .appendTo($("body"));

        // Art section
        $("<div>")
            .addClass("achievement-art pre bold flex flex-centered")
            .text(art_data.get("achievements", id))
            .appendTo(element);

        // Text section
        const text = $("<div>")
            .addClass("achievement-text centered") 
            .appendTo(element);
        
        // Achievement title
        $("<div>")
            .addClass("achievement-title bold")
            .text(data.title)
            .appendTo(text);

        // Achievement description
        $("<div>")
            .addClass("achievement-desc")
            .text(data.description)
            .appendTo(text);
    }

    // Updates the achievement menu elements if the menu is open
    static update_elements(id) {
        achievements.achieved++;

        // Update the achievements awarded counter
        $("#achievement-count")
            .text(achievements.achieved);

        // Highlight the achievement box
        $("#" + id + "-display")
            .removeClass("disabled");
    }

    static get_list() {
        return achievements.achievement_list;
    }

    static achievement_list = {
        "catch-100-fish": {
            title: "Beginner's Luck",
            description: "Catch your first 100 fish."
        },
        "catch-1000-fish": {
            title: "Intermediate Angling",
            description: "Catch 1,000 fish."
        },
        "catch-100000-fish": {
            title: "Piscator Excellence",
            description: "Catch 100,000 fish."
        },
        "catch-all-fish": {
            title: "Nautical Diversity",
            description: "Catch at least one of every fish."
        },
        "buy-all-items": {
            title: "Cleaning Out The House",
            description: "Purchase at least one of every item in the shop."
        },
        "buy-shop": {
            title: "Prime Real Estate",
            description: "Purchase the shop."
        },
        "get-cat": {
            title: "Feline Rescue",
            description: "Obtain a furry friend."
        },
        "buy-enterprise": {
            title: "Entrepreneurial Ambitions",
            description: "Turn your business into an enterprise."
        }
    };
}