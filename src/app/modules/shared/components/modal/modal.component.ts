import { ComponentType, component_data } from '@/utils/component-constant';
import { ModalSize } from '@/utils/modal-size';
import { PopupItem } from '@/utils/popup-item';
import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Injector, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, Type, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalActions } from './modal-actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges, OnInit {
  @Input() config: PopupItem;
  @ViewChild('confirmationModal') private modalContent!: TemplateRef<ModalComponent>
  @ViewChild('modalBody') private modalBody!: ElementRef;
  modalTitle: string;
  public myInjector: Injector;
  component: Type<any>;
  private loadedComponentRef: ComponentRef<ModalActions>;
  okButtonLable: string = "OK";

  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && this.config && this.config.component) {
      this.component = ComponentType.get(this.config.component);
      this.modalTitle = this.config.title;
      if (this.config.footer)
        this.okButtonLable = this.config.okButtonLabel;
      this.open();
    }
  }

  ngOnInit(): void {
  }

  open() {
    this.myInjector = Injector.create({
      providers: [{ provide: component_data, useValue: this.config.data }],
      parent: this.injector,
    });

    const factory = this.resolver.resolveComponentFactory(this.component);
    this.loadedComponentRef = factory.create(this.myInjector);

    this.modalService.open(this.modalContent, { size: ModalSize[this.config.size] })
  }

  onOkButtonClick(): void {
    if (this.loadedComponentRef && typeof this.loadedComponentRef.instance.onModalOk === 'function') {
      this.loadedComponentRef.instance.onModalOk();
    }
  }
}
