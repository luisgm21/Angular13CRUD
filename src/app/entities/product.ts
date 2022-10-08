export class Product {
    name:string;
    category:string;
    freshness:string;
    price:number;
    comment: string;
    date: Date;

    constructor(name:string, category:string, freshness:string, price:number, comment: string, date: Date){
        this.name = name;
        this.category = category;
        this.freshness = freshness;
        this.price = price;
        this.comment = comment;
        this.date = date;
    }

    generarjson () {
        let json = {
            "productName": this.name,
            "category": this.category,
            "freshness": this.freshness,
            "price": this.price,
            "comment": this.comment,
            "date": this.date
        }
        return json;
    }
}
