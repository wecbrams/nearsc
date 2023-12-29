import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createProduct(product) {
  product.id = uuid4();
  product.price = parseNearAmount(product.price + "");
  return window.contract.setProduct({ product }); // set_product for the Rust contract
}

export function getProducts() {
  return window.contract.getProducts(); // get_products for the Rust contract
}

export async function buyProduct({ id, price }) {
  await window.contract.buyProduct({ productId: id }, GAS, price); // buy_product for the Rust contract
}

export async function deleteProduct(id) {
  await window.contract.deleteProduct({id});
}

export async function updateProduct(id, _name, _description, _image, _location, _price) {
  _price = Number(_price + "");

  await window.contract.updateProduct({ id, _name, _description, _image, _location, _price });
}