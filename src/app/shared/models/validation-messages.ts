export class ValidationMessages {
  validationMessage = {
      'companyEmail': {
        'required': 'Email is required',
        'minlength': 'Email should 4 characters long',
        'email': 'Enter a valid Email Address!'
      },
      'idBusinessSectors': {
        'required': 'Business Code is required',
        'pattern':'Is Number'
      },
      'companyPhone': {
        'required': 'Company Phone is required'
      },
      'idBranchCode': {
        'required': 'Branch Code is required'
      },
      'searchTerms': {
        'required': 'SearchTerms is required'
      },
      'companyName': {
        'required': 'Company Name is required',
        'minlength' : 'Must be at least 2 characters!',
      },
      'annualSale':{
        'required': 'Annual Sale is required'
      },
      'country':{
          'required': 'Country is required'
        },
        'adress':{
          'required': 'Adress is required'
        },

        'zipCodeAdress':{
          'required': 'Zip Code Adress is required',
          'pattern':"only number "
        },

        'poBoxNumber':{
          'required': 'Po Box Number is required'
        },
        'region':{
          'required': 'Region is required'
        },
        'ouseNr':{
          'required': 'HouseNr is required'
        },
        'poBoxAdress':{
          'required': 'Po Box Adress is required'
        },
        'zipCodeBox':{
          'required': 'zip Code Box is required'
        },
        'representativeFirstName':{
          'required': 'Representative FirstName is required'
        },
        'representativePosition':{
          'required': 'Representative Position is required'
        },
        'representativePhone':{
          'required': 'Representative Phone is required'
        },
        'representativeLastName':{
          'required': 'Representative LastName is required'
        },
        'representativeEmail':{
          'required': 'Representative Email is required',
          'email': 'Enter a valid Email Address!'  
        },
        'numRegisterofCommerce':{
          'required': 'Num Register of Commerce is required'
        },
  
        'taxNumber':{
          'required': 'Tax Number is required'
        },
        'registerofCommerce':{
          'required': 'Register Of commerce is required '
        },

        'taxIdSheet':{
          'required': 'Tax Id Sheet is required '
        },
        'superUser':{
          'required': 'Super User is required   '
        },

        
        
        'logoId':{
          'required': 'Log is required   '
        },


        
       
        //Register Of Super User
        'firstName': {
          'required': 'First Name is required'
        },
        'lastName': {
          'required': 'Last Name is required'
        },
        'zip': {
          'required': 'Zip Code Adress is required',
          'minlength' : 'Must be at least 4 characters!',
          'maxlength' : 'Must be less then 6 characters!'
        },         
        'email': {
          'required': 'Email is required',
          'email': 'Enter a valid Email Address!'            
        },
        'password': {
          'required': 'Password is required',
          'minlength': 'Must be at least 6 characters!'
        },
        'employeeNumber': {
          'required': 'Employee Number is required',
          'min': 'Must be positive Number'

        },
        'city': {
          'required': 'city required',
          'min': 'Must be positive Number'

        }
       
       

    }
    formErrors = {
      'companyEmail' : '',
      'companyName' : '',
      'idBusinessSectors' : '',
      'companyPhone': '',
       'idBranchCode' : '',
       'searchTerms' : '',
       'annualSale' : '',
       'country' : '',
       'adress' : '',
       'zipCodeAdress' : '',
       'poBoxNumber' : '',
       'employeeNumber' : '',
       'region' : '',
       'houseNr' : '',
       'poBoxAdress' : '',
       'zipCodeBox' : '',
       'representativeFirstName' : '',
       'representativePosition' : '',
       'representativePhone' : '',
       'representativeLastName' : '',
       'representativeEmail' : '',       
       'numRegisterofCommerce':'',

       //Register Of Super User
       'firstName':'',
       'lastName':'',
       'zip':'',
       'email':'',
       'password':'', 
       'taxNumber': '',
       'min':'',
       'registerofCommerce':'',  
       'taxIdSheet':'' ,
       'logoId':'',
       'city':'',
       'address':'', 
       'superUser' :''                     
    };
}
