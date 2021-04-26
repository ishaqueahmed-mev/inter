import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    PaginationComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    SearchComponent
  ]
})
export class SharedModule { }
