var earth_defender = {
    initialize() {
        main.remove_elements(["office_section", "earth_defender_section"]);

        let left = $(".left");
        let section = $("<div>")
            .attr("id", "earth_defender_section")
            .appendTo(left);

        let content = $("<div>")
            .attr("id", "earth_defender_content")
            .appendTo(section);
        $("<div>")
            .attr("id", "earth_defender_header")
            .addClass("pre")
            /*
                This text was created using http://patorjk.com/software/taag/ with the "Slant" font and "Fitted" width/height
                All credit goes to the original creator of the font Glenn Chappell and the modifier Paul Burton
            */
            .html("              ______              __   __<br>"
                + "             / ____/____ _ _____ / /_ / /_<br>"
                + "            / __/  / __ `// ___// __// __ \\<br>"
                + "           / /___ / /_/ // /   / /_ / / / /<br>"
                + "          /_____/ \\__,_//_/    \\__//_/ /_/<br>"
                + "    ____         ____                  __<br>"
                + "   / __ \\ ___   / __/___   ____   ____/ /___   _____<br>"
                + "  / / / // _ \\ / /_ / _ \\ / __ \\ / __  // _ \\ / ___/<br>"
                + " / /_/ //  __// __//  __// / / // /_/ //  __// /<br>"
                + "/_____/ \\___//_/   \\___//_/ /_/ \\____/ \\___//_/"
            )
            .appendTo(content);

        buttons.create({
            parent: "earth_defender_content",
            id: "play_earth_defender",
            text: "Play Now",
            on_click: function() {
                $("#earth_defender_content")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();

                        earth_defender.start();
                    });
            }
        });
        buttons.create({
            parent: "earth_defender_content",
            id: "earth_defender_tutorial",
            text: "Tutorial",
            on_click: function() {
                $("#earth_defender_content")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();

                        earth_defender.show_tutorial();
                    });
            }
        });
        buttons.create({
            parent: "earth_defender_content",
            id: "exit_earth_defender",
            text: "Exit Game",
            breaks: 0,
            on_click: function() {
                $("#earth_defender_section")
                    .fadeOut(400, function() {
                        office.initialize();
                    });
            }
        });

        let header = $("<div>")
            .attr("id", "earth_defender_hiscores")
            .addClass("centered bold")
            .text("Personal Hi-scores")
            .appendTo(content);
        $("<div>")
            .addClass("divider")
            .appendTo(header);
        
        $("<div>")
            .attr("id", "earth_defender_scores_left")
            .appendTo(content);
        $("<div>")
            .attr("id", "earth_defender_scores_right")
            .appendTo(content);
        for (let index = 0; index < 10; index++) {
            let real = index + 1;
            let number = $("<div>")
                .attr("id", "hiscore_" + real)
                .addClass("hiscore")
                .text(real + ". ")
                .appendTo($("#earth_defender_scores_" + (real > 5 ? "right" : "left")))
            $("<span>")
                .attr("id", "hiscore_" + real + "_score")
                .text("--")
                .appendTo(number);
        }

        this.hiscores = {};
    },

    show_tutorial() {
        let parent = $("<div>")
            .attr("id", "tutorial_section")
            .appendTo($("#earth_defender_section"));

        let movement_header = $("<div>")
            .addClass("centered bold tutorial_header")
            .text("Movement & Shooting")
            .appendTo(parent);
        $("<div>")
            .addClass("divider")
            .appendTo(movement_header);
        $("<div>")
            .attr("id", "tutorial_art")
            .addClass("pre")
            .html(" _____                                  _____<br>"
                + "|     |                                |     |<br>"
                + "|  A  |                                |  D  |<br>"
                + "|_____|                                |_____|<br>"
                + "<br>"
                + "           ________________________<br>"
                + "          |                        |<br>"
                + "          |          Space         |<br>"
                + "          |________________________|")
            .appendTo(parent);
        let movement = $("<div>")
            .attr("id", "movement_description")
            .appendTo(parent);
        $("<p>")
            .addClass("tutorial_paragraph")
            .text("Press [A] to move left.")
            .appendTo(movement);
        $("<p>")
            .addClass("right tutorial_paragraph")
            .text("Press [D] to move right.")
            .appendTo(movement);
        $("<p>")
            .addClass("centered tutorial_paragraph tutorial_section_end")
            .text("Press [Space] to fire a laser.")
            .appendTo(parent);

        let enemy_header = $("<div>")
            .addClass("centered bold tutorial_header")
            .text("Enemies")
            .appendTo(parent);
        $("<div>")
            .addClass("divider")
            .appendTo(enemy_header);
        let moving_section = $("<div>")
            .attr("id", "tutorial_moving_alien")
            .appendTo(parent);
        $("<div>")
            .attr("id", "moving_alien")
            .addClass("pre")
            .html(" /_[]_\\<br>"
                + "/ |  | \\")
            .appendTo(moving_section);
        $("<p>")
            .attr("id", "moving_alien_description")
            .addClass("centered")
            .text("Alien ships move left to right on the screen. When they reach the edge of the screen, they go back to the left and down one section.")
            .appendTo(parent);
        let shooting_section = $("<div>")
            .attr("id", "tutorial_shooting_alien")
            .appendTo(parent);
        $("<div>")
            .attr("id", "shooting_alien")
            .addClass("pre")
            .html(" /_[]_\\<br>"
                + "/ |  | \\")
            .appendTo(shooting_section);
        $("<div>")
            .attr("id", "shooting_alien_lasers")
            .addClass("pre")
            .html("|  |")
            .appendTo(shooting_section);
        $("<p>")
            .attr("id", "shooting_alien_description")
            .addClass("centered tutorial_section_end")
            .text("Alien ships will shoot lasers at you. You'll need to move to dodge them.")
            .appendTo(parent);
        this.moving_index = 1;
        this.shooting_index = 1;
        let moving_function = () => {
            let parent = $("#moving_alien");
            let moving_index = earth_defender.moving_index;
            let shooting_index = earth_defender.shooting_index;

            if ($(parent).length != 0) {
                let text = moving_index % 2 == 0 ?
                        " /_[]_\\<br>"
                    + "/ |  | \\" :
                        "\\ _[]_ /<br>"
                    + " \\|  |/";

                $("#moving_alien")
                    .css("margin-left", moving_index * 48)
                    .html(text);
                $("#shooting_alien")
                    .html(text);
                $("#shooting_alien_lasers")
                    .css("top", 40 + (shooting_index * 20));
                
                if (moving_index == 9) {
                    earth_defender.moving_index = 0;
                } else {
                    earth_defender.moving_index++;
                }

                if (shooting_index == 2) {
                    earth_defender.shooting_index = 0;
                } else {
                    earth_defender.shooting_index++;
                }
            }
        }
        let moving_interval = window.setInterval(moving_function, 1000);
        
        let misc_header = $("<div>")
            .addClass("centered bold tutorial_header")
            .text("Score & Lives")
            .appendTo(parent);
        $("<div>")
            .addClass("divider")
            .appendTo(misc_header);
        let left_section = $("<div>")
            .addClass("centered tutorial_misc")
            .text("Points: 1,234")
            .appendTo(parent);
        $("<div>")
            .addClass("divider")
            .appendTo(left_section);
        $("<p>")
            .addClass("misc_description")
            .text("You recieve 50 points for every alien ship you destroy. Your total points are displayed in the top left corner and on the game over screen.")
            .appendTo(left_section);
        let right_section = $("<div>")
            .addClass("centered tutorial_misc right")
            .text("Lives: 3")
            .appendTo(parent);
        $("<div>")
            .addClass("divider")
            .appendTo(right_section);
        $("<p>")
            .addClass("misc_description")
            .text("You lose a life when you are hit by an alien laser and when alien ships get past your ship. When you have no lives left the game ends. Your remaining lives are displayed in the top right corner of the screen.")
            .appendTo(right_section);
        
        buttons.create({
            parent: "tutorial_section",
            id: "tutorial_main_menu",
            text: "Main Menu",
            on_click: function() {
                $(parent)
                    .fadeOut(400, function() {
                        $(this)
                            .remove();

                        window.clearInterval(moving_interval);

                        earth_defender.initialize();
                    });
            }
        });
    },

    start() {
        let parent = $("#earth_defender_section");

        let info_section = $("<div>")
            .attr("id", "info_section")
            .appendTo(parent);
        let points = $("<div>")
            .attr("id", "points")
            .text("Points: ")
            .appendTo(info_section);
        $("<span>")
            .attr("id", "points_count")
            .text("0")
            .appendTo(points);
        buttons.create({
            parent: "info_section",
            id: "quit_game",
            text: "Quit Game",
            breaks: 0,
            on_click: function() {
                earth_defender.end();
            }
        });
        let lives = $("<div>")
            .attr("id", "lives")
            .text("Lives: ")
            .appendTo(info_section);
        $("<span>")
            .attr("id", "lives_count")
            .text("3")
            .appendTo(lives);

        $("<div>")
            .addClass("divider")
            .appendTo(info_section);

        let game_section = $("<div>")
            .attr("id", "game_section")
            .appendTo(parent);
        $("<div>")
            .attr("id", "player")
            .addClass("pre")
            .html("   /\\<br>"
                + " _|[]|_<br>"
                + "(__\\/__)<br>"
                + "  V!!V")
            .appendTo(game_section);

        $(document)
            .on("keypress", function(e) {
                let move = true;
                let player = earth_defender.state.player;

                switch (e.keyCode) {
                    case 65:
                    case 97:
                        player.move = -1;
                        break;
                    case 68:
                    case 100:
                        player.move = 1;
                        break;
                    case 32:
                        if (player.can_shoot) {
                            let location = {
                                x: player.location.x,
                                y: player.location.y - 1
                            }
                            earth_defender.create_laser(location, -1, "player");
                        }
                        break;
                    default:
                        move = false;
                        break;
                }

                if (move) {
                    earth_defender.move();
                    player.move = 0;
                }
            });
        this.state = {
            interval: window.setInterval(this.update, 100),
            update_count: 0,
            level: 0,
            player: {
                location: {
                    x: 0,
                    y: 18
                },
                points: 0,
                lives: 3,
                move: 0,
                can_shoot: true
            },
            enemies: [],
            lasers: []
        };
    },

    update() {
        let count = ++earth_defender.state.update_count;
        let state = earth_defender.state;

        let enemy_removal = [];
        let update = 10 - Math.floor(0.15 * state.level);
        if (count % (update < 6 ? 6 : update) == 0) {
            for (let index = 0; index < state.enemies.length; index++) {
                let enemy = state.enemies[index];

                if (count % ((update < 6 ? 6 : update) * 2) == 0) {
                    $(enemy.element)
                        .html("\\__[]__/<br>"
                            + " \\|  |/");
                } else {
                    $(enemy.element)
                        .html(" /_[]_\\<br>"
                            + "/ |  | \\");
                }

                let location = enemy.location;
                if (++location.x == 10) {
                    location.x = 0;
                    location.y++;
                }
                
                $(enemy.element)
                    .css("top", 43 + (location.y * 33))
                    .css("left", 5 + (location.x * 55));
            }
        }

        let laser_removal = [];
        if (count % 2 == 0) {
            for (let index = 0; index < state.lasers.length; index++) {
                let laser = state.lasers[index];

                let location = laser.location;
                location.y += laser.direction;

                $(laser.element)
                    .css("top", 43 + location.y * 33);

                if (location.y == 18 || location.y < 0) {
                    laser_removal.push(index);

                    $(laser.element)
                        .remove();

                    if (laser.launcher == "enemy") {
                        if (earth_defender.compare(laser.location, state.player.location)) {
                            state.player.lives--;
                        }
                    }
                } else {
                    for (let enemy_index = 0; enemy_index < state.enemies.length; enemy_index++) {
                        let enemy = state.enemies[enemy_index];

                        if (earth_defender.compare(laser.location, enemy.location) && laser.launcher == "player") {
                            laser_removal.push(index);
                            enemy_removal.push(enemy_index);

                            state.player.points += 50;
                        }
                    }
                }
            }

            for (let index = 0; index < state.enemies.length; index++) {
                let location = state.enemies[index].location;
                if (location.y >= 18) {
                    enemy_removal.push(index);

                    state.player.lives--;
                }
            }

            if (state.enemies.length == 0) {
                for (let laser of state.lasers) {
                    $(laser.element)
                        .remove();
                }
                state.lasers = [];

                if (!state.level_queued) {
                    earth_defender.next_level();
                }
            } else {
                for (let index of laser_removal.reverse()) {
                    $(state.lasers[index].element)
                        .remove();
        
                    state.lasers.splice(index, 1);
                }
            }
        }

        for (let index of enemy_removal.reverse()) {
            if (index < state.enemies.length) {
                $(state.enemies[index].element)
                    .remove();

                state.enemies.splice(index, 1);
            }
        }

        let initial_location;
        let registered_locations = "";
        for (let index = state.enemies.length - 1; index >= 0; index--) {
            let enemy = state.enemies[index];
            if (index == state.enemies.length - 1) {
                initial_location = enemy.location;
            }

            let location = enemy.location;
            registered_locations += location.x + "," + location.y + "|";

            if (location.y >= 17) {
                continue;
            }

            let chance = 40 - Math.floor(0.5 * state.level);
            if (main.random(1, chance < 10 ? 10 : chance) == 1) {
                if (initial_location.y - location.y < 2) {
                    let spawn_location = {
                        x: location.x,
                        y: location.y + 1
                    }
                    if (!registered_locations.includes(spawn_location.x + "," + spawn_location.y)) {
                        earth_defender.create_laser(spawn_location, 1, "enemy");
                    }
                } else {
                    break;
                }
            }
        }

        if (count == 1000) {
            count = 0;
        }

        $("#points_count")
            .text(main.stringify(state.player.points));
        $("#lives_count")
            .text(state.player.lives);

        if (state.player.lives == 0) {
            earth_defender.end();
        }
    },

    move() {
        let player = this.state.player;

        let destination = player.location.x + player.move;
        if (destination > 9 || destination < 0) {
            return;
        }
        player.location.x = destination;

        $("#player")
            .css("left", 5 + destination * 55);
    },

    create_laser(location, direction, launcher) {
        for (let laser of this.state.lasers) {
            if (this.compare(laser.location, location)) {
                return;
            }
        }

        if (launcher == "player") {
            for (let index = 0; index < this.state.enemies.length; index++) {
                let enemy = this.state.enemies[index];
                if (this.compare(enemy.location, location)) {
                    $(enemy.element)
                        .remove();
                    this.state.enemies.splice(index, 1);

                    return;
                }
            }
        }

        let element = $("<div>")
            .addClass("laser pre")
            .css("top", 43 + (location.y * 33))
            .css("left", 5 + (location.x * 55))
            .text(launcher == "player" ? "|" : "| |")
            .appendTo($("#game_section"));
        
        this.state.lasers.push({
            element: element,
            location: location,
            direction: direction,
            launcher: launcher
        });
    },

    next_level() {
        this.state.player.can_shoot = false;
        this.state.level_queued = true;

        let level = ++this.state.level;
        let number_of_enemies = 2 + (level * 2) + Math.floor(level * (level / 10));
        if (number_of_enemies > 120) {
            number_of_enemies = 120;
        }

        let start = (state) => {
            for (let index = 0; index < number_of_enemies; index++) {
                let location = {
                    x: index % 10,
                    y: Math.floor(index / 10),
                }
                let enemy = $("<div>")
                    .addClass("enemy pre")
                    .css("top", 43 + location.y * 33)
                    .css("left", 5 + location.x * 55)
                    .html(" /_[]_\\<br>"
                        + "/ |  | \\")
                    .appendTo($("#game_section"));

                state.enemies.push({
                    location: location,
                    element: enemy
                });
            }

            state.player.can_shoot = true;
            this.state.level_queued = false;
        }

        let level_display = $("<div>")
            .attr("id", "level_display")
            .addClass("pre")
            .fadeOut(3000, function() {
                $(this)
                    .remove();
                
                start(earth_defender.state);
            })
            .appendTo("#game_section");
        $("<div>")
            /*
                This text was created using http://patorjk.com/software/taag/ with the "Slant" font and "Fitted" width/height
                All credit goes to the original creator of the font Glenn Chappell and the modifier Paul Burton
            */
            .html("    __                      __<br>"
                + "   / /   ___  _   __ ___   / /<br>"
                + "  / /   / _ \\| | / // _ \\ / /<br>"
                + " / /___/  __/| |/ //  __// /<br>"
                + "/_____/\\___/ |___/ \\___//_/")
            .appendTo(level_display);

        for (let char of level.toString().split("")) {
            let level_number = $("<div>")
                .addClass("level_number")
                .appendTo(level_display);

            let number;
            let width = 65;
            switch (char) {
                /*
                    These numbers were created using http://patorjk.com/software/taag/ with the "Slant" font and "Fitted" width/height
                    All credit goes to the original creator of the font Glenn Chappell and the modifier Paul Burton
                */
                case "1":
                    number =
                          "   ___<br>"
                        + "  <  /<br>"
                        + "  / /<br>"
                        + " / /<br>"
                        + "/_/";
                    break;
                case "2":
                    number =
                          "   ___<br>"
                        + "  |__ \\<br>"
                        + "  __/ /<br>"
                        + " / __/<br>"
                        + "/____/";
                    break;
                case "3":
                    number =
                          "   _____<br>"
                        + "  |__  /<br>"
                        + "  /_ <<br>"
                        + " ___/ /<br>"
                        + "/____/";
                    break;
                case "4":
                    number =
                          "   __ __<br>"
                        + "  / // /<br>"
                        + " / // /_<br>"
                        + "/__  __/<br>"
                        + "  /_/";
                    break;
                case "5":
                    number =
                          "   ______<br>"
                        + "  / ____/<br>"
                        + " /___  \\<br>"
                        + " ____/ /<br>"
                        + "/_____/";
                    break;
                case "6":
                    number =
                          "   _____<br>"
                        + "  / ___/<br>"
                        + " / __ \\<br>"
                        + "/ /_/ /<br>"
                        + "\\____/";
                    break;
                case "7":
                    number =
                          " _____<br>"
                        + "/__  /<br>"
                        + "  / /<br>"
                        + " / /<br>"
                        + "/_/";
                    break;
                case "8":
                    number =
                          "   ____<br>"
                        + "  ( __ )<br>"
                        + " / __  /<br>"
                        + "/ /_/ /<br>"
                        + "\\____/";
                    break;
                case "9":
                    number =
                          "   ____<br>"
                        + "  / __ \\<br>"
                        + " / /_/ /<br>"
                        + " \\__, /<br>"
                        + "/____/";
                    break;
                default:
                    number =
                          "   ____<br>"
                        + "  / __ \\<br>"
                        + " / / / /<br>"
                        + "/ /_/ /<br>"
                        + "\\____/";
                    break;
            }

            $(level_number)
                .css("width", width + "px")
                .html(number);
        }
    },

    end() {
        window.clearInterval(this.state.interval);
        $(document)
            .off("keypress");

        let score_screen = (state) => {
            let parent = $("<div>")
                .attr("id", "score_section")
                .appendTo($("#earth_defender_section"));

            $("<div>")
                .attr("id", "game_over_text")
                .addClass("pre")
                .html("   ______<br>"
                    + "  / ____/____ _ ____ ___   ___<br>"
                    + " / / __ / __ `// __ `__ \\ / _ \\<br>"
                    + "/ /_/ // /_/ // / / / / //  __/<br>"
                    + "\\____/ \\__,_//_/ /_/ /_/ \\___/<br>"
                    + "            ____<br>"
                    + "           / __ \\ _   __ ___   _____<br>"
                    + "          / / / /| | / // _ \\ / ___/<br>"
                    + "         / /_/ / | |/ //  __// /<br>"
                    + "         \\____/  |___/ \\___//_/" 
                )
                .appendTo(parent);
            
            let score_header = $("<div>")
                .attr("id", "total_score_header")
                .addClass("centered bold")
                .text("Your Score")
                .appendTo(parent);
            $("<div>")
                .addClass("divider")
                .appendTo(score_header);
            $("<div>")
                .attr("id", "total_score")
                .addClass("centered")
                .text(main.stringify(state.player.points))
                .appendTo(parent);
            
            buttons.create({
                parent: "score_section",
                id: "earth_defender_main_menu",
                text: "Main Menu",
                on_click: function() {
                    $(parent)
                        .fadeOut(400, function() {
                            $(this)
                                .remove();
                            earth_defender.initialize();
                        });
                }
            });
        }
        
        $("#info_section")
            .fadeOut(1000);
        $("#game_section")
            .fadeOut(1000, function() {
                $(this)
                    .remove();
                $("#info_section")
                    .remove();

                score_screen(earth_defender.state);
            });
    },

    compare(location_1, location_2) {
        return location_1.x == location_2.x && location_1.y == location_2.y;
    }
}