export interface OperationClaim{
    id:number;
    name:string;
    description:string;
    addedtime: Date;
}

export interface userOperationClaim{
    id:number;
    userid:number;
    operationClaimid:number
    operationClaimName:string;
    operationClaimDescription:string;
    companyId:number;
}