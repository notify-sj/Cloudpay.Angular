import { LoginConfig } from '@/utils/login-config';
import { Component, HostBinding, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControlOptions, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HeaderChildComponent } from '@modules/main/header/header-child.component';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends HeaderChildComponent implements OnInit, OnChanges {
  @Input() config: LoginConfig = new LoginConfig();

  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
    private appService: UserService) {
    super();
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && this.config) {
      this.checkPasswords = this.checkPasswords.bind(this);
      this.changePasswordForm = this.fb.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(this.config.MIN_PWD_LEN), Validators.maxLength(this.config.MAX_PWD_LEN)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(this.config.MIN_PWD_LEN), Validators.maxLength(this.config.MAX_PWD_LEN)]]
      }, { validator: this.checkPasswords } as FormControlOptions);
    }
  }

  ngOnInit(): void {
  }

  itemClick(): void {
    this.isActive = !this.isActive;
    this.resetForm();
  }

  resetForm(): void {
    this.changePasswordForm.reset({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    let oldPass = group.get('currentPassword').value;

    let newPass = group.get('newPassword').value as string;
    if (oldPass === newPass)
      return { oldNewSame: true };
    else if (newPass.length < this.config.MIN_PWD_LEN)
      return { minlength: true };
    else if (newPass.length > this.config.MAX_PWD_LEN)
      return { maxlength: true };

    let confirmPass = group.get('confirmPassword').value;
    return newPass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      console.log(this.changePasswordForm.value);
      this.appService.changePassword(this.changePasswordForm.value);
    }
  }



  get CurrentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }

  get NewPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get ConfirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }
}
