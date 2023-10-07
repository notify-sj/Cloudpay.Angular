import { ModalDirective } from '@/directives/modal.directive';
import { Component, ComponentFactoryResolver, InjectionToken, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '@/store/state';
import { Store } from '@ngrx/store';
import { closeModal } from '@/store/modals/actions';
import { PopupItem } from '@/store/modals/state';


export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild(ModalDirective, { static: true }) modalPopup!: ModalDirective;
  item$: Observable<PopupItem>;
  private subscription: Subscription;
  item: PopupItem;
  constructor(private store: Store<AppState>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
    this.item$ = store.select('modal');
  }

  ngOnInit(): void {
    this.subscription = this.item$.subscribe(
      item => this.loadComponent(item)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadComponent(item: PopupItem) : void {
    if(item.component) {
      this.item = item;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
      const viewContainerRef = this.modalPopup.viewContainerRef;
      viewContainerRef.clear();

      const injector = Injector.create({
        parent: this.injector,
        providers: [{ provide: MODAL_DATA, useValue: item.data }]
      });
      viewContainerRef.createComponent(componentFactory, null, injector);
    }
  }

  close(): void {
    this.store.dispatch(closeModal());
  }

  createInjector(data: any): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [{ provide: MODAL_DATA, useValue: data }]
    });
  }
}
