import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatBadgeModule} from '@angular/material/badge';

import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  imports: [MatButtonModule, MatNativeDateModule, MatCheckboxModule, DragDropModule, MatToolbarModule , MatStepperModule,
             MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCardModule,MatRadioModule,MatProgressBarModule,
             MatTooltipModule,MatDialogModule,MatDividerModule,MatProgressSpinnerModule,MatSlideToggleModule, MatBadgeModule, MatExpansionModule],
  exports: [MatButtonModule, MatCheckboxModule, MatNativeDateModule , DragDropModule, MatToolbarModule ,
           MatStepperModule , MatDatepickerModule, MatInputModule, MatCardModule, MatFormFieldModule,MatTooltipModule,
            MatRadioModule,MatDialogModule,MatProgressBarModule,MatDividerModule,MatProgressSpinnerModule,MatSlideToggleModule, MatBadgeModule, MatExpansionModule]
})
export class MaterialModule { }