export interface Categories{
    idCat: string;
    nameCat: string;
    descriptionCat: string;
}

export type CategoriesEdit=Pick<Categories, 'nameCat'|'descriptionCat'>