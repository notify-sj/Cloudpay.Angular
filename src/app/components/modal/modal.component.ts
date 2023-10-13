import { ComponentType, component_data } from '@/utils/constants';
import { PopupItem } from '@/utils/popup-item';
import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, Type, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges, OnInit {
  @Input() config: PopupItem;
  @ViewChild('confirmationModal') private modalContent!: TemplateRef<ModalComponent>
  modalTitle: string;
  public myInjector: Injector;
  component: Type<any>;
  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private injector: Injector) {
    config.backdrop = 'static';
    config.keyboard = false;
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
    this.modalService.open(this.modalContent, { size: this.config.size.toString() })
  }
}
