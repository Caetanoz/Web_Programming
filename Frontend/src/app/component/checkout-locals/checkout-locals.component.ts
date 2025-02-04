import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket_locals } from 'src/app/models/ticket_locals';
import { Local } from 'src/app/models/local';
import { LocalRestService } from 'src/app/services/local-rest.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-checkout-locals',
  templateUrl: './checkout-locals.component.html',
  styleUrls: ['./checkout-locals.component.css']
})
export class CheckoutLocalsComponent implements OnInit {
  @Input() local?:Local;
  @Input() ticket:Ticket_locals;
    public quantityjuvenil?:any;
    public quantityadult?:any;
    public quantitysenior?:any;
    public quantityTotal?:any;
    public pricejuvenil?:any;
    public priceadult?:any;
    public pricesenior?:any;
    total?:any;
    message:any;

  constructor(private rest:LocalRestService, private route:ActivatedRoute, private router:Router, private http:HttpClient){
  this.ticket = new Ticket_locals();
  }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getLocal(idTemp).subscribe((data : Local)=>{
      this.local = data;
    });
    this.quantityTotal;
  }

  updateTotal(priceJ: any, priceA: any, priceS: any) {
    this.quantityjuvenil = this.ticket.quantityjuvenil || 0;
    this.quantityadult = this.ticket.quantityadult || 0;
    this.quantitysenior = this.ticket.quantitysenior || 0;
    this.pricejuvenil = priceJ;
    this.priceadult = priceA;
    this.pricesenior = priceS;
    this.quantityTotal = this.quantityjuvenil + this.quantityadult + this.quantitysenior;
    this.calculateTotal();
  }
  
  calculateTotal() {
    const totalJuvenil = this.quantityjuvenil * this.pricejuvenil;
    const totalAdult = this.quantityadult * this.priceadult;
    const totalSenior = this.quantitysenior * this.pricesenior;
  
    if (this.quantityTotal > 0) {
      // Verificar se há bilhetes de adulto adicionais
      if (this.quantityadult > 0) {
        // Somar os preços dos bilhetes de adulto ao total
        const additionalAdultTotal = (this.quantityadult) * this.priceadult;
        this.total = totalJuvenil + totalSenior + additionalAdultTotal;
        return this.total;
      } else {
        this.total = totalJuvenil + totalAdult + totalSenior;
        return this.total;
      }
    } else {
      this.total = 0;
      return this.total;
    }
  } 
  


    checkout(id:any, name:any, address:any, duration:any): void{
      if(this.ticket.quantityjuvenil == null || this.ticket.quantityjuvenil < 0){
        this.message = "Your quantity must be 0 or higher!!";
      }else if(this.ticket.quantityadult == null || this.ticket.quantityadult <0){
        this.message = "Your quantity must be 0 or higher!!";
      }else if(this.ticket.quantitysenior == null || this.ticket.quantitysenior <0){
        this.message = "Your quantity must be 0 or higher!!";
      }else if(this.ticket.email == null || this.ticket.email == ""){
        this.message = "Your email is missing!!";
      }else if(this.ticket.nif == null || this.ticket.nif <= 99999999 || this.ticket.nif >= 1000000000){
        this.message = "User nif is wrong. ex.[231675900]..!!!"
      }else {
      this.ticket.fullprice = this.calculateTotal();
      this.ticket.localID = id;
      this.ticket.placename = name;
      this.ticket.address = address;
      this.ticket.duration = duration;
      this.rest.Checkout(this.ticket,id).subscribe((data:Ticket_locals)=>{
      })
      const message = 'Successfully bought an ticket!';
      this.router.navigate(['/'], { queryParams: { message: message } 
    }); 
      }
   }
}
