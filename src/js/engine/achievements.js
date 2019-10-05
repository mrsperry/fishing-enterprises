class achievements {
    static queue = [];
    static running = false;
    static achieved = 0;

    static award(id) {
        const data = achievements.achievement_list[id];
        const queue = achievements.queue;
        
        if (data.awarded == true) {
            return;
        } else {
            achievements.update_achieved();
            data.awarded = true;

            if (achievements.running) {
                queue.push(id);
                return;
            }
        }

        achievements.running = true;

        const element = $("<div>")
            .addClass("achievement flex")
            .animate({
                marginTop: 100
            }, 1000, () => {
                setTimeout(() => {
                    element.animate({
                        marginTop: 0
                    }, 1000, () => {
                        element.remove();
                        achievements.running = false;

                        if (queue.length != 0) {
                            achievements.award(queue.shift());
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

    static update_achieved() {
        achievements.achieved++;

        $("#achievement-count")
            .text(achievements.achieved);
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