export enum ResponseCode {
    //UnAuthorized
    UnAuthorized = 401,
    BadAuthorizationHeader = 40100,
    AccessTokenNotValid = 40101,
    Ok = 200,
    NoContent = 204,
    CreatedSuccess = 201,
    AlreadyExists = 409
}

export enum ResponseMessage {
    //UnAuthorized
    UnAuthorized = 'Incorrect email or password',
    BadAuthorizationHeader = 'Bad Authorization Header',
    AccessTokenNotValid = 'Access Token Is Not Valid'
}