import { AppState } from '@/store/state';
import { selectUserState } from '@/store/user/selectors';
import { getImage } from '@/utils/common-functions';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Tab, TabType } from '@/utils/tab';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TabService } from '@services/tab.service';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
    private user$: Observable<EmployeeProfile>;
    emp_image: string = "";
    emp_name: string = "";
    emp_email: string = "";
    emp_id: number = -1;
    tabType: TabType = TabType.EMPLOYEE;
    @ViewChild('tabArea') tabArea: any;
    width: number = 0;

    constructor(private store: Store<AppState>,
        private userService: UserService,
        private tabService: TabService) {
    }

    ngAfterViewInit(): void {
        this.width = this.tabArea?.nativeElement.clientWidth;
    }

    ngOnInit(): void {
        this.user$ = this.store.pipe(select(selectUserState));
        this.user$.subscribe((user: EmployeeProfile) => {
            this.emp_id = user.emp_id;
            this.getEmployeeDetailsTab();
        });
    }

    getEmployeeDetailsTab() {
        this.userService.getEmpTabs().then(tabs => {
            let _id = 100000;
            tabs.forEach(x => {
                let tab = new Tab(++_id, x.name, x.routePath, x.isDefault, TabType.EMPLOYEE);
                this.tabService.addTab(tab);
            })
        });
    }
}
