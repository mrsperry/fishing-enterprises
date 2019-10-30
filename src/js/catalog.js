class catalog {
    static page = 0;

    static show() {
        catalog.page = 0;
        catalog.popup = new modal();

        css.load(["catalog"]);

        const content = $("<div>")
            .attr("id", "catalog-content")
            .addClass("flex flex-justify-center")
            .appendTo(catalog.popup.get_box());

        $("<div>")
            .attr("id", "page-left")
            .addClass("page")
            .appendTo(content);
        $("<div>")
            .attr("id", "catalog-divider")
            .appendTo(content);
        $("<div>")
            .attr("id", "page-right")
            .addClass("page")
            .appendTo(content);

        catalog.popup.add_close_button();
        new button({
            parent: "#button-holder",
            id: "previous-page",
            text: "Previous Page",
            prepend: true,
            on_click: () => {
                catalog.set_page_content(--catalog.page);
            }
        });
        new button({
            parent: "#button-holder",
            id: "next-page",
            text: "Next Page",
            on_click: () => {
                catalog.set_page_content(++catalog.page);
            }
        });

        const list = area_data.get_data();
        catalog.pages = [];
        for (const index in list) {
            const data = list[index];

            if (index != "lake") {
                catalog.pages.push(data);
            }

            for (const fish_index in data.fish) {
                catalog.pages.push(data.fish[fish_index]);
            }
        }

        catalog.set_page_content(catalog.page);
    }

    static set_page_content(page) {
        catalog.page = page;

        const left = $("#page-left")
            .empty();
        const right = $("#page-right")
            .empty()
            .show();
        const divider = $("#catalog-divider")
            .show();
        const previous = $("#previous-page-button")
            .css("visibility", "");
        const next = $("#next-page-button")
            .css("visibility", "");

        if (page == 0) {
            divider.hide();
            right.hide();
            previous.css("visibility", "hidden");

            const parent = $("<div>")
                .addClass("centered")
                .appendTo(left);

            $("<div>")
                .attr("id", "catalog-title")
                .addClass("bold")
                .text("Fishing Catalog")
                .appendTo(parent);
            $("<div>")
                .attr("id", "catalog-subtitle")
                .addClass("bold")
                .text("Volume IV")
                .appendTo(parent);
            $("<div>")
                .text("Based on \"Fisherman's Pocket Guide\"")
                .appendTo(parent);
        } else if (page == 1) {
            $("<div>")
                .addClass("centered bold")
                .text("Fishing Locations")
                .appendTo(left);
            $("<div>")
                .addClass("catalog-area-break")
                .appendTo(left);

            const areas = $("<div>")
                .attr("id", "catalog-area-selector")
                .addClass("flex")
                .appendTo(left);

            const list = area_data.get_data();
            for (const index in list) {
                const data = list[index];
                const purchased = data.purchased;

                const section = $("<div>")
                    .attr("id", data.internal + "-selector-section")
                    .appendTo(areas);

                const area = $("<div>")
                    .addClass("catalog-area centered " + (purchased ? "link" : ""))
                    .text(purchased ? data.display : "???")
                    .click(() => {
                        if (purchased) {
                            catalog.set_page_content(catalog.find_page(index));
                        }
                    })
                    .appendTo(section);
                $("<div>")
                    .addClass("catalog-area-break")
                    .appendTo(area);

                const fish_list = $("<ol>")
                    .addClass("area-fish-list")
                    .appendTo(section);

                for (const fish_index in data.fish) {
                    const fish = data.fish[fish_index];
                    const caught = fish.caught;

                    $("<li>")
                        .addClass(caught ? "link" : "")
                        .text(caught ? fish.display : "???")
                        .click(() => {
                            if (caught) {
                                catalog.set_page_content(catalog.find_page(fish_index));
                            }
                        })
                        .appendTo(fish_list);
                }
            }

            catalog.set_area_page(right, "Lake");
        } else {
            const real_page_number = ((catalog.page + 1) * 2) - 6;
            const areas = area_data.get_data();

            const create_page = (index) => {
                const page = catalog.pages[index];
                const side = index == real_page_number ? left : right;

                if (areas.hasOwnProperty(page.internal)) {
                    if (page == null) {
                        next.css("visibility", "hidden");
                        return;
                    }

                    catalog.set_area_page(side, page.display);
                } else {
                    $("<div>")
                        .addClass("pre fish-page-top-decor")
                        .text(art_data.get("catalog", "fish-page-top-decor"))
                        .appendTo(side);

                    catalog.set_fish_page(side, page);

                    const footer = $("<div>")
                        .addClass("pre fish-page-bottom-decor")
                        .text(art_data.get("catalog", "fish-page-bottom-decor"))
                        .appendTo(side);
                    $("<div>")
                        .addClass("centered fish-page-number")
                        .text("- " + (index + 2) + " -")
                        .appendTo(footer);
                }
            };

            create_page(real_page_number);
            create_page(real_page_number + 1);

            if ((real_page_number + 2) == catalog.pages.length) {
                next.css("visibility", "hidden");
            }
        }
    }

    static set_area_page(element, name) {
        const holder = $("<div>")
            .addClass("flex flex-centered area-page")
            .appendTo(element);

        $("<div>")
            .addClass("pre")
            .text(art_data.get("catalog", "trident"))
            .appendTo(holder);
        $("<div>")
            .addClass("area-page-header")
            .text(name)
            .appendTo(holder);
    }

    static set_fish_page(element, data) {
        const caught = data.caught;

        $("<div>")
            .addClass("centered bold")
            .text(caught ? data.display : "???")
            .appendTo(element);
        $("<div>")
            .addClass("catalog-area-break header-break")
            .appendTo(element);
        
        $("<div>")
            .text("Scientific name: " + (caught ? data.catalog.name : "???"))
            .appendTo(element);
        $("<div>")
            .text("Average length: " + (caught ? data.catalog.length : "???"))
            .appendTo(element);
        $("<div>")
            .text("Average weight: " + (caught ? data.catalog.weight : "???"))
            .appendTo(element);

        const prefix = "Shop price: ";
        const price = data.internal == "minnows" ? "Cannot be sold." : "$" + data.price;
        $("<div>")
            .text(prefix + (caught ? price : "???"))
            .appendTo(element);

        const tables = $("<div>")
            .addClass("flex flex-justify-center fish-table")
            .appendTo(element);
        const create_table = (header, elements) => {
            if (elements == null || !caught) {
                $("<div>")
                    .addClass("centered none-message")
                    .text(caught ? ("No " + header.toLowerCase() + " required!") : "")
                    .appendTo(tables);
                return;
            }

            const table = $("<table>")
                .appendTo(tables);
            $("<div>")
                .addClass("centered bold")
                .text(header)
                .appendTo(table);

            const headers = $("<tr>")
                .appendTo(table);
            $("<th>")
                .text("Type")
                .appendTo(headers);
            $("<th>")
                .text("#")
                .appendTo(headers);

            for (const item of elements) {
                const row = $("<tr>")
                    .appendTo(table);

                let type;
                if (header == "Bait") {
                    if (item.type == "minnows") {
                        type = area_data.get("lake").fish[item.type];
                    } else {
                        type = fishing_data.get_bait(item.type);
                    }
                } else {
                    type = fishing_data.get_tackle(item.type);
                }

                $("<td>")
                    .text(type.display)
                    .appendTo(row);
                $("<td>")
                    .addClass("centered")
                    .text(item.amount)
                    .appendTo(row);
            }
        };

        create_table("Bait", data.bait);
        create_table("Tackle", data.tackle);

        if (caught) {
            for (let paragraph of data.catalog.description) {
                $("<div>")
                    .addClass("centered description-paragraph")
                    .text(paragraph)
                    .appendTo(element);
            }
        }
    }
    
    static find_page(internal) {
        console.log(catalog.pages);
        for (let index = 0; index < catalog.pages.length; index++) {
            const data = catalog.pages[index];

            if (data.internal == internal) {
                let result = index;
                if (result % 2 != 0) {
                    result--;
                }

                console.log("Jumping to: " + ((result / 2) + 2));
                return (result / 2) + 2;
            }
        }

        return 1;
    }
}