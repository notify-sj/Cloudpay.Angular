import { AppState } from '@/store/state';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';
import { HeaderChildComponent } from '../header-child.component';
import { DropdownService } from '../../../../services/dropdown.service';
import { SessionVariable } from '@/utils/session-variable';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent extends HeaderChildComponent implements OnInit {
    public user$: Observable<EmployeeProfile>;
    emp_image: string = "";
    emp_name: string = "";
    emp_email: string = "";
    isActive: boolean = false;
    ROLE_NAME: string = "";
    sessionVariable$: Observable<SessionVariable>;

    constructor(private store: Store<AppState>,
        private userService: UserService,
        dropdownService: DropdownService) {
        super(dropdownService);
    }

    ngOnInit(): void {
        this.user$ = this.store.select('user');
        this.user$.subscribe((user: any) => {
            let profile = user.profile;
            this.emp_name = profile.emp_name;
            this.emp_image = `data:image/png;base64,${profile.emp_image}`;
            this.emp_email = profile.emp_email;
        });

        this.sessionVariable$ = this.store.select('auth');
        this.sessionVariable$.subscribe((res: any) => {
            let session = res.session as SessionVariable;
            this.ROLE_NAME = session.roleName;
        });
    }

    logout() {
        this.userService.logout();
    }
}
