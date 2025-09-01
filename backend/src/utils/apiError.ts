
interface IApiError {
    statusCode: number;
    success: boolean;
    message: string;
    errors?: any[];
    data?: null;
}

export class ApiError extends Error implements IApiError {
    statusCode: number;
    success: boolean;
    errors?: any[];
    data?: null;

    constructor(
        statusCode: number,
        message = "Something went wrong",
        errors:any[] = [],
        stack?:string

    ){
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;
        this.data = null;
        if(stack){
            this.stack = stack;
        }
    }
}