export class UserAccount{
    
    id:number;

	username:string;

	password:string;

	firstName:string;

	lastName:string;

	email:string;

	phoneNumber:string

	//role:string;
	role: { id: number };

	active:boolean;

	feature:string;

	passLength:string;
	
	storeInfo:string;

    state:any;
	
    city:string;
	
	organization:string;
	
	reenterPassword:string;
    
}