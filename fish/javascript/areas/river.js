var river = {
    internal: "river",
    display: "River",
    unlock: "lake",
    license: "Fly Fishing permit",
    workers: {
        license: "Mass Angler Dissuasion",
        description: "Construct fences and warning signs along river banks to deter competition",
        min: 3,
        check: "pier"
    },
    purchased: {
        price: 300,
        buttons: [
            {
                resource: resources.bait.guppies,
                parent: "bait"
            },
            {
                resource: resources.tackle.fly_tackle,
                parent: "tackle"
            },
            {
                resource: resources.tackle.cages,
                parent: "tackle"
            }
        ]
    },

    river_troll: true,
    queue_change: false,

    initialize() {
        this.state = new fishing.state([
            resources.fish.salmon,
            resources.fish.trout,
            resources.fish.crawdads,
            resources.fish.pike
        ]);
    },

    update() {
        if (!this.river_troll) {
            fishing.update(this.state);
        }
    },

    load() {
        this.create_buttons();
    },

    unload() {
        if (!this.river_troll) {
            fishing.unload(this.state);
        }
    },

    create_buttons() {
        if (this.queue_change) {
            this.river_troll = false;
        }

        let section = $("<div>")
            .attr("id", "art")
            .appendTo($("#resource_buttons"));
        let art;

        if (this.river_troll) {
            buttons.create({
                parent: "resource_buttons",
                id: "river_troll",
                text: "Talk to the River Troll",
                on_click: function() {
                    river.queue_change = true;
                    $("<div>")
                        .attr("id", "river_troll_text")
                        .text("You are going to need "
                            + "new bait and tackle "
                            + "to fish here, why "
                            + "don't you head to the "
                            + "shop?")
                        .appendTo(section);
                    $("<div>")
                        .attr("id", "river_troll_outline")
                        .text("     +--------------------+\n"
                            + "     |                    |\n"
                            + "     |                    |\n"
                            + "    /|                    |\n"
                            + "   //|                    |\n"
                            + "===/ +--------------------+")
                        .appendTo(section);

                    buttons.remove("river_troll", null);
                }
            });

            art = $.parseHTML(
                  "        ____\n"
                + "   ____/____\\____\n"
                + "  /__/__/__/__/__\\\n"
                + "     /. o  O  \\\n"
                + "     | ; <  * |\n"
                + "  ____\\ v==v /____\n"
                + " /   @ \\____/+/   \\\n"
                + "/ @      @ / /  @  \\\n"
                + "|   /|    /+/ |\\ @ |\n"
                + "| w ||@  / /  ||www|\n"
                + "|w.w||  /+/   ||.  |\n"
                + "|  ;|| / /  @ ||  ;|\n"
                + "|*  ||========||  *|\n"
                + "|  .|| s /\\s  ||*  |\n"
                + "(uwu)|   ||  s|(uuw)\n"
                + "     |ww || w |\n"
                + "     |. w||w w|\n"
                + "     | * ||; *|\n"
                + "     |___||___|\n"
                + "   _/db _/db  |\n"
                + "  (____(______]\n"
            );
        } else {
            fishing.create_buttons();

            art = $.parseHTML("");
        }
        $(art)
            .appendTo(section);
    },

    get_auto_buys() {
        return {
            internal: river.internal,
            auto_buys: [
                {
                    resource: resources.bait.worms,
                    price: 100
                },
                {
                    resource: resources.bait.minnows,
                    price: 100
                }
            ]
        };
    }
}