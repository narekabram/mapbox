import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
