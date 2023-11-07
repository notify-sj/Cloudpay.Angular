import { Component, Input, OnInit } from '@angular/core';
import { openCloseAnimation, rotateAnimation } from './address.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { MasterData } from '@/utils/master-data';
import { QueryParamType, Queryparams } from '@/utils/queryparams';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  animations: [openCloseAnimation, rotateAnimation]
})
export class AddressComponent implements OnInit {
  @Input() id: number = -1;
  IsPermanentCollapsed: boolean = false;
  IsMailingCollapsed: boolean = true;

  addressForm: FormGroup;
  Country: MasterData[];
  PState: MasterData[];
  MState: MasterData[];
  PCity: MasterData[];
  MCity: MasterData[];

  constructor(private fb: FormBuilder,
    private userService: UserService) {
    this.addressForm = this.fb.group({
      pAddr: ['', Validators.required],
      pCountry: ['', Validators.required],
      pState: ['', Validators.required],
      pCity: ['', Validators.required],
      pPin: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]{6}$/)
      ]],
      pMobile: ['', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(/^[1-9]\d{9}$/)
      ]],
      pPhone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      pEmergPhone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      mAddr: ['', Validators.required],
      mCountry: ['', Validators.required],
      mState: ['', Validators.required],
      mCity: ['', Validators.required],
      mPin: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^[0-9]{6}$/)
      ]],
      mMobile: ['', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern(/^[1-9]\d{9}$/)
      ]],
      mPhone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]{10}$/)
      ]],
      mEmergPhone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]{10}$/)
      ]]
    });
  }

  ngOnInit(): void {
    this.GetMasterData('COUNTRY');
    this.GetAddressData();
  }

  GetAddressData() {
    throw new Error('Method not implemented.');
  }

  GetMasterData(type: string, query: Queryparams[] = []) {
    let masterType = '' as string;
    switch (type) {
      case 'PSTATE':
      case 'MSTATE':
        masterType = 'STATE';
        break;
      case 'PCITY':
      case 'MCITY':
        masterType = 'CITY';
        break;
      default:
        masterType = type;
        break;
    }

    this.userService.getMasterData(masterType, query).then(res => {
      switch (type) {
        case 'COUNTRY':
          this.Country = res;
          break;
        case 'PSTATE':
          this.PState = res;
          break;
        case 'MSTATE':
          this.MState = res;
          break;
        case 'PCITY':
          this.PCity = res;
          break;
        case 'MCITY':
          this.MCity = res;
          break;
      }
    });
  }

  PopulatePState(id: number) {
    let query = [
      new Queryparams(QueryParamType.QUERY, "id", id)
    ];
    this.GetMasterData('PSTATE', query);
  }

  PopulateMState(id: number) {
    let query = [
      new Queryparams(QueryParamType.QUERY, "id", id)
    ];
    this.GetMasterData('MSTATE', query);
  }

  PopulatePCity(id: number) {
    let query = [
      new Queryparams(QueryParamType.QUERY, "id", id)
    ];
    this.GetMasterData('PCITY', query);
  }

  PopulateMCity(id: number) {
    let query = [
      new Queryparams(QueryParamType.QUERY, "id", id)
    ];
    this.GetMasterData('MCITY', query);
  }

  collapsed(IsPermanent: boolean) {
    if (IsPermanent)
      this.IsPermanentCollapsed = !this.IsPermanentCollapsed;
    else
      this.IsMailingCollapsed = !this.IsMailingCollapsed;
  }

  getControl(id) {
    return this.addressForm.get(id);
  }


  // This method restricts input to digits only
  onNumInput(event: any): void {
    let input = event.target;
    let lastValue = input.value;
    input.value = lastValue.replace(/[^0-9]/g, ''); // Allow digits only
    if (lastValue !== input.value) {
      event.stopPropagation();
    }
  }

  // Function to check the validation status of the pin field
  get ismPinInvalid(): boolean {
    const pinControl = this.getControl('mPin');
    return pinControl.invalid && (pinControl.dirty || pinControl.touched);
  }

  get ispPinInvalid(): boolean {
    const pinControl = this.getControl('pPin');
    return pinControl.invalid && (pinControl.dirty || pinControl.touched);
  }

  onSubmit() {

  }

  onReset() {

  }
}
