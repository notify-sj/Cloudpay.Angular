import { AppState } from '@/store/state';
import { EmployeeAboutMeDetail } from '@/utils/employee-profile';
import { SessionVariable } from '@/utils/session-variable';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnChanges, OnInit {
  @Input() id: number = -1;
    public sessionVariable: Observable<SessionVariable>;
    aboutMeDetail: EmployeeAboutMeDetail;
    roleName: string;

  constructor(private userService: UserService,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.sessionVariable = this.store.select('auth');
        this.sessionVariable.subscribe((res: any) => {
            let session = res.session as SessionVariable;
            this.roleName = session.roleName.toUpperCase();
        });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.id >= 0) {
      this.getEmployeeDetail();
    }
  }
  getEmployeeDetail() {
    this.userService.getAboutMeDetail(this.id).then((result) => {
      this.aboutMeDetail = result;
    });
  }
}
