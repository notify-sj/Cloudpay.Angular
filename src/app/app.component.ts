import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PopupItem } from './store/modals/state';
import { selectModalState } from './store/modals/selector';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    modal: Observable<PopupItem>;    
    constructor(private store: Store) {
        this.modal = this.store.pipe(select(selectModalState));
    }
}
