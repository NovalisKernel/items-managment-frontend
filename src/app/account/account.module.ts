import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from '../angular-material.module';
import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, AccountRoutingModule, AngularMaterialModule, FlexLayoutModule],
  declarations: [LayoutComponent, LoginComponent, RegisterComponent],
})
export class AccountModule {}
