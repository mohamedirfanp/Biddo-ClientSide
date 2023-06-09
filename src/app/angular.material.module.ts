import { NgModule } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';

// PrimeNg Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { RatingModule } from 'primeng/rating';


@NgModule({
    imports: [
      MatTabsModule,
    ],
    exports: [
        MatTabsModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatButtonModule,
        MatStepperModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatCheckboxModule,
        MatCardModule,
        MatTableModule,
        DialogModule,
        ButtonModule,
        CarouselModule,
        MatDialogModule,
        ConfirmDialogModule,
        ToastModule,
        ConfirmPopupModule,
        RatingModule
    ]
  })
  export class AnugularMaterialModule { }