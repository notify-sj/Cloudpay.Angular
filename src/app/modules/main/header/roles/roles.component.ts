import { Component, Input } from '@angular/core';
import { HeaderChildComponent } from '../header-child.component';
import { Role } from '@/utils/role';
import { UserService } from '@services/user.service';
import { DropdownService } from '../../../../services/dropdown.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends HeaderChildComponent {
  @Input() roles: Array<Role> = [];

  constructor(private userService: UserService,
    dropdownService: DropdownService) {
    super(dropdownService);
  }

  changeRole(role: Role) {
    this.userService.switchRole(role);
  }
}
