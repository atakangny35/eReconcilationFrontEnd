export interface Company {
    id: number;
    name: string;
    address: string;
    taxDepartment: string;
    taxIdNumber: string;
    identityNumber: string;
    addedTime: Date;
    IsActive: boolean


}

export class registerModel {
    userRegisterModel:UserRegisterModel;
    company:Company;

}

export interface UserRegisterModel{
    name:string;
    email:string;
    password:string;
}

