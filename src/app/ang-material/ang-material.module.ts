import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';

const modules = [MatCardModule, MatInputModule, MatButtonModule, MatIconModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class AngMaterialModule {}
