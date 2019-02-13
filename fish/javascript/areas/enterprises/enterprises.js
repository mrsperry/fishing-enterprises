var enterprises = {
    initialize() {
        this.vendor = vendor.create(3);
        this.research_vendor = vendor.create(3);
        this.desk_data = {};

        stocks.initialize();
        desk.initialize();
        
        desk.load();
    }
}