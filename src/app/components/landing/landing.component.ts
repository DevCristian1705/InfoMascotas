import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { IDatosMascota } from '../formulario/interface/form.interface';
import { FormService } from '../formulario/service/form.service';

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
    private _sanitizer: DomSanitizer
  ) { 
    
  }

  ngOnInit(): void {
    AOS.init({
      duration : 1000
    });
    this.datosMascotaLocal = JSON.parse(localStorage.getItem('dato_mascota')!);    
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(this.datosMascotaLocal.foto_mascota);
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
}
