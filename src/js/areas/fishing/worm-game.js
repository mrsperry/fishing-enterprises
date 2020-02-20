class WormGame {
    static initialize() {
        WormGame.grid = [];
        WormGame.count = 0;
        WormGame.max = 5;
        WormGame.minTTL = 1;
        WormGame.maxTTL = 5;
        WormGame.swapChance = 50;

        Fishing.toggleLine(false);

        const content = $("#fishing-content")
            .fadeOut(400, () => {
                $("#fishing-content-art").html(Modules.getArt("worm-game", "background"));

                $("#forage-for-worms-button")
                    .text("Back to the lake")
                    .prop("onclick", null)
                    .off()
                    .click(WormGame.stop);
                $("#cast-out-line-button").hide();
                $("#reel-in-line-button").hide();

                $.when(Modules.loadView("fishing/worm-game", "#fishing-content", null)).done(() => {
                    for (let index = 0; index < 9; index++) {
                        WormGame.grid.push(null);
                        
                        $("<div>")
                            .css("visibility", "hidden")
                            .addClass("pre worm-game-art")
                            .html(Modules.getArt("worm-game", "state-1"))
                            .appendTo("#worm-game-tile-" + (index + 1));
                    }

                    WormGame.interval = window.setInterval(WormGame.update, 1000);
                });

                content.fadeIn();
            });
    }

    static update() {
        for (let index = 0; index < 9; index++) {
            let tile = WormGame.grid[index];
            if (tile == null) {
                continue;
            }

            const art = $("#worm-game-tile-" + (index + 1) + " .worm-game-art")[0];
            // Check if the texture should be randomly selected
            if (Utils.random(1, 100) < WormGame.swapChance) {
                $(art).html(Modules.getArt("worm-game", "state-" + Utils.random(1, 2)));
            }

            WormGame.grid[index] = --tile;
            if (tile == 0) {
                // Remove this tile
                $(art).fadeOut(2000, () => {
                    $(art).show().css("visibility", "hidden");

                    WormGame.count--;
                    WormGame.grid[index] = null;
                });
            }
        }

        if (WormGame.count < WormGame.max) {
            // Get a random tile to spawn a worm on
            let tile;
            do {
                tile = Utils.random(0, 8);
            } while (WormGame.grid[tile] != null);

            WormGame.count++;
            WormGame.grid[tile] = Utils.random(WormGame.minTTL, WormGame.maxTTL);

            $("#worm-game-tile-" + (tile + 1))
                .hide()
                .fadeIn();
            const art = $("#worm-game-tile-" + (tile + 1) + " .worm-game-art")
                .css("visibility", "visible")
                .css("transform", "rotate(" + Utils.random(0, 360) + "deg)")
                .off()
                .click(() => {
                    Modules.updateResource("bait", "worms", 1);
                    
                    art.css("visibility", "hidden");

                    WormGame.count--;
                    WormGame.grid[tile] = null;
                });;
        }
    }

    static stop() {
        const content = $("#fishing-content").fadeOut(400, () => {
            $("#fishing-content-art").html(Modules.getArt("areas", "lake"));

            $("#forage-for-worms-button")
                .text("Forage for worms")
                .off()
                .click(WormGame.initialize);
            $("#cast-out-line-button").show();
            $("#reel-in-line-button").show();

            $("#worm-game-grid").remove();
            window.clearInterval(WormGame.interval);

            content.fadeIn();
        });
    }
}