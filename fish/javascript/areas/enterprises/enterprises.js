var enterprises = {
    initialize() {
        this.vendor = vendor.create(3);
        this.research_vendor = vendor.create(3);

        this.desk_data = {};

        stocks.initialize();
        for (let index = 1; index < 4; index++) {
            stocks.create_stock(index);
        }

        desk.initialize();
        desk.load();
    }
}