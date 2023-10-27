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
    emp_id: number = -1;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.user$ = this.store.pipe(select(selectUserState));
        this.user$.subscribe((user: EmployeeProfile) => {
            this.emp_id = user.emp_id;
        });
    }
}
