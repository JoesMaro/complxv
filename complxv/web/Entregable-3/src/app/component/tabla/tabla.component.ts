import { Component, inject } from '@angular/core';
import { LibrosComponent } from '../../pages/libros/libros.component';
import { LibrosService } from '../../services/libros.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent {
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
