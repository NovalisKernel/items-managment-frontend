import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from '../angular-material.module';

import { CreateItemComponent } from './create-item.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
  declarations: [CreateItemComponent],
})
export class CreateItemModule {}
