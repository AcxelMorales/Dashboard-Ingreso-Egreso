import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

// Modulos
import { FormsModule } from '@angular/forms';

// Components
import { LoginComponent } from './login/login.component';
import { RegistryComponent } from './registry/registry.component';

// Firebase
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        LoginComponent,
        RegistryComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        AngularFireAuthModule
    ]
})
export class AuthModule { }