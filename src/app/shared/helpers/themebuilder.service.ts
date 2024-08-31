import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ThemebuilderService {


  setThemeColors(color: string, lightColor: string) {
    let root = document.documentElement;
    root.style.setProperty('--theme-color',  color);
    root.style.setProperty('--theme-light-color',  lightColor);
  }
}
