import { Routes } from '@angular/router';
import { LibrosComponent } from './pages/libros/libros.component';
import { RecomendadosComponent } from './pages/recomendados/recomendados.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './component/error404/error404.component';
import { EditarComponent } from './pages/editar/editar.component';
import { bibliotecaGuard } from './guards/biblioteca.guard';

export const routes: Routes = [
    {path:'libros', component: LibrosComponent},
    {path:'recomendados', component: RecomendadosComponent},
    {path:'gestion', component: GestionComponent ,canActivate:[bibliotecaGuard]},
    {path:'login', component: LoginComponent},
    {path: 'editar/:idlibro', component: EditarComponent}, 
    {path:'', redirectTo:'libros',pathMatch:'full'},
    {path:'**', component: Error404Component},

];
