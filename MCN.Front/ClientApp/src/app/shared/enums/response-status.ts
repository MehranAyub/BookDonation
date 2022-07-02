export enum ResponseStatus {
    /// <summary>
    /// Success 
    /// </summary>
    OK = 200,
    /// <summary>
    /// Error
    /// </summary>
    Error = 400,
    /// <summary>
    /// Info 
    /// </summary>
    Info = 1,
    /// <summary>
    /// Warning
    /// </summary>
    Warning = 3,
    /// <summary>
    /// LimitExceeded
    /// </summary>
    LimitExceeded = 4,
    /// <summary>
    /// Forbidden
    /// </summary>
    Forbidden = 5,
    /// <summary>
    /// Unauthorized
    /// </summary>
    Unauthorized = 401,
    BadRequest=404
}