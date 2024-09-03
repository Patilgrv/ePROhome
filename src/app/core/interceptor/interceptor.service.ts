import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../../shared/services/common/common.service';
import { ErrorLogsService } from '../../shared/services/error-logs/error-logs.service';


@Injectable()

export class InterceptorService implements HttpInterceptor{
  token:any;
  RSAC_API_CLIENT_KEY!: string;
  RSAC_API_CLIENT_PWD!: string;

  constructor(
    private commonServices: CommonService,
    private router:Router,
    private spinner: NgxSpinnerService,
    private errorlogs : ErrorLogsService
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.token = localStorage?.getItem('access_token');
    this.token = "GfijJKu6kLveiUN4GXcJ+LMvZegSTcTCoOcwVR/8uGI0/phTu/LaNYbVUs4X1JvmxsFY6qIfafjgku/vwZosZBmB16w9feZEYpwTmmDEiHSGgiKuOVEROavLFvygWLUyOFZPsyr00kqEc6MW1vKoE/dMv0tHRfAiEqZnMZPdyfVatm7of4Kyq8mYLMkUQRu9Wd6nSHLFnZVtNMdYbJ0kGzlT650BkQBkz1mUlszDg5ukt1UDo1HJCRwfIs6AKIddWi47rez1z9xr2miMpiVhaKuGZlh48KCp91qNQfeWsUjRzFCVDaYeRJpfQ84taErkjhzSmoQJhGTvo/GTQ1jomxdCfHRDZ91lAYAYfsqJgfwEuc/6DJxgUUuyxmOZnEoUgBevhdb9siRjghBw8cXfMiWWbzdy4YJBxod61hBDWn2wfJyxhyRuNnYpqJ+e2xM7lRVUD35RspJZAS9vvYPj9mKeZJDA64jMOjsY9nKrWWtwyJyVADCnEhjYjJmSFNSEBjdlzIB4xNFayadPSqivRy442frIGL+bK3stbEQxN47NaTG/ow0/SurvayvnFCfwzz7SA8CmTnr6QxippIt8ocuFuu5d5nitrkKL492W+PBoK+1s3RZ+PJCDYPxnvO3ZcStLhn3mXE6RPZWm786NXKP3ID89Vk4ydcVqIv1JJ0E7QI5GJNykhsNnzytVZJDIGjjxFiJ6WtFkpY/KitZPZJI2XaVWSKx2BeQ5uFqT1aRREvwZqz80EWxATxZuOVoP";

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.RSAC_API_CLIENT_KEY = '410'
    this.RSAC_API_CLIENT_PWD = 'TC4D9y3bJja==jquFvwtxp#zAs!LQXJx#962Xn3?amLPBD&Yfk5F_=Z%wsXbQY*^LF&4jF_tMdQ3?r5=DWKF7fy%C!hkdWcF*z$7wzDZ_%F_-Pxt5PS$gP?9gZBSZ8g'

    this.spinner.show(); 
    const modifiedRequest = req.clone({
      headers: req.headers.set('authorization', `Bearer ${this.token}`)
                          .set('RSAC_API_CLIENT_DOM', 'carrotvisionsb')
                          .set('RSAC_API_CLIENT_PWD', this.RSAC_API_CLIENT_PWD)
                          .set('RSAC_API_CLIENT_KEY', this.RSAC_API_CLIENT_KEY)

      // headers: req.headers.set(`RSAC_API_CLIENT_KEY ${this.RSAC_API_CLIENT_KEY}`, `RSAC_API_CLIENT_PWD ${this.RSAC_API_CLIENT_PWD}`),

      
    });
    // return next.handle(modifiedRequest);

    return next.handle(modifiedRequest).pipe(
      // Handle the response here 
      tap((event: any) => {
        if (event instanceof HttpResponse) {
          // Log the response data
          // this.token = event.body.result.access_token;
          // if(event?.body?.data?.message && (user?.role_id == 1 || req?.url.includes('forgot-password') || req?.url.includes('login'))){
          //   this.commonServices.showToaster('success','',`${event?.body?.data?.message}`);
          // }
          this.spinner.hide(); 
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Log the error
        console.error('Error:', error);
        // this.errorlogs.addErrorLog('clientkey','inquiryId','errorMsg');
        this.spinner.hide(); // Here we write code for loading to hide screen when we hit api from frontend.
        // if(error?.status == 401 || error.error.message == "Invalid token."){
        //   localStorage.clear();
        //   this.commonServices.showToaster('error','ERROR',`${error?.error?.message}`);
        //   this.router.navigate([`/login`]);
        // }else{
        //   this.commonServices.showToaster('error','ERROR',`${error?.error?.message}`);
        // }
        // Handle the error as needed, e.g., show a notification or re-throw it
        // You can also return a custom error response to the calling code
        return throwError('An error occurred while processing the request.');
      })
    );
    
  }
}


// export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//   return next(req).pipe(tap(event => {
//     if (event.type === HttpEventType.Response) {
//       console.log(req.url, 'returned a response with status', event.status);
//     }
//   }));
// }