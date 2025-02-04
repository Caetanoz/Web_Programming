import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageRestService } from 'src/app/services/image-rest.service';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  @Input() imgname!:string;
  imageURL!:string | ArrayBuffer | null;

  constructor(private rest:ImageRestService, private route:ActivatedRoute, private router:Router, private http:HttpClient){
  }

  ngOnInit(): void {
    this.getImageUrl()
  }

  getImageUrl() {
    this.rest.getImage(this.imgname).subscribe(
      (image: Blob) => {
        this.createImageUrl(image);
      },
      (error) => {
        console.log('Erro ao obter a imagem:', error);
      }
    );
  }

  createImageUrl(image: Blob) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageURL = reader.result;
    };
    reader.readAsDataURL(image);
  }

}
