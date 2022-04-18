import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes/simple-component.base';
import { single } from 'rxjs/operators';
import {
	ImageCompoundContentProps,
  LinkCompoundContentProps,
} from '@shared/interfaces';

@Component({
  selector: 'mflooring-product-image-compound',
  templateUrl: './product-image-compound.component.html',
  styleUrls: ['./product-image-compound.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImageCompoundComponent extends SimpleComponent<any, any> implements OnInit {

  public productName:string;
  public productColor:string;
  public productImage:any;
  public productUrl: any;
  constructor() {
    super();
   }

  ngOnInit(): void {
    this.productName =  this.content?.productName || null;
    this.productColor =  this.content?.productColor || null;
    this.productImage = this.content?.productImage || null;
    this.productUrl =  this.content?.productUrl || null;
  }

}
