import { AppState } from '@/store/state';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '@services/user.service';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @HostBinding('class') classes: string = "nav-item";
    public user$: Observable<EmployeeProfile>;

    emp_image: string = "";
    emp_name: string = "";
    emp_email: string = "";

    constructor(private store: Store<AppState>,
        private userService: UserService) { }

    ngOnInit(): void {
        this.user$ = this.store.select('user');
        this.user$.subscribe((user: any) => {
            let profile = user.profile;
            this.emp_name = profile.emp_name;
            this.emp_image = `data:image/png;base64,${profile.emp_image}`;
            this.emp_email = profile.emp_email;
        });
    }

    logout() {
        this.userService.logout();
    }
}
