import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from '../angular-material.module';
import { MainLayoutComponent } from './main-layout.component';
import { LogoutDialog } from './main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    MainLayoutRoutingModule,
  ],
  declarations: [MainLayoutComponent, LogoutDialog],
})
export class MainLayoutModule {}
