import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AlimentosComponent } from './components/alimentos/alimentos.component';
import { PlatosComponent } from './components/platos/platos.component';
import { AlimentosFormComponent } from './components/alimentos-form/alimentos-form.component';
import { PlatosFormComponent } from './components/platos-form/platos-form.component';
import { FamiliasComponent } from './components/familias/familias.component';
import { FamiliasFormComponent } from './components/familias-form/familias-form.component';
import {ApiconexionService} from "./services/apiconexion.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { PrincipalComponent } from './components/principal/principal.component';
import { FooterComponent } from './components/footer/footer.component';
import { FaqComponent } from './components/faq/faq.component';
import { FaqFormComponent } from './components/faq-form/faq-form.component';
import { CodigosComponent } from './components/codigos/codigos.component';
import { CodigosFormComponent } from './components/codigos-form/codigos-form.component';
import { LoginComponent } from './components/login/login.component';
import { AsignaCodigoComponent } from './components/asigna-codigo/asigna-codigo.component';
import { UsersComponent } from './components/users/users.component';
import {AdminGuard} from "./guards/admin-guard.service";
import { PlanesPersonalizadosComponent } from './components/planes-personalizados/planes-personalizados.component';
import { PlanPersonalInfoComponent } from './components/plan-personal-info/plan-personal-info.component';
import {AvatarModule} from "ngx-avatar";
import { RellenaDietaComponent } from './components/rellena-dieta/rellena-dieta.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Toast, ToastrModule} from "ngx-toastr";
import {RoleGuard} from "./guards/role.guard";
import { MatdialogComponent } from './components/matdialog/matdialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AlimentosComponent,
    PlatosComponent,
    AlimentosFormComponent,
    PlatosFormComponent,
    FamiliasComponent,
    FamiliasFormComponent,
    PrincipalComponent,
    FooterComponent,
    FaqComponent,
    FaqFormComponent,
    CodigosComponent,
    CodigosFormComponent,
    LoginComponent,
    AsignaCodigoComponent,
    UsersComponent,
    PlanesPersonalizadosComponent,
    PlanPersonalInfoComponent,
    RellenaDietaComponent,
    MatdialogComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AvatarModule,
    NgMultiSelectDropDownModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
  ApiconexionService,
    AdminGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatdialogComponent]
})
export class AppModule { }
