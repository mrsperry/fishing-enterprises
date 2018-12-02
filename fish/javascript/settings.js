var settings = {
    toggle_dev_tools(set) {
        if (set) {
            let parent = $("#right")
                .hide()
                .fadeIn();
            
            $("<button>")
                .text("Money +5,000")
                .click(function() {
                    resources.money.count += 5000;
                    counters.update();
                })
                .appendTo(parent);
            $("<button>")
                .text("Max bait")
                .click(function() {
                    $("#bait_counters")
                        .fadeIn();
                    settings.max(resources.bait);
                })
                .appendTo(parent);
            $("<button>")
                .text("Max tackle")
                .click(function() {
                    $("#tackle_counters")
                        .fadeIn();
                    settings.max(resources.tackle);
                })
                .appendTo(parent);
            $("<button>")
                .text("Max fuel")
                .click(function() {
                    resources.fuel.count = 30;
                    counters.update();
                })
                .appendTo(parent);
            $("<button>")
                .text("Fast ticks")
                .click(function() {
                    window.clearInterval(main.interval);
                    main.interval = window.setInterval(main.update, 150);
                })
                .appendTo(parent);
            $("<button>")
                .text("Regular ticks")
                .click(function() {
                    window.clearInterval(main.interval);
                    main.interval = window.setInterval(main.update, 2500);
                })
                .appendTo(parent);
        } else {
            $("#right")
                .fadeOut(400, function() {
                    $("#right")
                        .empty();
                });
        }
    },

    max(resource) {
        for (let index in resource) {
            let item = resource[index];
            item.count = item.max;
            $("#" + item.internal)
                .fadeIn();
        }
        counters.update();
    },

    save_game() {

    },

    load_save() {

    },

    delete_save() {

    }
}