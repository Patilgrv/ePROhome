import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


type Constructor<T = {}> = new (...args: any[]) => T;

export const autoUnsubscribeMixin =
  <T extends Constructor>(base: T = class {} as T) =>
    class extends base implements OnDestroy {
      private destroyed$ = new Subject<void>();

      ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete(); 
      }
    };