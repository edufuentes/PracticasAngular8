import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

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

  delete(cliente: Cliente): void {
      
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          reponse => {
            
            //Aqui se hace un filtro del elemento recien eliminado, el filter devuelve un arreglo de todos los elementos que fue verdadera la expresion
            //en este escenario cli es un elemento del arreglo clientes que va ir pasandose y donde cli !== cliente (diferente sera true) se devuelve en el arreglo nuevo
            // el cliente es el elemento que fue eliminado 
            // otra forma de refrescar es usar el routerlink y refrescar la lista

            this.clientes = this.clientes.filter( cli => {
              return cli !== cliente;
            });
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            );
          }
        )        
      } 
    })

  }


}
