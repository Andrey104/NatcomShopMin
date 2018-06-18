import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {BaseApi} from "./core/base-api";
import {Discount} from './discount';

@Injectable()
export class DiscountService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }
  getDiscounts(): Observable<Discount[]> {
    return this.getNoAuth(`discount/`);
  }

}
