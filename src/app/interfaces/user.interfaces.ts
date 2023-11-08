export interface User{
    dniUser: string;
    nameUser: string;
    lastNameUser: string;
    userName: string;
    passwordUser: string;
    userRole: string;
}

export type UserEdit= Pick<User, 'nameUser'|'lastNameUser'|'userName'>
export type UserLoginFields= Pick<User, 'userName' | 'passwordUser'>;