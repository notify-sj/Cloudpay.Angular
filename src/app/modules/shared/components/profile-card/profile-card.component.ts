import { EmployeeProfile, EmployeeProfileDetail } from '@/utils/employee-profile';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnChanges {
  @Input() data: EmployeeProfile = null;
  userDetail: EmployeeProfileDetail;
  constructor(private userService: UserService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.data) {
      this.getEmployeeDetail();
    }
  }
  getEmployeeDetail() {
    this.userService.getProfileDetail().then((result) => {
      console.log(result);
      this.userDetail = result;
    });
  }


}
