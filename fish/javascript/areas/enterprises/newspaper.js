let newspaper = {
    initialize() {
        enterprises.newspaper_interval = window.setInterval(this.update, 15000);
    },

    load() {
        let left = $("#market_share_section");

        let box = $("<div>")
            .attr("id", "progress_box")
            .appendTo(left);
        let header = $("<div>")
            .addClass("centered bold")
            .text("Global Market Share")
            .appendTo(box);
        $("<div>")
            .attr("id", "progress_divider")
            .addClass("divider")
            .appendTo(header);
        $("<div>")
            .attr("id", "progress_text")
            .addClass("centered")
            .text("0%")
            .appendTo(box);
        
        $("<p>")
            .addClass("newspaper_content")
            .text("A local business has recent gone corporate in an attempt to make it's way into the global fishing market.")
            .appendTo(left);
        $("<p>")
            .addClass("newspaper_content")
            .text("The CEO of Fishing Enterprises told us in an interview that they are making substantial progress.")
            .appendTo(left);
        $("<p>")
            .addClass("newspaper_content")
            .text("Fishing Enterprises currently holds none of the global market share.")
            .appendTo(left);

        let right = $("#insignificant_news_section");
        let previous = {
            country: null,
            actions: null,
            subjects: null,
            effects: null
        }
        for (let index = 0; index < 5; index++) {
            let result = news.get_insignificant_text(previous);
            previous = result.previous;

            $("<p>")
                .addClass("newspaper_content")
                .text(result.text)
                .appendTo(right);
        }
    },

    update() {

    }
}