import { Component, inject } from '@angular/core';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-recomendados',
  standalone: true,
  imports: [],
  templateUrl: './recomendados.component.html',
  styleUrl: './recomendados.component.css'
})
export class RecomendadosComponent {
  opcion:any = 'homero'
  servicio=inject(LibrosService)
libros:any

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.servicio.getlibros().subscribe(p=>{
    this.libros = p
  })
}
eliminar(id: string){
  this.servicio.deleteLibros(id).subscribe()
  alert("Libros Eliminados!")
   location.href='gestion'
}
}
