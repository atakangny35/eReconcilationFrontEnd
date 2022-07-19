export interface ResponseModel{
    success:boolean;
    message:string;
}

export interface listDataResponseModel<T> extends ResponseModel{
    data:T[];
}

export interface singleDataResponseModel<T> extends ResponseModel{
    data:T;
}