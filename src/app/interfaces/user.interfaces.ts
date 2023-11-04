export interface User{
    dniUser: string;
    nameUser: string;
    lastNameUser: string;
    userName: string;
    passwordUser: string;
    userRole: string;
}

export type userLoginFields= Pick<User, 'userName' | 'passwordUser'>;