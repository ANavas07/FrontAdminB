export interface Products{
    idProduct: string;
    idCatBelong: string;
    productName:string;
    productPrice: number;
    stock: number;
    available: boolean;
}

export type ProductsEdit= Pick<Products, 'idCatBelong'|'productName'|'productPrice'|'stock'|'available'>