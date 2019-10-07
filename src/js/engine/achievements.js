class achievements {
    static queue = [];
    static running = false;
    static achieved = 0;

    static award(id) {
        const queue = achievements.queue;
        const data = achievements.achievement_list[id];

        if (data.awarded == true) {
            return;
        }

        data.awarded = true;
        queue.push(id);
        achievements.update_elements(id);

        if (achievements.running == false) {
            achievements.running = true;
            achievements.display();
        }
    }

    static display() {
        const queue = achievements.queue;
        const id = queue.shift();
        const data = achievements.achievement_list[id];

        const element = $("<div>")
            .addClass("achievement flex")
            .animate({
                marginTop: 100
            }, 1000, () => {
                window.setTimeout(() => {
                    element.animate({
                        marginTop: 0
                    }, 1000, () => {
                        element.remove();

                        if (queue.length != 0) {
                            achievements.display();
                        } else {
                            achievements.running = false;
                        }
                    });
                }, 5000);
            })
            .appendTo($("body"));

        $("<div>")
            .addClass("achievement-art pre bold flex flex-centered")
            .text(art_data.get("achievements", id))
            .appendTo(element);

        const text = $("<div>")
            .addClass("achievement-text centered") 
            .appendTo(element);
        
        $("<div>")
            .addClass("achievement-title bold")
            .text(data.title)
            .appendTo(text);

        $("<div>")
            .addClass("achievement-desc")
            .text(data.description)
            .appendTo(text);
    }

    static update_elements(id) {
        achievements.achieved++;

        $("#achievement-count")
            .text(achievements.achieved);

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