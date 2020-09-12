import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import {
  catchError,
  map,
} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  handleError(handleError: any): import("rxjs").OperatorFunction<any, any> {
    throw new Error('Method not implemented.');
  }
  
  url ="http://localhost:3000/users/";

  constructor(private httpClient: HttpClient,private toastr: ToastrService) { }

  get() {
    return this.httpClient.get(this.url)
    .pipe(
      map(data => {
        console.log(data)
        return data;
        }),
      catchError(this.handleError)
    );
  }
  
  post(data: any) {
    debugger;
    return this.httpClient.post(this.url, data, httpOptions)
      .pipe(
        map(response => {
          console.log('inside map method... ==>', response);
debugger;
          // tslint:disable-next-line: no-string-literal
          if (response['status'] === 200) {

            // if (response.data.username) {
            // tslint:disable-next-line: no-string-literal
           this.toastr.success("Login successful...");
            return response;
            // } else if (response.data[0].productid) {
            //   this.toastr.success('Product Added sucsessfully......');
            //   return response;
            // }

            // tslint:disable-next-line: no-string-literal
          } else if (response['status'] === 400) {
            // tslint:disable-next-line: no-string-literal
          this.toastr.error('Error.... ' + response['statusMsg']);
            return response;
          }
        }) // ,
        // catchError(this.handleError)
      );
  }


}
