import { Role } from '../../components/models/Role';

export class AdminDas {
    id: String;
    name: String;
    lastName: String;
    email: String;
    phone: String;
    status: boolean;
    address: String;
    dateOfBirth: Date;
    country: String; region: String;
    zip: String;
    roles : Role[];



    constructor(id : String, name : String, lastName: String, email:String ,
        phone : String, status : boolean,address : String ,dateOfBirth : Date,
        country: String, region : String, zip : String, 
        roles : Role[]){}

}
