import { AppState } from '@/store/state';
import { selectUserState } from '@/store/user/selectors';
import { getImage } from '@/utils/common-functions';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    private user$: Observable<EmployeeProfile>;
    emp_image: string = "";
    emp_name: string = "";
    emp_email: string = "";
    empData: EmployeeProfile = null;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.user$ = this.store.pipe(select(selectUserState));
        this.user$.subscribe((user: EmployeeProfile) => {
            this.empData = {
                emp_image: getImage(user.emp_image),
                emp_name: user.emp_name,
                emp_id: user.emp_id,
                emp_email: user.emp_email,
            }
        });
    }
}
