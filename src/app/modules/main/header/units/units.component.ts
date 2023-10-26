import { Unit } from '@/utils/unit';
import { Component, Input } from '@angular/core';
import { HeaderChildComponent } from '../header-child.component';
import { UserService } from '@services/user.service';
import { DropdownService } from '../../../../services/dropdown.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent extends HeaderChildComponent {
  @Input() units: Array<Unit> = [];

  constructor(private userService: UserService,
    dropdownService: DropdownService) {
    super(dropdownService);
  }

  changeUnit(unit: Unit) {
    this.userService.switchUnit(unit);
  }
}
