export interface FinalRegistrationProducts{
    dniUserReceive:string;
    idSup:string;
    totalProduct:number;
    totalCost:number;
    products:any[];
    //
    // idProduct: string;
    idProductBelong: string;
    productName:string;
    productPrice: number;
    // quantity: number;
    productQty: number;
}

export type RegistrationProducts= Pick<FinalRegistrationProducts, 'idProductBelong'|'productName'|'productPrice'|'productQty'>
//this one i use only to create the list to fill in my table with products, i could use again it with output
export type Registration= Pick<FinalRegistrationProducts, 'dniUserReceive'|'idSup'|'totalProduct'|'totalCost'|'products'>