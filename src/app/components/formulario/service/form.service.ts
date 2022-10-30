import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
 
@Injectable({
    providedIn: 'root'
})

export class FormService {

    private datosMascotaLocal : any[] = [];
    private baseUrl = 'http://localhost:8080';


    constructor(private http: HttpClient) { }

    getDatos(){
      this.datosMascotaLocal = JSON.parse(localStorage.getItem('dato_mascota')!);   
      console.log(this.datosMascotaLocal);
      return this.datosMascotaLocal[0];
    }

    addDato(event: any){ 
      let myDatosMascotaLocal = null
      myDatosMascotaLocal = event;
      let datos =  JSON.stringify(myDatosMascotaLocal);
      localStorage.setItem('dato_mascota', datos);
    }


    upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
    
        formData.append('file', file); 
        const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
          reportProgress: true,
          responseType: 'json'
        });
    
        return this.http.request(req);
      }
    
      getFiles(): Observable<any> {
        return this.http.get(`${this.baseUrl}/files`);
      }
 
}