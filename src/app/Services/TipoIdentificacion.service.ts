import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Basic } from '../Models/Basic';

const ENDPOINT = environment.baseApi+"tipoidentificacion";

@Injectable({
  providedIn: 'root'
})

export class TipoIdentificacionService {
  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Methods', '*')
      .set('api-key-laika', environment.api_key)
  };

constructor(private http: HttpClient) { }
public getAll(){
  return this.http.get<Basic[]>(ENDPOINT,this.httpOptions);
}

public get(id: number){
  return this.http.get<Basic>(ENDPOINT+"/"+id,this.httpOptions);
}

public post(basic: Basic){
  return this.http.post(ENDPOINT,basic,this.httpOptions);
}

public put(basic: Basic){
  return this.http.put(ENDPOINT+"/"+basic.id,basic,this.httpOptions);
}

public delete(id: number){
  return this.http.delete(ENDPOINT+"/"+id,this.httpOptions);
}

}
