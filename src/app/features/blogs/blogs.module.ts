import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { ListingComponent } from './containers/listing/listing.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    CardComponent,
    ListingComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class BlogsModule { }
