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
        return this.datosMascotaLocal;
    }

    addDato(event: any){
        this.datosMascotaLocal.push(event)
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