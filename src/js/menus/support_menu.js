class support_menu {
    static show() {
        const popup = new modal("Support Me");
        const box = popup.get_box();

        $("<p>")
            .addClass("centered")
            .html(
                "Donate to me <a href='https://www.paypal.com/paypalme2/fishingenterprises' target='_blank'>via Paypal</a>.<br><br>"
                + "Support me <a href='https://www.patreon.com/fishingenterprises' target='_blank'>via Patreon</a>.<br><br>"
                + "Follow the <a href='https://twitter.com/FishEnterprises' target='_blank'>official Twitter</a>.<br><br>"
                + "Email me at mrjoshuasperry@gmail.com"
            )
            .appendTo(box);

        popup.add_close_button();
    }
}