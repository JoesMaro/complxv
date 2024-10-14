import { Component } from '@angular/core';
import { FormularioComponent } from '../../component/formulario/formulario.component';
import { TablaComponent } from '../../component/tabla/tabla.component';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [FormularioComponent,TablaComponent],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent {
  cerrar(){
    localStorage.removeItem('login')
    window.location.href= 'login'
  }
}
