import { getImage } from '@/utils/common-functions';
import { EmployeeProfileDetail } from '@/utils/employee-profile';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnChanges {
  @Input() id: number = -1;
  userDetail: EmployeeProfileDetail;
  constructor(private userService: UserService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.id >= 0) {
      this.getEmployeeDetail();
    }
  }
  getEmployeeDetail() {
    this.userService.getProfileDetail(this.id).then((result) => {
      this.userDetail = result;
      this.userDetail.emp_image = getImage(this.userDetail.emp_image);
    });
  }


}
