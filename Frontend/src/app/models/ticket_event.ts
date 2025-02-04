export class Ticket_event{

    constructor(
        public _id?:string, 
        public userID?:string,
        public eventID?:string,
        public placename?:string,
        public address?:string,
        public duration?:string,
        public quantity?:number,
        public ticketprice?:number,
        public seat?:string,
        public email?:string,
        public nif?:number,){ }
        
}