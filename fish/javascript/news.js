var news = {
    // imports greater than 1 billion
    major_importers: [
        // asian
        "Japan", 
        "China", 
        "Vietnam", 
        "South Korea", 
        "Thailand",
        // european
        "Spain", 
        "France", 
        "Italy", 
        "Germany", 
        "Sweden",
        "The Netherlands", 
        "The United Kingdom", 
        "Denmark", 
        "Portugal",
        "Poland",
        // latin american/carribean
        "Brazil",
        // north american
        "The United States", 
        "Canada"
    ],
    // imports less than 1 billion
    minor_importers: [
        // african
        "Nigeria", 
        "Egypt", 
        "South Africa", 
        "Morocco", 
        "Ghana",
        // asian
        "Singapore", 
        "Malaysia", 
        "The Philippines",
        // latin american/carribean
        "Peru", 
        "Colombia", 
        "The Dominican Republic",
        "Costa Rica", 
        "Argentina",
        "Ecuador", 
        "Guatemala", 
        "Chile", 
        "Jamaica",
        // middle eastern
        "Israel", 
        "Saudi Arabia", 
        "Kuwait", 
        "Iran", 
        "Lebanon",
        "Qatar", 
        "Jordan",
        // north american
        "Mexico",
        // oceanian 
        "Australia", 
        "New Zealand", 
        "Fiji", 
        "The Solomon Islands"
    ],

    // important news words/phrases
    modifiers: [
        "halts imports of",
        "cancelles shipment of",
        "received excess cargo containing",
        "discovered disease in",
        "found counterfeit",
        "encountered a budget issue regarding",
        "does not want to overfish",
        "considers the morals of harvesting"
    ],

    // non-important news words/phrases
    actions: [
        "plans to remove",
        "considers getting rid of",
        "says its citizens enjoy",
        "reportedly loves",
        "reportedly hates",
        "begins to recall",
        "raises concerns about",
        "begins to analyze",
        "starts debates about",
        "starts revitalization of",
        "has banned",
        "de-materializes",
        "eliminates",
        "cancels",
        "ruins",
        "moderates",
        "synthesizes",
        "terminates",
        "abolishes",
        "revokes",
        "cuts off",
        "repeals",
        "re-invents"
    ],

    subjects: [
        "chocolate",
        "computers",
        "idle games",
        "newspapers",
        "hats",
        "pigeons",
        "ice water",
        "lemonade",
        "peacocks",
        "facial masks",
        "fidget spinners",
        "oatmeal",
        "paperclip factories",
        "dark rooms",
        "artificial intelligence",
        "umbrellas",
        "cell phones",
        "croutons",
        "toilet paper",
        "salmon",
        "colonization of the Moon",
        "sunglasses",
        "social media",
        "the internet",
        "cats",
        "breadsticks",
        "vapes",
        "shark meat",
        "iron helmets",
        "candycanes",
        "paper",
        "barbecue sauce",
        "ranch dressing",
        "dog treats",
        "ketchup",
        "napkins",
        "diapers",
        "wine",
        "pillows"
    ],

    effects: [
        ", chaos ensues.",
        ", most people don't care.",
        ", hundreds may die.",
        ", thousands are injured.",
        ", millions attempt to flee the country.",
        ", the global economy starts to shake.",
        ", experts are perplexed.",
        ", children say they love it!",
        ", millenials signal their support.",
        ", more at 5.",
        ", more at 6.",
        ", more at 9.",
        ", more at 11.",
        ", will civilization survive?",
        ", war may be on the horizon.",
        ", civil unrest grows.",
        ", scientists agree.",
        ", in the face of a high chance of rain.",
        ", lawsuits continue to pile up.",
        ", how will the president respond?",
        ", the government may shut down.",
        ", riots begin to break out.",
        ", you won't believe what happens next!",
        ", and the results are spectacular!",
        ", this story will shake you!",
        ", we were left speechless!",
        ", see for yourself.",
        ", could they be hiding something?"
    ],

    update() {
        let indices = [];
        for (let index = 0; index < fishing.locked_areas.length; index++) {
            let item = fishing.locked_areas[index];
            item.days--;

            if (item.days == 0) {
                indices.push(index);
            }
        }
        for (let index of indices.reverse()) {
            $("#" + fishing.locked_areas[index].area + "_workers_header")
                .css("opacity", 1.0);

            fishing.locked_areas.splice(index, 1);
        }
    },

    create_element(text) {
        $("<div>")
            .attr("id", "news_text")
            .text(text)
            .one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
                $(this)
                    .remove();

                news.generate();
            })
            .appendTo($("#news_container"));
    },

    generate() {
        if (main.random(1, 5) == 1) {
            if (fishing.locked_areas.length < 4) {
                this.generate_significant_news();
                return;
            }
        }

        this.generate_insignificant_news();
    },

    generate_significant_news() {
        if ($("#news_text").length == 0) {
            let list = this.major_importers;
            
            let country = list[main.random(0, list.length - 1)];
            let modifier = this.modifiers[main.random(0, this.modifiers.length - 1)];
            let area;
            let days = main.random(7, 35);

            let check = (area) => {
                for (let index of fishing.locked_areas) {
                    if (index.area == area.internal) {
                        return true;
                    }
                }
                return false;
            }
            do {
                area = window[areas.fish_list[main.random(0, areas.fish_list.length - 1)]];
            } while (check(area));
            
            let result = country + " " + modifier + " \"" + area.display + "\" fish.";

            messenger.write_message(result + " No profits will be gained from these fish for " + days + " days.");
            this.create_element(result);

            fishing.locked_areas.push({
                area: area.internal,
                days: days
            });

            $("#" + area.internal + "_workers_header")
                .css("opacity", 0.5);
        }
    },

    generate_insignificant_news() {
        if ($("#news_text").length == 0) {
            let result = "";

            let components = [
                (main.random(0, 1) == 1 ? "major_importers" : "minor_importers"), 
                "actions",
                "subjects",
                "effects"
            ];
            for (let component of components) {
                let list = this[component];
                result += list[main.random(0, list.length - 1)];

                if (component != "subjects") {
                    result += " ";
                }
            }

            this.create_element(result.substring(0, result.length - 1));
        }
    }
}