import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of } from 'rxjs';

/*
De esta forma en angular 8 se inyecta la clase Service automaticamente en el app.module.ts sin necesidad de referenciarlo desde alla en la propiedad providers: []
@Injectable(
{
  providedIn: 'root'
})*/

@Injectable()
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]> {
  
    return of(CLIENTES)
    
  }
  
}
