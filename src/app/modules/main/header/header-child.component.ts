import { Component, HostBinding, HostListener, OnInit } from "@angular/core";
import { DropdownService } from "./dropdown.service";
import { Subscription } from "rxjs";

@Component({
    template: ''
})
export abstract class HeaderChildComponent implements ActiveHeaderMenu {
    @HostBinding('class')
    get hostClasses() {
        return this.classString;
    }
    private classString: string = 'nav-item dropdown';
    isActive: boolean = false;
    id = Math.random();
    private subscription: Subscription;
    dropdownService: DropdownService;

    constructor(_dropdownService: DropdownService) {
        this.dropdownService = _dropdownService;
        this.subscription = this.dropdownService.dropdownToggle$.subscribe(
            id => {
                if (id !== this.id) {
                    this.isActive = false;
                }
            }
        );
    }

    itemClick() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.dropdownService.toggleDropdown(this.id);
          }
    }

    @HostListener('document:click', ['$event'])
    handleDocumentClick(event: Event): void {
        // Check if the click is outside the dropdown button
        const clickedInside = event.target && (event.target as HTMLElement).closest('.dropdown');
        if (!clickedInside && this.isActive) {
            this.isActive = !this.isActive;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

export interface ActiveHeaderMenu {
    isActive: boolean;
}