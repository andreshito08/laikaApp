import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../Models/Usuario';

const ENDPOINT = environment.baseApi+"usuarios";

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json;charset=UTF-8')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Methods', '*')
      .set('api-key-laika', environment.api_key)
  };

constructor(private http: HttpClient) { }

  public getAll(){
    return this.http.get<Usuario[]>(ENDPOINT,this.httpOptions);
  }

  public get(id: number){
    return this.http.get<Usuario>(ENDPOINT+"/"+id,this.httpOptions);
  }

  public post(user: Usuario){
    return this.http.post(ENDPOINT,user,this.httpOptions);
  }

  public put(user: Usuario){
    return this.http.put(ENDPOINT+"/"+user.id,user,this.httpOptions);
  }

  public delete(id: number){
    return this.http.delete(ENDPOINT+"/"+id,this.httpOptions);
  }
}
