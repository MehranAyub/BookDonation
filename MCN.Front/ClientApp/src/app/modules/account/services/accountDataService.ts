import { Injectable } from "@angular/core";
import { EmailPasscodeDto } from "../models/UserLogin";

@Injectable({
    providedIn: 'root'
  })
  export class AccountDataService {
  
    public _emailPasscode:EmailPasscodeDto={email:'',passcode:''};
}  