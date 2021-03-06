import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from '../angular-material.module';
import { HomeComponent } from './home.component';
import { DeleteDialog } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
  declarations: [HomeComponent, DeleteDialog],
})
export class HomeModule {}
