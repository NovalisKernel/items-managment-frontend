import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from '../angular-material.module';

import { EditItemComponent } from './edit-item.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
  ],
  declarations: [EditItemComponent],
})
export class EditItemModule {}
