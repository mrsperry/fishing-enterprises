let designer = {
    load() {
        enterprises.current_view = "designer";

        this.part_pack_1 = false;
        this.part_pack_2 = false;

        let parent = $("<div>")
            .attr("id", "designer_lab_section")
            .hide()
            .fadeIn()
            .appendTo($("#left"));
        buttons.create({
            parent: "designer_lab_section",
            id: "designer_back_to_office",
            text: "Back to your office",
            on_click: function() {
                $("#designer_lab_section")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                        
                        office.load();
                    });
            }
        });
        let heads_section = $("<div>")
            .attr("id", "heads_section")
            .attr("display", "Heads")
            .addClass("before section")
            .appendTo(parent);
        let tails_section = $("<div>")
            .attr("id", "tails_section")
            .attr("display", "Tails")
            .addClass("before section")
            .appendTo(parent);
        let body_section = $("<div>")
            .attr("id", "body_section")
            .attr("display", "Bodies")
            .addClass("before section")
            .appendTo(parent);
        let fins_section = $("<div>")
            .attr("id", "fins_section")
            .attr("display", "Fins")
            .addClass("before section")
            .appendTo(parent);

        let box = $("<div>")
            .attr("id", "designer_box")
            .appendTo(parent);
    }
}