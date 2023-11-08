export interface Suppliers{
    idSup: string;
    nameSup: string;
    phoneSup: string;
    addressSup: string;
    emailSup: string;
}

export type SuppliersEdit=Pick<Suppliers, 'nameSup'|'phoneSup'|'addressSup'|'emailSup'>