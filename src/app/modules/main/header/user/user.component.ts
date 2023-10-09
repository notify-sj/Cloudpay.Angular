import { AppState } from '@/store/state';
import { EmployeeProfile } from '@/utils/employee-profile';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuitemService } from '@services/menuitem.service';
import { UserService } from '@services/user.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    @HostBinding('class')
    get hostClasses() {
        return this.classString;
    }

    private classString: string = 'nav-item dropdown';

    public user$: Observable<EmployeeProfile>;
    emp_image: string = "";
    emp_name: string = "";
    emp_email: string = "";
    isActive: boolean = false;

    constructor(private store: Store<AppState>,
        private userService: UserService,
        private menuItemService: MenuitemService) { }

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

    itemClick() {
        this.isActive = !this.isActive;
    }

    @HostListener('document:click', ['$event'])
    handleDocumentClick(event: Event): void {
        // Check if the click is outside the dropdown button
        const clickedInside = event.target && (event.target as HTMLElement).closest('.dropdown');
        if (!clickedInside && this.isActive) {
            this.isActive = !this.isActive;
        }
    }
}
