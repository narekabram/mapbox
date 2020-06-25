import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatRadioGroup, MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonToggleModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonToggleModule
  ]
})
export class SharedModule { }
