export class User{

    constructor(
        public _id?:string, 
        public name?:string,
        public email?:string,
        public password?:string,
        public role?:string,
        public birthdate?:string,
        public address?:string,
        public location?:string,
        public nif?:number,
        public cell?:number,
        public points?:number,){ }
        
}