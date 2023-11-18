import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { openCloseAnimation, rotateAnimation } from './address.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { MasterData } from '@/utils/master-data';
import { QueryParamType, Queryparams } from '@/utils/queryparams';
import { AddressDetail } from '@/utils/address-detail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  animations: [openCloseAnimation, rotateAnimation]
})
export class AddressComponent implements OnInit {
  id: string;
  IsPermanentCollapsed: boolean = false;
  IsMailingCollapsed: boolean = true;

  addressForm: FormGroup;
  Country: MasterData[];
  PState: MasterData[];
  MState: MasterData[];
  PCity: MasterData[];
  MCity: MasterData[];
  addressDetail: AddressDetail;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute) {
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.GetAddressData(parseInt(this.id));
  }

  GetAddressData(id: number) {
    this.userService.getAddressDetail(id).then((result) => {
      this.addressDetail = result;
      this.addressForm.patchValue({
        pAddr: this.addressDetail.permanent.address,
        pCountry: this.addressDetail.permanent.country,
        pState: this.addressDetail.permanent.state,
        pCity: this.addressDetail.permanent.city,
        pPin: this.addressDetail.permanent.pincode,
        pMobile: this.addressDetail.permanent.mobile,
        pPhone: this.addressDetail.permanent.phone,
        pEmergPhone: this.addressDetail.permanent.emergencycontact,

        mAddr: this.addressDetail.mailing.address,
        mCountry: this.addressDetail.mailing.country,
        mState: this.addressDetail.mailing.state,
        mCity: this.addressDetail.mailing.city,
        mPin: this.addressDetail.mailing.pincode,
        mMobile: this.addressDetail.mailing.mobile,
        mPhone: this.addressDetail.mailing.phone,
        mEmergPhone: this.addressDetail.mailing.emergencycontact
      });

      this.PopulatePState(parseInt(this.addressDetail.permanent.country)).then(x => {
        this.getControl('pState').setValue(this.addressDetail.permanent.state);
      });
      this.PopulateMState(parseInt(this.addressDetail.mailing.country)).then(x => {
        this.getControl('mState').setValue(this.addressDetail.mailing.state);
      });

      this.PopulatePCity(parseInt(this.addressDetail.permanent.state)).then(x => {
        this.getControl('pCity').setValue(this.addressDetail.permanent.city);
      });
      this.PopulateMCity(parseInt(this.addressDetail.mailing.state)).then(x => {
        this.getControl('mCity').setValue(this.addressDetail.mailing.city);
      });
    });
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

  PopulatePState(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let query = [
        new Queryparams(QueryParamType.QUERY, "id", id)
      ];
      this.GetMasterData('PSTATE', query);

      resolve();
    });
  }

  PopulateMState(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let query = [
        new Queryparams(QueryParamType.QUERY, "id", id)
      ];
      this.GetMasterData('MSTATE', query);
      resolve();
    });
  }

  PopulatePCity(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let query = [
        new Queryparams(QueryParamType.QUERY, "id", id)
      ];
      this.GetMasterData('PCITY', query);
      resolve();
    });
  }

  PopulateMCity(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      let query = [
        new Queryparams(QueryParamType.QUERY, "id", id)
      ];
      this.GetMasterData('MCITY', query);
      resolve();
    });
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
    this.GetAddressData(parseInt(this.id));
  }
}
