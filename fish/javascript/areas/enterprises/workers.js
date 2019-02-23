let workers = {
    initialize() {
        this.payroll = {
            remaining: 100,
            sales: 0,
            workers: 0,
            marketing: 0,
            transportation: 0
        }

        enterprises.workers_interval = window.setInterval(this.update, 15000);
    },

    load() {
        enterprises.current_view = "workers";

        let parent = $("<div>")
            .attr("id", "payroll_and_workers")
            .hide()
            .fadeIn()
            .appendTo($("#left"));

        let payroll_section = $("<div>")
            .attr("id", "payroll_section")
            .appendTo(parent);
        buttons.create({
            parent: "payroll_section",
            id: "payroll_back_to_desk",
            text: "Back to your desk",
            breaks: 0,
            on_click: function() {
                $("#payroll_and_workers")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                        
                        desk.load();
                    });
            }
        });
        $("<p>")
            .addClass("centered")
            .text("You'll need to balance your payroll in order to get the most profits out of your enterprise.")
            .appendTo(payroll_section);
        let payroll_header = $("<div>")
            .addClass("centered bold")
            .text("Payroll")
            .appendTo(payroll_section);
        $("<div>")
            .addClass("divider")
            .appendTo(payroll_header);
        let remaining = $("<div>")
            .attr("id", "remaining_payroll")
            .addClass("centered")
            .text("Remaining: 100%")
            .appendTo(payroll_section);
        $("<div>")
            .attr("id", "remaining_divider")
            .addClass("divider")
            .appendTo(remaining);
        let left = $("<div>")
            .attr("id", "payroll_section_left")
            .appendTo(payroll_section);
        let right = $("<div>")
            .attr("id", "payroll_section_right")
            .appendTo(payroll_section);
        let array = ["Sales", "Workers", "Marketing", "Transportation"];
        for (let index = 0; index < array.length; index++) {
            let item = array[index];
            let id = item.toLowerCase();

            $("<div>")
                .attr("id", "payroll_list_" + id)
                .addClass("payroll_list")
                .text(item + ": ")
                .appendTo(left);
            buttons.create({
                parent: "payroll_section_right",
                id: "payroll_" + id + "_min",
                classes: ["payroll_button"],
                text: "<<",
                breaks: 0
            });
            buttons.create({
                parent: "payroll_section_right",
                id: "payroll_" + id + "_subtract",
                classes: ["payroll_button"],
                text: "<",
                breaks: 0
            });
            $("<span>")
                .addClass("payroll_percent")
                .text("0%")
                .appendTo(right);
            buttons.create({
                parent: "payroll_section_right",
                id: "payroll_" + id + "_add",
                classes: ["payroll_button"],
                text: ">",
                breaks: 0
            });
            buttons.create({
                parent: "payroll_section_right",
                id: "payroll_" + id + "_max",
                classes: ["payroll_button"],
                text: ">>",
            });
        }
        let efficiency_header = $("<div>")
            .attr("id", "efficiency_header")
            .addClass("centered bold")
            .text("Payroll Efficiency: 100%")
            .appendTo(payroll_section);
        $("<div>")
            .addClass("divider")
            .appendTo(efficiency_header);
        $("<p>")
            .addClass("centered")
            .text("You payroll is flawless!")
            .appendTo(payroll_section);
        
        $("<div>")
            .addClass("divider worker_divider")
            .appendTo(parent);

        let worker_section = $("<div>")
            .attr("id", "worker_section")
            .appendTo(parent);
        let world_background = $("<div>")
            .addClass("pre")
            .html("                            ____<br>"
                + "                     ____  /__  -------____     ___----_   ____-----____        ______-----_<br>"
                + " ____---_____/\\   /\\/   /  _  \\_          /    _\\       \\_/             \\______/            \\<br>"
                + "/  ___         |_/      \\_/ |   \\     ___/   _/                                          ___/<br>"
                + "\\_/   \\                 ___/    /____/       \\                                      _--_ \\<br>"
                + "      /                /                  ___/    __   __                          /    \\_\\<br>"
                + "     /                |                  /      _/  \\ |  \\                        |       <br>"
                + "    |                /                   \\_ ___/     \\_\\  |__                      \\<br>"
                + "    |_       ____   |                  ___/ \\___--_        _/                       |<br>"
                + "      \\_    /    \\_/                __/            \\___  _/                          \\<br>"
                + "        \\__ \\___                   /                   --_                           /<br>"
                + "           ---_ ----__            /                     | \\                         |<br>"
                + "               |      \\_--_       \\___---_              | |   _---__               /<br>"
                + "               /           \\_             \\              \\_\\_/      \\      _---___/<br>"
                + "               \\            /              |               \\         |    /<br>"
                + "               |           |              /               _/         |   |<br>"
                + "                \\         /              |             __/            \\_/           ___<br>"
                + "                 |      _/                \\          _/                      ____---   \\_/|<br>"
                + "                 |     /                   |       _/                       /              \\<br>"
                + "                 \\    /                     \\_____/                        |                \\<br>"
                + "                  |  |                                                      \\__--____     __/<br>"
                + "                   \\_|                                                               \\___/<br>")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "pacific_label_1")
            .text("South Pacific Ocean")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "pacific_label_2")
            .text("North Pacific Ocean")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "atlantic_label_1")
            .text("North Atlantic Ocean")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "atlantic_label_2")
            .text("South Atlantic Ocean")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "indian_label")
            .text("Indian Ocean")
            .appendTo(worker_section);
        $("<div>")
            .attr("id", "worker_background_divider")
            .addClass("divider")
            .appendTo(worker_section);
    },

    update() {

    },

    update_desk_display() {

    }
}