class Store{
    constructor(Address = '', Quantity = 0){
        this.Address = Address;
        this.Quantity = Quantity;
    }
}

class Product{
    constructor(Name = '', StoreList = [], SKU = '', Description = '', StoreCode = ''){
        this.Name = Name;
        this.StoreList = StoreList;
        this.SKU = SKU;
        this.Description = Description;
        this.StoreCode = StoreCode
    }
}
