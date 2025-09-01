
interface IApiResponse<T=any> {
    statusCode:number;
    success:boolean;
    data?:T;
    message?:string;
}

export class ApiResponse<T=any> implements IApiResponse<T>{
    statusCode: number;
    success: boolean;
    data?: T;
    message?: string;

    constructor(statusCode:number, data?: T, message?: string){
        this.statusCode = statusCode;
        this .data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

