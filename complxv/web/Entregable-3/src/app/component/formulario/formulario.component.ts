import { Component, inject } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  servicio=inject(LibrosService)
  id:any
  titulo:any
  descripcion:any
  imagen_portada:any
  paginas:any

  //FUNCION PARA GUARDAR 

guardar(data:any){
  
  console.log(data.value)
  this.servicio.postnuevoLibro(data.value).subscribe()
  alert("Agregado")
  this.limpiar()
  location.href='gestion'
}

//FUNCION PARA LIMPIAR LOS CAMPOS 
limpiar(){
  this.id='';this.titulo='';this.descripcion='';this.imagen_portada='';this.paginas=''
}
}
