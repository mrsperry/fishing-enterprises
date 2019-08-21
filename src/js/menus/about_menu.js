class about_menu {
    static show() {
        const popup = new modal("About");
        const box = popup.get_box();

        $("<p>")
            .addClass("centered")
            .html(
                "Fishing Enterprises was developed solely by myself,<br>Josh Sperry, in my free time to scratch the itch<br>of an expansive idle game. "
                + "It is heavily inspired by<br>"
                + "<a target='_blank' href='https://candybox2.github.io/'>Candybox 2</a>, "
                + "<a target='_blank' href='http://adarkroom.doublespeakgames.com/'>A Dark Room</a> and "
                + "<a target='_blank' href='http://www.decisionproblem.com/paperclips/'>Universal Paperclips</a>.<br><br>"
                + "The majority of the source code is written in<br>"
                + "<a target='_blank' href='https://www.javascript.com/'>Javascript</a> " 
                + "with <a target='_blank' href='https://jquery.com/'>jQuery</a> "
                + "and is freely available<br>to view on "
                + "<a target='_blank' href='https://github.com/mrsperry/mrsperry.github.io'>my Github</a>."
            )
            .appendTo(box);

        popup.add_close_button();
    }
}