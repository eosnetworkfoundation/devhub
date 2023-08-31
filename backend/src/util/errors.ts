export class CustomError {
    public error:boolean = true;
    public error_msg:string;

    constructor(msg:string){
        this.error_msg = msg;
    }

}

export default class Errors {

    // USERS -----------------------------------------------------------------------

    static noSuchUser(){
        return new CustomError(`no_such_user`)
    }

    static userExists(){
        return new CustomError(`user_exists`)
    }

    static invalidUserCreateRequest(reason:string = "unknown"){
        return new CustomError(`malformed_user_create_request_data:${reason}`)
    }

    static invalidUserCreateRequestKey(){
        return new CustomError(`malformed_user_create_request_data_key`)
    }

    static invalidUserUpdateRequest(reason:string = "unknown"){
        return new CustomError(`malformed_user_update_request_data::${reason}`)
    }

    static cantFindCourse(){
        return new CustomError(`cant_find_course`)
    }

    static courseNotFinishedYet(){
        return new CustomError(`course_still_in_progress`)
    }

    static cantFindCourseProgress(){
        return new CustomError(`cant_find_course_progress`)
    }

    static noSuchCourse(){
        return new CustomError(`no_such_course`)
    }

    static authenticationError(){
        return new CustomError(`authentication_error`)
    }

    static tokenExpired(){
        return new CustomError(`token_expired`)
    }


    // GENERIC ------------------------------------------------------------------------

    static databaseError(){
        return new CustomError(`There was an error with our database. Please try again in a few moments.`)
    }

}
