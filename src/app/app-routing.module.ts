import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlatosComponent} from "./components/platos/platos.component";
import {AlimentosComponent} from "./components/alimentos/alimentos.component";
import {PlatosFormComponent} from "./components/platos-form/platos-form.component";
import {AlimentosFormComponent} from "./components/alimentos-form/alimentos-form.component";
import {FamiliasComponent} from "./components/familias/familias.component";
import {FamiliasFormComponent} from "./components/familias-form/familias-form.component";
import {PrincipalComponent} from "./components/principal/principal.component";
import {FaqComponent} from "./components/faq/faq.component";
import {FaqFormComponent} from "./components/faq-form/faq-form.component";
import {CodigosComponent} from "./components/codigos/codigos.component";
import {CodigosFormComponent} from "./components/codigos-form/codigos-form.component";
import {LoginComponent} from "./components/login/login.component";
import {AsignaCodigoComponent} from "./components/asigna-codigo/asigna-codigo.component";
import {UsersComponent} from "./components/users/users.component";
import {AdminGuard} from "./guards/admin-guard.service";
import {PlanesPersonalizadosComponent} from "./components/planes-personalizados/planes-personalizados.component";
import {PlanPersonalInfoComponent} from "./components/plan-personal-info/plan-personal-info.component";
import {RellenaDietaComponent} from "./components/rellena-dieta/rellena-dieta.component";
import {RoleGuard} from "./guards/role.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/principal', pathMatch: 'full'
  },
  { path: 'principal', component: PrincipalComponent},
  { path: 'platos', component: PlatosComponent, canActivate:[RoleGuard], data:{esperado:['nutricionista','administrador']}},
  { path: 'alimentos', component: AlimentosComponent , canActivate:[RoleGuard], data:{esperado:['nutricionista','administrador']}},
  { path: 'platos/add', component: PlatosFormComponent, canActivate:[RoleGuard], data:{esperado:['nutricionista','administrador']}},
  { path: 'alimentos/add', component: AlimentosFormComponent, canActivate:[RoleGuard], data:{esperado:['nutricionista','administrador']}},
  { path: 'alimentos/edit/:id', component: AlimentosFormComponent, canActivate:[RoleGuard], data:{esperado:['nutricionista','administrador']}},
  { path: 'platos/edit/:id', component: PlatosFormComponent, canActivate:[RoleGuard], data:{esperado:['nutricionista','administrador']}},
  { path: 'familias', component: FamiliasComponent, canActivate:[RoleGuard], data:{esperado:['administrador']} },
  { path: 'familias/add', component: FamiliasFormComponent, canActivate:[RoleGuard], data:{esperado:['administrador']} },
  { path: 'familias/edit/:id',  component: FamiliasFormComponent, canActivate:[RoleGuard], data:{esperado:['administrador']} },
  { path:'faq', component: FaqComponent, canActivate:[RoleGuard], data:{esperado:['administrador']} },
  { path: 'faq/add', component:FaqFormComponent, canActivate:[RoleGuard], data:{esperado:['administrador']} },
  { path : 'faq/edit/:id', component: FaqFormComponent, canActivate:[RoleGuard], data:{esperado:['administrador']} },
  { path:'codigos', component: CodigosComponent, canActivate:[RoleGuard], data:{esperado:['administrador']} },
  { path: 'codigos/add', component:CodigosFormComponent, canActivate:[RoleGuard], data:{esperado:['administrador']} },
  { path : 'codigos/edit/:id', component: CodigosFormComponent, canActivate:[RoleGuard], data:{esperado:['administrador']} },
  { path : 'codigos/asignar/:id', component: AsignaCodigoComponent, canActivate:[RoleGuard], data:{esperado:['administrador']} },
  { path : 'planes-personalizados', component: PlanesPersonalizadosComponent, canActivate:[RoleGuard], data:{esperado:['nutricionista','administrador']}},
  { path : 'plan-personal-info/:id', component: PlanPersonalInfoComponent, canActivate:[RoleGuard], data:{esperado:['nutricionista','administrador']}},
  { path : 'rellena-dieta/:idUser/:idSolicitud', component: RellenaDietaComponent, canActivate:[RoleGuard], data:{esperado:['nutricionista','administrador']}},
  { path : 'users', component: UsersComponent, canActivate:[AdminGuard] },
  { path : 'login', component: LoginComponent },
  {path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
