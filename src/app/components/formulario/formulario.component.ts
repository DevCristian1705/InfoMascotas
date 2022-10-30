import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
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

  constructor(
    public apiService: FormService, 
  ) { 
    this.buildform();
  }

  public buildform(){
    this.Form = new FormGroup({

    })
  }


  ngOnInit(): void {
  }


  selectFiles(event: any): void {  
   
    if (event.target.files[0]){  
      this.deleteImage();


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
    const newDatos = this.Form.getRawValue();
    this.apiService.addDato(newDatos);
  }
}
