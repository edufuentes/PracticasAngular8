import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

/*
De esta forma en angular 8 se inyecta la clase Service automaticamente en el app.module.ts sin necesidad de referenciarlo desde alla en la propiedad providers: []
@Injectable(
{
  providedIn: 'root'
})*/

@Injectable()
export class ClienteService {

  private htttpHeaders = new HttpHeaders({'Content-Type':'application/json'});
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

  create(cliente: Cliente): Observable<Cliente> {
    
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers:this.htttpHeaders});
  
  }

  getCliente(id: string): Observable<Cliente>{
    
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);

  }


  update(cliente: Cliente): Observable<Cliente>{

    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.htttpHeaders});

  }


  delete(id:number): Observable<Cliente>{

    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.htttpHeaders});
    
  }
}
