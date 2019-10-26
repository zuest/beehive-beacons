import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


/*
  Generated class for the HelperServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HelperServiceProvider {
  public methodisRun:any = null;
  public responseFromServer:any = null;
  constructor() {
    console.log('Hello HelperServiceProvider Provider');
  }

}
