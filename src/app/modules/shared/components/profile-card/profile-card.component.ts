import { EmployeeProfile } from '@/utils/employee-profile';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  @Input() data: EmployeeProfile = null;
}
