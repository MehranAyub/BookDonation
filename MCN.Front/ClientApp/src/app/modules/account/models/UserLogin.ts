export interface emailDto {
 
    userName: string; 
}

export interface LoginDto {
    email: string;
    password: string; 
}

export interface EmailPasscodeDto {
    email: string;
    passcode: string; 
}

export interface CreateUserDto{ 
     FirstName:string ;
     LastName:string ;
     Gender:string ;
     Email:string ;
     Password:string ;
     Phone:string ;
     Country:string ;
     Address:string ; 
     BaseURL:string ;
     IpAddress:string ;
}

