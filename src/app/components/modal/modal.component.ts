import { ComponentType, component_data } from '@/utils/component-constant';
import { ModalSize } from '@/utils/modal-size';
import { PopupItem } from '@/utils/popup-item';
import { AfterViewInit, Component, ElementRef, Injector, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, Type, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { OverlayScrollbars } from 'overlayscrollbars';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() config: PopupItem;
  @ViewChild('confirmationModal') private modalContent!: TemplateRef<ModalComponent>
  @ViewChild('modalBody') private modalBody!: ElementRef;
  modalTitle: string;
  public myInjector: Injector;
  component: Type<any>;
  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private injector: Injector) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngAfterViewInit(): void {
    if (this.modalBody)
      OverlayScrollbars(this.modalBody.nativeElement, {});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && this.config && this.config.component) {
      this.component = ComponentType.get(this.config.component);
      this.modalTitle = this.config.title;
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
    this.modalService.open(this.modalContent, { size: ModalSize[this.config.size] })
  }
}
