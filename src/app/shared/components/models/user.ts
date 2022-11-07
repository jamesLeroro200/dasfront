import {Role} from './Role'
import { SuperUser } from './super-user';
export class User {
  
    id : String;
    firstName : String;
    lastName: String; 
    email:String ; 
    phone : String; 
    status : boolean;
    address : String;
    dateOfBirth : Date;
    country: String; 
    region : String; 
    zip : String; 
    password : String;
    roles : Role[];
    linkedSuperUser ?:SuperUser;
    listIdBusinessSectors:String[];
    listIdBranchCode:String[];
    recognizedStandards:String;
   
    constructor( id : String, name : String, lastName: String, email:String ,
         phone : String, status : boolean,address : String ,dateOfBirth : Date,
         country: String, region : String, zip : String, password : String, 
         roles : Role[],listIdBusinessSectors:String[],listIdBranchCode:String[], recognizedStandards:String){}

}
