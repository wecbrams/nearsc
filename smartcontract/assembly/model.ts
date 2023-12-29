import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Product {
    id: string;
    name: string;
    description: string;
    image: string;
    location: string;
    price: u128;
    owner: string;
    sold: u32;
    supply: u32;
    available: bool;
    public static fromPayload(payload: Product): Product {
        const product = new Product();
        product.id = payload.id;
        product.name = payload.name;
        product.description = payload.description;
        product.image = payload.image;
        product.location = payload.location;
        product.price = payload.price;
        product.owner = context.sender;
        product.supply = payload.supply;
        product.available = true;
        return product;
    }
    public incrementSoldAmount(): void {
        this.sold = this.sold + 1;
    }
    
    public updateAvailability(): void {
        if(this.sold >= this.supply) {
            this.available = false;
        }
        else if(this.supply >= 1) {
            this.available = true;
        }
        else{
            this.available = true;
        }
    }
}

export const listedProducts = new PersistentUnorderedMap<string, Product>("LISTED_PRODUCTS");