import { Header } from './header';

export class Application{
    appId:number;
	appURL:string;
	domain:string;
	appName:string;
	security:string;
	active:boolean;
	header:boolean;
	cssClass:string;
	percent:number;
	failureCount:number;
	scheduleTime:string;
	avgResponseTime:string;
	avgDNSLookupTime:string;
	avgTCPIPConnectTime:string;
	headers:Array<Header>;
}