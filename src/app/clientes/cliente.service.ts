import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';

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

  constructor(private http: HttpClient, private router:Router) { }

  getClientes(): Observable<Cliente[]> {
  
    //return of(CLIENTES)

    //forma 1: se esta casteango la respuesta json a objeto Cliente[]  
     return  this.http.get<Cliente[]>(this.urlEndPoint).pipe(
       map(response => {
          let clientes = response as Cliente[];
          console.log("size array: " + clientes.length + " clientes: " + JSON.stringify(clientes));

          return clientes.map(cliente => {
            
            cliente.nombre = cliente.nombre.toUpperCase();
            let datePipe = new DatePipe('en-US');
            cliente.createAt = datePipe.transform(cliente.createAt,'dd/MM/yyyy')
            //cliente.createAt = formatDate(cliente.createAt,'dd-MM-yyyy','en-US');
            console.log( "cliente: " + JSON.stringify(cliente));
            return cliente;
          });
       }),
      catchError( e =>{
        console.error(e.error.mensaje);
        //swal.fire('Error al crear al cliente', e.error.mensaje,'error');
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })            
  );

    //forma 2: se esta casteango la respuesta json a objeto Cliente[]  
    /*return  this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      map(response => response)
    );*/

  }

  create(cliente: Cliente): Observable<Cliente> {
    
    return this.http.post(this.urlEndPoint,cliente,{headers:this.htttpHeaders}).pipe(
          map( (response: any) => response.cliente as Cliente),
          catchError( e =>{
            console.error(e.error.mensaje);
            //swal.fire('Error al crear al cliente', e.error.mensaje,'error');
            swal.fire('Error al crear al cliente',e.error.error == null ? e.error.errors.toString() : e.error.error,'error');
            return throwError(e);
          })            
      );
  }

  getCliente(id: string): Observable<Cliente>{
    
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
          
            catchError(e =>{
               this.router.navigate(['/clientes']);
               console.error(e.error.mensaje);   
              //swal.fire('Error al editar', e.error.mensaje,'error');
              swal.fire('Error al Editar al cliente',e.error.error == null ? e.error.errors.toString() : e.error.error,'error');
              return throwError(e);
            })
    );

  }


  update(cliente: Cliente): Observable<any>{

    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.htttpHeaders}).pipe(

      catchError( e => {
        console.error(e.error.mensaje);
        //swal.fire('Error al editar al cliente', e.error.mensaje,'error');
        swal.fire('Error al Editar al cliente',e.error.error == null ? e.error.errors.toString() : e.error.error,'error');
        return throwError(e);
      })            
    );

  }


  delete(id:number): Observable<Cliente>{

    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.htttpHeaders}).pipe(

      catchError( e => {
        console.error(e.error.mensaje);
        //swal.fire('Error al elimniar al cliente', e.error.mensaje,'error');
        swal.fire('Error al elimniar al cliente', e.error.mensaje + '<br/>' + e.error.error ,'error');
        return throwError(e);
      })            
    );
    
  }
}
