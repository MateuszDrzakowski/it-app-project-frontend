import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarComponent} from "./star.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {MaterialModule} from "../material/material.module";
import {ConfigurationURLService} from "./configurationURL";

@NgModule({
  declarations: [
    StarComponent,
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    StarComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
