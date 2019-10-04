class achievements_menu {
    static initialize() {
        achievements_menu.current_page = 1;

        let size = Object.keys(achievements.get_list()).length;
        achievements_menu.max_pages = Math.ceil(size / 4);
    }

    static show() {
        const popup = new modal("Achievements");
        const box = popup.get_box();

        $("<div>")
            .addClass("centered")
            .html("Page <span id='page-count'>1</span>/" + achievements_menu.max_pages)
            .appendTo(box);

        $("<div>")
            .attr("id", "achievement-holder")
            .addClass("flex flex-justify-center flex-wrap centered")
            .appendTo(box);

        new button({
            parent: box,
            id: "achievements-previous",
            text: "Previous Page",
            classes: ["inline"],
            on_click: () => {
                achievements_menu.update(-1);
            },
            disabled: true
        });
        new button({
            parent: box,
            id: "achievements-next",
            classes: ["right"],
            text: "Next Page",
            on_click: () => {
                achievements_menu.update(1);
            }
        });

        achievements_menu.update(0);

        popup.add_close_button();
    }

    static update(amount) {
        let current = achievements_menu.current_page += amount;

        $("#page-count")
            .text(current);

        $("#achievements-previous-button")
            .prop("disabled", current == 1);
        $("#achievements-next-button")
            .prop("disabled", current == achievements_menu.max_pages);

        const parent = $("#achievement-holder")
            .empty();
        const list = achievements.get_list();
        const keys = Object.keys(list);

        for (let index = 0; index < 4; index++) {
            const data = list[keys[((current - 1) * 4) + index]];
            
            if (data == null) {
                return;
            }
            
            const holder = $("<div>")
                .addClass("achievement-display achievement-text")
                .appendTo(parent);

            if (data.awarded != true) {
                holder.addClass("disabled");
            }

            $("<div>")
                .addClass("achievement-title bold")
                .text(data.title)
                .appendTo(holder);
    
            $("<div>")
                .addClass("achievement-desc")
                .text(data.description)
                .appendTo(holder);
        }
    }
}