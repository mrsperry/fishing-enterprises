var catalog = {
    purchase() {
        this.purchased = true;

        $("<div>")
            .addClass("divider area_divider")
            .appendTo($("#area_selector"));
        buttons.create({
            parent: "area_selector",
            id: "catalog",
            text: "Catalog",
            on_click: function() {
                catalog.show();
            }
        })
    },

    show() {
        this.indices = ["index"];

        for (let name of areas.fish_list) {
            let area = window[name];
            if (area.unlocked != null && area.unlocked) {
                this.indices.push(name);

                for (let fish of area.state.fish) {
                    this.indices.push(fish.internal);
                    remove = false;
                }
            }
        }

        let overlay =  $("<div>")
            .attr("id", "overlay")
            .hide()
            .fadeIn()
            .appendTo($("body"));
        let catalog = $("<div>")
            .attr("id", "catalog")
            .appendTo(overlay);

        let content = $("<div>")
            .attr("id", "content")
            .appendTo(catalog);
        $("<div>")
            .attr("id", "catalog_left")
            .appendTo(content);
        $("<div>")
            .attr("id", "catalog_right")
            .appendTo(content);
        $("<div>")
            .addClass("page_divider")
            .appendTo(content);

        buttons.create({
            parent: "catalog",
            classes: ["popup_button"],
            text: "Close",
            breaks: 0,
            on_click: function() {
                $("#overlay")
                    .fadeOut(400, function() {
                        $(this)
                            .remove();
                    });
            }
        });

        this.load_page(0);
    },

    load_index() {
        this.index = 0;

        let parent = $("#catalog_left");

        let art = $("<div>")
            .addClass("pre")
            .appendTo(parent);
        let text = $.parseHTML(
              " /\\  /    <><             <><<br>"
            + "/  \\/                           /\\  /  <><<br>"
            + "\\  /\\            /\\  /         /  \\/<br>"
            + " \\/  \\  <><     /  \\/          \\  /\\<br>"
            + "                \\  /\\           \\/  \\     <><<br>"
            + "<><              \\/  \\");
        $(text)
            .appendTo(art);

        let title = $("<h3>")
            .addClass("catalog_title centered")
            .text("Fisherman's Pocket Guide")
            .appendTo(parent);
        $("<div>")
            .addClass("divider")
            .appendTo(title);
        
        let content = $("<div>")
            .attr("id", "left_page")
            .appendTo(parent);

        for (let name of areas.fish_list) {
            let area = window[name];

            if (area.unlocked == null) {
                continue;
            }

            let section = $("<div>")
                .attr("id", name + "_section")
                .addClass("index_section")
                .appendTo(content);
            let header = $("<div>")
                .addClass("index_header centered")
                .text(area.display)
                .appendTo(section);
            $("<div>")
                .addClass("divider")
                .appendTo(header);

            let list = $("<ol>")
                .addClass("index_list")
                .appendTo(section);
            
            let link = false;
            for (let index = 0; index < area.state.fish.length; index++) {
                let fish = area.state.fish[index];

                let item = $("<li>")
                    .appendTo(list);
                let text = $("<span>")
                    .appendTo(item);
                if (fish.caught != null && fish.caught) {
                    $(text)
                        .addClass("link")
                        .text(fish.display)
                        .click(function() {
                            let index = catalog.get_fish_index(fish.internal);
                            catalog.load_page(index % 2 == 0 ? index : index - 1);
                        });

                    link = true;
                } else {
                    $(text)
                        .text("???");
                }
            }

            if (link) {
                $(header)
                    .addClass("link")
                    .click(function () {
                        let index = catalog.get_area_index(area.internal);
                        catalog.load_page(index % 2 == 0 ? index : index - 1);
                    });
            }

            if (name == "spear_fishing") {
                $(section)
                    .addClass("align_top");
            }
        }

        let bottom = $("<div>")
            .addClass("catalog_bottom_art")
            .appendTo(parent);
        $("<div>")
            .addClass("divider divider_bottom")
            .appendTo(bottom);

        let art2 = $("<div>")
            .addClass("pre")
            .appendTo(bottom)
        let text2 = $.parseHTML(
                "  <><                              <><  /\\  /<br>"
                + "             <><          /\\  /        /  \\/<br>"
                + "      /\\  /              /  \\/         \\  /\\<br>"
                + "     /  \\/               \\  /\\          \\/  \\<br>"
                + "     \\  /\\       <><      \\/  \\<br>"
                + "<><   \\/  \\                            <><<br>");
        $(text2)
            .appendTo(art2);
    },

    load_page(index) {
        this.index = index;

        let create_page = (text, side) => {
            let parent = $("#catalog_" + side)
                .empty();
            if (areas.fish_list.includes(text)) {
                $("<h3>")
                    .addClass("centered vertical_center")
                    .text("~ ~ ~ ~ ~ " + window[text].display + " ~ ~ ~ ~ ~")
                    .appendTo(parent);

                let art = $.parseHTML(
                      "                   /\\<br>"
                    + "                  //\\\\<br>"
                    + "            /\\   //  \\\\   /\\<br>"
                    + "           //\\\\  \\ /\\ /  //\\\\<br>"
                    + "           |  |   |  |   |  |<br>"
                    + "            \\  \\  |  |  /  /<br>"
                    + "             \\  \\ |  | /  /<br>"
                    + "              \\  \\|  |/  /<br>" 
                    + "   _______     \\   /\\   /     _______<br>"
                    + "  / _____ \\     \\ /  \\ /     / _____ \\<br>"  
                    + " / /     \\ \\     \\ /\\ /     / /     \\ \\<br>"
                    + "/ /  /\\__/ /      |  |      \\ \\__/\\  \\ \\<br>"
                    + "\\ \\_ \\____/       |  |       \\____/ _/ /<br>"
                    + " \\_ \\_            |  |            _/ _/<br>"
                    + "   \\_ \\_          |  |          _/ _/<br>"
                    + "     \\_ \\_        |  |        _/ _/<br>"
                    + "       \\_ \\       |  |       / _/<br>"
                    + "         \\ \\      |  |      / /<br>"
                    + "          \\ \\     |  |     / /<br>"
                    + "           \\ \\   /    \\   / /<br>"
                    + "<br>"
                    + "           / /   \\    /   \\ \\<br>"
                    + "          / /     |  |     \\ \\<br>"
                    + "        _/ /      |  |      \\ \\_<br>"
                    + "      _/ _/       |  |       \\_ \\_<br>"
                    + "    _/ _/         |  |         \\_ \\_<br>"
                    + "  _/ _/           |  |           \\_ \\_<br>"
                    + " / _/ ____        |  |        ____ \\_ \\<br>"
                    + "/ /  / __ \\       |  |       / __ \\  \\ \\<br>"
                    + "\\ \\  \\/  \\ \\      |  |      / /  \\/  / /<br>"
                    + " \\ \\_____/ /     / \\/ \\     \\ \\_____/ /<br>"
                    + "  \\_______/     / \\  / \\     \\_______/<br>"
                    + "               /   \\/   \\<br>"
                    + "              /  /|  |\\  \\<br>"
                    + "             /  / |  | \\  \\<br>"
                    + "            /  /  |  |  \\  \\<br>"
                    + "           |  |   |  |   |  |<br>"
                    + "           \\\\//  / \\/ \\  \\\\//<br>"
                    + "            \\/   \\\\  //   \\/<br>"
                    + "                  \\\\//<br>"
                    + "                   \\/<br>"
                );

                let section = $("<div>")
                    .addClass("area_catalog_art pre")
                    .appendTo(parent);

                $(art)
                    .appendTo(section);
            } else {
                let fish = (text == "minnows" ? resources.bait.minnows : resources.fish[text]);
                let caught = fish.caught;
                
                let art_section = $("<div>")
                    .addClass("fish_catalog_art pre")
                    .appendTo(parent);
                let art = "";
                let source = caught == true ? fish.catalog.art : ["", "", "", "", "???"];
                for (let string of source) {
                    art += string + "<br>";
                }
                art = $.parseHTML(art);
                $(art)
                    .appendTo(art_section);
                
                let title = $("<h3>")
                    .addClass("catalog_title fish_title centered")
                    .text(caught ? fish.display : "???")
                    .appendTo(parent);
                $("<div>")
                    .addClass("divider")
                    .appendTo(title);
                
                let content_section = $("<div>")
                    .appendTo(parent);
                let info_content = $("<div>")
                    .appendTo(content_section);
                let table_content = $("<div>")
                    .appendTo(content_section);
                $("<div>")
                    .addClass("divider")
                    .appendTo(content_section);
                let text_content = $("<div>")
                    .appendTo(content_section);
                
                $("<p>")
                    .text("Scientific name: " + (caught ? fish.catalog.name : "???"))
                    .appendTo(info_content);
                $("<p>")
                    .text("Average length: " + (caught ? fish.catalog.length : "???"))
                    .appendTo(info_content);
                $("<p>")
                    .text("Average weight: " + (caught ? fish.catalog.weight : "???"))
                    .appendTo(info_content);
                
                let bait_section = $("<div>")
                    .addClass("fish_table_section")
                    .appendTo(table_content);
                let vertical = $("<div>")
                    .addClass("table_divider")
                    .appendTo(table_content);
                let tackle_section = $("<div>")
                    .addClass("fish_table_section")
                    .appendTo(table_content);
                let bait_title = $("<h3>")
                    .addClass("fish_table_title centered")
                    .text("Bait")
                    .appendTo(bait_section);
                $("<div>")
                    .addClass("divider")
                    .appendTo(bait_title);
                let tackle_title = $("<h3>")
                    .addClass("fish_table_title centered")
                    .text("Tackle")
                    .appendTo(tackle_section);
                $("<div>")
                    .addClass("divider")
                    .appendTo(tackle_title);
                
                let create_table = (type, is_bait, parent) => {
                    let table = $("<table>")
                        .addClass("fish_table")
                        .appendTo(parent);
                    let headers = $("<tr>")
                        .appendTo(table);
                    $("<th>")
                        .addClass("fish_table_header")
                        .text("Type")
                        .appendTo(headers);
                    $("<th>")
                        .text("Amount")
                        .appendTo(headers)
                    for (let item of type) {
                        let data = $("<tr>")
                            .appendTo(table);

                        let display = item == "???" ? item : 
                            resources[(is_bait ? "bait" : "tackle")][item.type].display;
                        $("<td>")
                            .addClass("fish_table_data")
                            .text(display)
                            .appendTo(data);
                        $("<td>")
                            .addClass("fish_table_data")
                            .text(item.amount == null ? "???" : item.amount)
                            .appendTo(data);
                    }
                }

                let create_text = (type, parent) => {
                    $("<p>")
                        .addClass("fish_nothing centered")
                        .text("You do not need any " + type + " to catch this fish.")
                        .appendTo(parent);
                }

                if (caught) {
                    let bait_short = true;
                    let tackle_short = true;
                    if (fish.bait != null) {
                        bait_short = fish.bait.length == 1;
                        create_table(fish.bait, true, bait_section);
                    } else {
                        create_text("bait", bait_section);
                    }
                    if (fish.tackle != null || !caught) {
                        tackle_short = fish.tackle.length == 1;
                        create_table(fish.tackle, false, tackle_section);
                    } else {
                        create_text("tackle", tackle_section);
                    }

                    if ((bait_short && tackle_short)) {
                        $(vertical)
                            .addClass("table_divider_short");
                    }
                } else {
                    create_table(["???"], false, bait_section);
                    create_table(["???"], false, tackle_section);
                    $(vertical)
                        .addClass("table_divider_short");
                }

                let description = caught ? fish.catalog.description : ["???"];
                for (let message of description) {
                    let paragraph = $("<p>")
                        .text(message)
                        .appendTo(text_content);
                    if (message == "???") {
                        $(paragraph)
                            .addClass("centered");
                    }
                }
                let display = fish.display;
                if (["Minnows", "Crawdads", "Crabs"].includes(display)) {
                    display = display.substring(0, display.length - 1);
                }
                let info = $.parseHTML(
                    "Under normal conditions you will have around a "
                    + "<span class='bold'>" + fish.chance + "%</span>"
                    + " chance to catch a " + display + ". "
                    + (fish.internal != "minnows" ? "The average market price is "
                    + "<span class='bold'>$" + main.stringify(fish.price) + "</span>." 
                    : "They are too common to be sold anywhere.")
                );
                if (caught) {
                    $(info)
                        .appendTo(text_content);
                }
                
                let return_section = $("<div>")
                    .addClass("catalog_return centered")
                    .appendTo(parent);
                $("<div>")
                    .addClass("divider")
                    .appendTo(return_section);
                $("<div>")
                    .addClass("catalog_return_link link")
                    .text("Return to index")
                    .click(function() {
                        catalog.load_page(0);
                    })
                    .appendTo(return_section);
                $("<div>")
                    .addClass("divider")
                    .appendTo(return_section);
            }
        }

        if (index == 0) {
            $("#catalog_left")
                .empty();
            this.load_index();
        } else {
            create_page(this.indices[index], "left");
        }
        let second_index = this.indices[index + 1];
        if (second_index != null) {
            create_page(second_index, "right");
        } else {
            $("#catalog_right")
                .empty();
        }

        $("#catalog_next_button")
            .remove();
        $("#catalog_previous_button")
            .remove();
        
        if (this.indices[this.index + 2] != null) {
            buttons.create({
                parent: "content",
                id: "catalog_next",
                classes: ["popup_button"],
                text: "Next",
                hide: false,
                breaks: 0,
                on_click: function() {
                    catalog.index += 2;
                    catalog.load_page(catalog.index);
                }
            });
        }
        if (catalog.index != 0) {
            buttons.create({
                parent: "content",
                id: "catalog_previous",
                classes: ["popup_button"],
                text: "Previous",
                hide: false,
                breaks: 0,
                on_click: function() {
                    catalog.index -= 2;
                    catalog.load_page(catalog.index);
                }
            });
        }
    },

    get_area_index(area) {
        let index = 1;
        for (let name of areas.fish_list) {
            if (name == area) {
                return index;
            }

            index += (1 + window[name].state.fish.length);
        }
    },

    get_fish_index(fish) {
        let index = 0;
        for (let name of areas.fish_list) {
            index++;

            for (let data of window[name].state.fish) {
                index++;

                if (data.internal == fish) {
                    return index;
                }
            }
        }
    }
}