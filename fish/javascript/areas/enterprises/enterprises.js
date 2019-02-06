var enterprises = {
    initialize() {
        main.remove_elements(["resource_counters", "resource_buttons", "area_selector"]);

        this.vendor = vendor.create(3);
        this.research_vendor = vendor.create(3);

        stocks.initialize();
        for (let index = 1; index < 4; index++) {
            stocks.create_stock(index);
        }

        desk.initialize();
    }
}