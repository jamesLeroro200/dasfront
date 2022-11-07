import { SuperUser } from './super-user';

export class Company {
    id : String;
    companyName : String;
    idBusinessSectors : String;
    companyPhone : String;
    idBranchCode : String;
     searchTerms : String;
     companyEmail : String;
     annualSale : String;
     country : String;
     adress : String;
     zipCodeAdress : String;
     poBoxNumber : String;
     employeeNumber : number;
     region : String;
     houseNr : String;
     poBoxAdress : String;
     zipCodeBox : String;
     representativeFirstName : String;
     representativePosition : String;
     representativePhone : String;
     representativeLastName : String;
     representativeEmail : String;
     registerOfCommerce : File;
     numRegisterofCommerce:String;
     taxNumber:String;
     otherFile:File;
     taxIdSheet:File;
     enable : boolean;
     superUser:SuperUser;
     otherFileName:String;
     registerOfCommerceName:String;
     taxIdSheetName:String;
     logoId:String;
     logoIdName:String;
    
}
