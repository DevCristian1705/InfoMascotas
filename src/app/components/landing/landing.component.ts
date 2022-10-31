import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { IDatosMascota } from '../formulario/interface/form.interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  Fecha = new Date();
  AnioActual = this.Fecha.getFullYear();
  datosMascotaLocal! : IDatosMascota;
  imagePath : any = '../assets/images/mascota_default.jpg';

  constructor(
    private router : Router,
//    private _sanitizer: DomSanitizer
  ) { 
    
  }

  ngOnInit(): void {
    AOS.init({
      duration : 1000
    });
    this.datosMascotaLocal = JSON.parse(localStorage.getItem('dato_mascota')!);    
  //
  } 

  onLista(){
    this.router.navigate(['/components/lista'])
  }

  onLogin(){
    this.router.navigate(['/auth'])
  }

  onRegistrarDatos(){
    this.router.navigate(['/components/form'])
  }

  onSendWathsapp(){
    let url ="whatsapp://send?text="+encodeURIComponent('Hola tengo informacion sobre su mascota')+"&phone="+encodeURIComponent(934560280)
    window.open(url);
  }


  

}
