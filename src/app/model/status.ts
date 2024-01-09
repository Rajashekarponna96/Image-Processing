import { UserAccount } from './user';
import { Time } from '@angular/common';

export class Status{
     statusId:Number;
    status:string;
   user:UserAccount;
    createdAt:Date;
    mailTriggeredAt:Date;
    responseTime:Time;
    dnsLookupTime:Time;
    tcpIPConnectTime:Time;
    constructor() {
        this.user = new UserAccount();
       
      }
    
}