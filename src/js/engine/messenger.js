class messenger {
    static messages = [];

    static initialize() {
        const section = $("#top-section")
            .fadeIn();
        const parent = $("<div>")
            .attr("id", "message-history")
            .appendTo(section);
            
        for (let index = 4; index >= 0; index--) {
            const container = $("<div>")
                .addClass("message-history")
                .css("opacity", 1.0 - (index / 10))
                .text(index == 0 ? "~> " : "-  ")
                .appendTo(parent);
            $("<span>")
                .attr("id", "history-message-" + (index + 1))
                .appendTo(container);
        }
    }

    static write(string) {
        const messages = messenger.messages;

        // Filter out duplicate messages
        if (string == messages[0]) {
            return;
        }

        // Add item to the start of the array
        messages.unshift(string);

        // Remove item from the end of the array
        if (messages.length > 5) {
            messages.pop();
        }

        for (let index = 0; index < messages.length; index++) {
            $("#history-message-" + (index + 1))
                .text(messages[index]);
        }
    }
}