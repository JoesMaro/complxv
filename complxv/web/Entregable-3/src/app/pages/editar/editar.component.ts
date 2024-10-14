import { Component, inject } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent {
  servicio = inject(LibrosService);
  ruta = inject(ActivatedRoute);

  id: any;
  titulo: any;
  descripcion: any;
  imagen_portada: any;
  paginas: any;
  

  ngOnInit(): void {

    this.ruta.params.subscribe(parametro => {
      this.id = parametro['idlibro']; 
      this.servicio.getlibro(this.id).subscribe(p => {
        this.titulo = p.titulo;
        this.descripcion = p.descripcion;
        this.imagen_portada = p.imagen_portada; 
        this.paginas = p.paginas;
      
      });
    });
  }

  editar(data: any) {
    
    const libroEditado = { ...data.value, id: this.id };
    this.servicio.putLibros(libroEditado).subscribe(response => {
      console.log('Libro editado exitosamente', response);
      alert("Libro editado!")
      location.href='gestion'
    });
  }
}
