import { Component, inject } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  servicio=inject(LibrosService)
  email:any
  password:any

login(usuario:any){
this.servicio.postLogin(usuario.value).subscribe(u =>{
  if (u.acesstoken != '') {
    localStorage.setItem("login",'true')
    window.location.href='gestion'
  }
})
}
}
