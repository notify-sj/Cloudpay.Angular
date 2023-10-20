import { Component, HostBinding, HostListener } from "@angular/core";

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

export interface ActiveHeaderMenu {
    isActive: boolean;
}