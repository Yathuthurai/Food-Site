import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert/alert.component';
import { DropdownDirective } from './dropdown.directive';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective

  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule { }
