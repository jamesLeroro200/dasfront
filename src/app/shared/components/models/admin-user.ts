import { Photo } from './photo';
import { Role } from './Role';

export class AdminUser {
    id:string;
    firstName: string;
    lastName: string;
    country: string;
    region: string;
    adress: string;
    zip: string;
    email: string;    
    enabled: boolean;
    phone:string;
    status : boolean;
    photoId : String;
    dateOfBirth:Date;
    role : Role[];
    password: string;

    
    constructor( id : String, firstName : String, lastName: String, email:String ,
        phone : String, status : boolean,adress : String ,dateOfBirth : Date,
        country: String, region : String, zip : String, password : String, 
        role: Role[],photo: Photo,enabled: boolean){}
}
