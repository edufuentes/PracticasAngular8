import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo:string = "Crear Cliente";

  constructor(private clienteService: ClienteService, private router:Router) { }

  ngOnInit() {
  }

  public create(): void{

        console.log("Clicked new cliente!!");
        console.log(this.cliente);
    
        this.clienteService.create(this.cliente).subscribe(
           //se redirige al listado para mostrar el registro agregado, por eso se llama a la vista del listado con el "router"
          response => this.router.navigate(['/clientes'])
        );

  }

  public getTitulo(): string{
  
    return this.titulo;
  
  }

}
