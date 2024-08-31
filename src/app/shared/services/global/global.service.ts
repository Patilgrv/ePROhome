import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class GlobalValuesService {
  private readonly storage: Record<string, unknown>;

  constructor() {
    this.storage = {};
  }

  set(key: string, value: any): void {
    this.storage[key] = value;
  }

  get<T>(key: string): T | undefined {
    const value = this.storage[key];
    if (typeof value === 'undefined') {
      return undefined;
    }
    return value as T;
  }
}

@Injectable({
  providedIn: 'root',
})

export class LocationService {
  private _selectedLocation = new BehaviorSubject<string | null>(null);
  selectedLocation$ = this._selectedLocation.asObservable();

  setSelectedLocation(location: string | null) {
    this._selectedLocation.next(location);
  }

  private _selectedAppointment = new BehaviorSubject<string | null>(null);
  selectedAppointment$ = this._selectedAppointment.asObservable();

  setSelectedAppointment(appointment: string | null) {
    this._selectedAppointment.next(appointment);
  }
}

