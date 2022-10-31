import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IDatosMascota } from './interface/form.interface';
import { FormService } from './service/form.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  Form!: FormGroup;

  selectedFiles?: FileList;
  selectedFileNames: any = null;
  ImgAdjunto : any = null;
  imageInfos?: Observable<any>;
  datosMascotaLocal! : IDatosMascota;

  changeImage : boolean = false;

  constructor(
    public apiService: FormService, 
    public router : Router,
    private _sanitizer: DomSanitizer
  ) { 
    this.buildform();
  }

  public buildform(): void{
    this.Form = new FormGroup({
      nombreMascota : new FormControl(null, Validators.required),
      especie : new FormControl(null),
      raza : new FormControl(null),
      sexo : new FormControl(null),
      fechaNacimiento : new FormControl(null),
      celular : new FormControl(null, Validators.required),
      email : new FormControl(null),
      /** COLORES DE LA MASCOTA */
      c_cara : new FormControl(null),
      c_nariz : new FormControl(null),
      c_oreja : new FormControl(null),
      c_mandibula_inferior : new FormControl(null),
      c_mandibula_superior : new FormControl(null),
      c_pecho : new FormControl(null),
      c_espalda : new FormControl(null),
      c_pata_delantera_derecha : new FormControl(null),
      c_pata_delantera_izquierda : new FormControl(null),
      c_pata_trasera_derecha : new FormControl(null),
      c_pata_trasera_izquierda : new FormControl(null),
      c_cola : new FormControl(null),
      c_ojos : new FormControl(null),
      /*MAS DATOS */
      direccion : new FormControl(null, Validators.required),
      foto_mascota : new FormControl(null),
      sobremi_1 : new FormControl(null),
      sobremi_2 : new FormControl(null),
      vacunas : new FormControl(null),
      juguetes : new FormControl(null),
      comida : new FormControl(null),
      lugar_paseo : new FormControl(null),
    })
  }


  ngOnInit(): void {
    this.onPintarData();
  }

  onPintarData(){
    this.datosMascotaLocal = JSON.parse(localStorage.getItem('dato_mascota')!);    
    if(this.datosMascotaLocal){
      this.ImgAdjunto =  this._sanitizer.bypassSecurityTrustResourceUrl(this.datosMascotaLocal.foto_mascota);
      this.Form.patchValue(this.datosMascotaLocal);
    }
  }




  selectFiles(event: any): void {  
    if (event.target.files[0]){  
      this.deleteImage();
      this.changeImage = true;
      const reader = new FileReader(); 
      reader.onload = (e: any) => { 
        this.ImgAdjunto = e.target.result
      }; 
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFileNames = event.target.files[0].name;
    }
  }
 

  deleteImage(){
    this.selectedFileNames = null; 
    this.ImgAdjunto = null;
  }

  onSoloNumeros(event :any) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
     if (!regex.test(key)) {
      event.returnValue = false;
       if (event.preventDefault) {
        event.preventDefault();
       }
     }
  }

  onSave(){
    const newDatos : IDatosMascota = this.Form.getRawValue(); 
    newDatos.foto_mascota =   this.changeImage ? this.ImgAdjunto :  this.datosMascotaLocal.foto_mascota;   
    console.log('newDatos',newDatos);
    this.apiService.addDato(newDatos);

    this.router.navigate(['/components'])
  }

  onVolver(){
    this.router.navigate(['/components'])
  }
}
