let research = {
    initialize() {
        this.theory_difference = 0;
        this.theories_per_second = 0;

        vendor.add_item(enterprises.research_vendor, {
            data: {
                parent: "research_content",
                id: "designer_research",
                classes: ["enterprise_investment absolute"],
                header: {
                    bold: "Fish Designing",
                    regular: "(§1,000)"
                },
                text: "Advances in genetic engineering that would allow you to mix and match parts of fish, essentially allowing you to design new species of fish.",
                on_click: function() {
                    research.animate($(this), function() {
                        $("#designer_section")
                            .fadeIn();
                        enterprises.desk_data.designer = true;
                    });

                    research.update_theories(-1000);
                },
                disabled: function() {
                    return resources.research_theories.count < 1000;
                }
            }
        });

        enterprises.research_interval = window.setInterval(research.update, 5000);
    },

    update() {
        research.update_theories(research.theories_per_second * 5);
    },

    update_theories(amount) {
        resources.research_theories.count += amount;
        research.theory_difference += amount;

        let difference = research.theory_difference;
        if (difference != 0) {
            $("#research_theory_difference")
                .text(" (" + (difference > 0 ? "+" : "-") + main.stringify(Math.abs(difference)) + ")")
                .stop()
                .show()
                .css("opacity", 1.0)
                .fadeOut(1200, function() {
                    research.theory_difference = 0;
                });
        }

        if (enterprises.current_view == "desk") {
            $("#research_theories_count")
                .text(main.stringify(resources.research_theories.count));
        }

        for (let button of enterprises.research_vendor.shown) {
            let parent = $("#" + button.data.id + "_button");
            if ($(parent).prop("purchased") != true) {
                $(parent)
                    .prop("disabled", button.data.disabled());
            }
        }
    },

    update_display() {
        for (let element of $(".progress")) {
            let parent = $("#" + $(element).attr("parent") + "_button");

            $(element)
                .css("top", $(parent).position().top + 6);
        }

        desk.check_empty();
    },

    animate(parent, callback) {
        $(parent)
            .css("background-color", "transparent")
            .prop("purchased", true)
            .prop("disabled", true);

        let id = $(parent).attr("id").replace("_button", "");
        let element = $("<div>")
            .attr("parent", id)
            .attr("timer", 3)
            .addClass("progress absolute")
            .css("top", $(parent).position().top + 6)
            .css("left", $(parent).position().left + 6)
            .appendTo($(parent));
        $(element)
            .animate(
                { "width": "295px" },
                $(element).attr("timer") * 1000,
                "linear",
                function() {
                    vendor.remove_item(enterprises.research_vendor, id, research.update_display);
                    
                    if (callback != null) {
                        callback();
                    }
                }
            );
    }
}