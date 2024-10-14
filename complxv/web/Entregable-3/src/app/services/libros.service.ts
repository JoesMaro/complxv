import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(private http: HttpClient ) { }
  private API_LIBROS= 'http://localhost:3000/libros'

  getlibros():Observable<any>{
    return this.http.get(this.API_LIBROS)
  }
  
  postnuevoLibro(libro : JSON):Observable<any>{
    return this.http.post(this.API_LIBROS, libro)
      }

      deleteLibros(id: string):Observable<any>{
        return this.http.delete(`${this.API_LIBROS}/${id}`)
      }

      
 getlibro(id : string):Observable <any>{
  return this.http.get(this.API_LIBROS+"/"+id)
 }


  putLibros(libro: any):Observable<any>{
   return  this.http.put(`${this.API_LIBROS}/${libro.id}`,libro)
  }

  //ruta para logearse 
  private API_LOGIN="http://localhost:3000/login" 

  postLogin(user: JSON):Observable<any>{
    return this.http.post(this.API_LOGIN, user)



  }
//ruta para Registrarse
private API_REGISTRO="http://localhost:3000/users"
postRegistro(user: JSON):Observable<any>{
  return this.http.post(this.API_REGISTRO,user)

}
}
