class achievements {
    static award(id) {
        const data = achievements.achievement_list[id];
        
        if (data.awarded == true) {
            return;
        } else {
            data.awarded = true;
        }

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

    static achievement_list = {
        "10-fish": {
            title: "Beginner's Luck",
            description: "Catch your first 10 fish."
        }
    };
}