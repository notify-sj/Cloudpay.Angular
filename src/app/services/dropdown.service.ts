import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private dropdownToggleSource = new BehaviorSubject<number>(null);
  dropdownToggle$ = this.dropdownToggleSource.asObservable();

  toggleDropdown(id: number) {
    this.dropdownToggleSource.next(id);
  }
}
