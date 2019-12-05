import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

/*
De esta forma en angular 8 se inyecta la clase Service automaticamente en el app.module.ts sin necesidad de referenciarlo desde alla en la propiedad providers: []
@Injectable(
{
  providedIn: 'root'
})*/

@Injectable()
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
  
    //return of(CLIENTES)

    //forma 1: se esta casteango la respuesta json a objeto Cliente[]  
     return  this.http.get<Cliente[]>(this.urlEndPoint);

    //forma 2: se esta casteango la respuesta json a objeto Cliente[]  
    /*return  this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      map(response => response)
    );*/

  }
  
}
