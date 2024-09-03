import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import {  InterceptorService,  } from './core/interceptor/interceptor.service';


export const appConfig: ApplicationConfig = {
  providers: [

    // provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    // provideClientHydration(), 
    provideAnimations(),  
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    // provideHttpClient(withInterceptors([loggingInterceptor]))

  ]
};
