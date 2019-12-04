import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent  {

  clientes: Cliente[] = [
            {id:1,nombre:'eduardo',apellido:'Rondón',email:'edu@gmail.com',createAt:'2019-12-04'},
            {id:2,nombre:'jesus',apellido:'Fuentes',email:'jesus@gmail.com',createAt:'2019-12-03'},
            {id:3,nombre:'Pedro',apellido:'Capriles',email:'pedro@gmail.com',createAt:'2019-12-02'},
            {id:4,nombre:'Oscar',apellido:'Corvalan',email:'oscar@gmail.com',createAt:'2019-12-11'},
            {id:5,nombre:'Hugo',apellido:'Rojas',email:'hugo@gmail.com',createAt:'2019-12-02'},
            {id:6,nombre:'Laura',apellido:'Gonzalez',email:'laura@gmail.com',createAt:'2019-12-03'},
            {id:7,nombre:'Natalia',apellido:'Echeverri',email:'natalia@gmail.com',createAt:'2019-12-05'}
  ];


  constructor() { }



}
