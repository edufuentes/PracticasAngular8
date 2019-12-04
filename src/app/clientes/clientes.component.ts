import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent  implements OnInit {
  

  clientes: Cliente[];


  constructor(private clienteService: ClienteService ) { }

  ngOnInit() {
   
   // this.clientes = this.clienteService.getClientes();

   //En este ajuste se esta subscribiendo el metodo getClientes ya que en la capa services (ClienteService) se implemento el patron Observable
   this.clienteService.getClientes().subscribe(
      (clientes) => this.clientes = clientes
   );
   
  }


}
