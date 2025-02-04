import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Local } from 'src/app/models/local';
import { LocalRestService } from 'src/app/services/local-rest.service';


@Component({
  selector: 'app-local-show',
  templateUrl: './local-show.component.html',
  styleUrls: ['./local-show.component.css']
})
export class LocalShowComponent implements OnInit {

  @Input() local?:Local;

  constructor(private router: Router, private route: ActivatedRoute, private rest:LocalRestService ) { 
    
  }

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getLocal(idTemp).subscribe((data : Local)=>{
      this.local = data;
    })
  }

  navigateToItems(): void{
    this.router.navigate(['/locals']);
  }


  Viewcheckout(id:any){
    this.router.navigate(['/checkout/locals/'+id]);
  }

}
