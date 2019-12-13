export class Clients{
    cid:number;
    cName:string; 
    address:string;
    email:string;
    contact:string;
}

export class userInfo{
    id:number;
    Email:string;
    username:string;
    password:string;
    confirmpassword:string;
    cid:number;
    Role:string;
    cname:string;
    createddate:string;
    isActive:boolean;
}

export class UserForRegisterDto
{ 
    id:number;
    username:string;
    password:string;
    newpassword:string;
   cID:number;
  cName:string;
   email:string;
   accountExpiryDate: Date;
}

