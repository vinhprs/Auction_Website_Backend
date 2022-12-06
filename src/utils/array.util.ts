import { Product } from "../modules/product/entities/product.entity";

export function removeElement(product: Product, index: number, arr: Product[], removeValue: string) {

    if (product.Product_ID === removeValue) {
        arr.splice(index, 1);
    }
}
