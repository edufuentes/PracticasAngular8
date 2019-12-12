import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo:string = "Crear Cliente";

  constructor(private clienteService: ClienteService, private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  public create(): void{

        console.log("Clicked new cliente!!");
        console.log(this.cliente);
    
        this.clienteService.create(this.cliente).subscribe(
           //se redirige al listado para mostrar el registro agregado, por eso se llama a la vista del listado con el "router"
          cliente => {
            this.router.navigate(['/clientes'])
            swal.fire('Nuevo Cliente',`El cliente ${cliente.nombre}  ha sdo creado con éxito! `,'success')
          }
        );

  }

  public getTitulo(): string{
  
    return this.titulo;
  
  }


  cargarCliente(): void{

    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
        if(id){
          this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente );
        }
        
        /*else{
          swal.fire('Falta ID','No se ha suministrado un ID','error').then( response => {
            this.router.navigate(['/clientes']);            
          })          
        }*/
    })

  }


  update(): void {

    this.clienteService.update(this.cliente).subscribe(
          json => {
              this.router.navigate(['/clientes'])
              swal.fire('Cliente Actualizado',`${json.mensaje}: ${json.cliente.nombre}`,'success')
          }
    );

  }



}
