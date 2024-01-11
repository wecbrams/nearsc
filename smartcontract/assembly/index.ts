import { PersistentUnorderedMap } from "near-sdk-as";
import { ContractPromiseBatch, context, u128 } from 'near-sdk-as';
import { Product, listedProducts } from './model';
export const products = new PersistentUnorderedMap<string, string>("PRODUCTS");



export function setProduct(product: Product): void {
    let storedProduct = listedProducts.get(product.id);  // // Instead of using `products`, use `listedProducts` consistently
    if (storedProduct !== null) {
        throw new Error(`a product with ${product.id} already exists`);
    }
    listedProducts.set(product.id, Product.fromPayload(product));
}

export function getProduct(id: string): Product | null {
    return listedProducts.get(id);
}

export function getProducts(): Product[] {
    return listedProducts.values();
}

export function getProductslength(): number {
    return listedProducts.values().length;
}

export function buyProduct(productId: string): void {
    const product = getProduct(productId);

    // check for the availability of the product before proceeding with other checks.

    if(product) {
        product.updateAvailability()
    }
    
    if (product == null) {
        throw new Error("product not found");
    }
    if (product.price.toString() != context.attachedDeposit.toString()) {
        throw new Error("attached deposit should equal to the product's price");
    }
    if (product.available === false) {
        throw new Error ("Product has finished")
    }
    
    
    ContractPromiseBatch.create(product.owner).transfer(context.attachedDeposit);
    product.incrementSoldAmount();
    listedProducts.set(product.id, product);
}

export function deleteProduct(id: string): void {
    let product = listedProducts.get(id);
    if (product == null) {
        throw new Error(`Product ${id} does not exist`);
    }
    
    // if(context.sender === product.owner)
    else {listedProducts.delete(id)};

    // else {
    //     throw new Error(`You are not the product owner`);
    // }
}

export function  updateProduct(
    id: string, 
    _name: string,
    _description: string,
    _image: string,
    _location: string,
    _price: u128,
    _supply: u32
    ): void {
        const product = listedProducts.get(id);

        if (product == null) throw new Error("product not found");
        else {

            assert(_description.length > 0, "Empty description");
            assert(_location.length > 0, "Invalid location");
            assert(_image.length > 0, "Invalid image url");
            assert(_name.length > 0, "Empty name");
            assert(_supply > 0, "Enter value greater than zero");

            product.name = _name;
            product.description = _description;
            product.image = _image;
            product.location = _location;
            product.price = _price;
            product.supply = _supply;


            listedProducts.set(product.id, product);
        }
    }
