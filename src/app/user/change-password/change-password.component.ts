import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  form!: FormGroup;
  passwordMismatch = false;

  constructor(private route: Router, private service: SharedService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      current_password: new FormControl('', Validators.required),
      new_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirm_password: new FormControl('', Validators.required),
    });

    this.form.get('confirm_password')?.setValidators([
      Validators.required,
      this.passwordMatchValidator()
    ]);
  }

  submitForm() {
    this.form.markAllAsTouched();
    if (this.form.valid && !this.passwordMismatch) {
      const formURlData = new URLSearchParams();
      //console.log()
      formURlData.set('old_password', this.form.value.current_password);
      formURlData.set('new_password', this.form.value.new_password);
      formURlData.set('confirm_password', this.form.value.confirm_password);
      this.service.updatePassword(formURlData).subscribe({
        next: (resp) => {
          if (resp.status == 200) {
            this.toastr.success(resp.message);
            console.log(resp.message)
            this.form.reset();
            //this.closeModal.nativeElement.click();
          } else {
            this.toastr.warning(resp.message);
          }
        },
        error: (error) => {
          this.toastr.warning('Old password is incorrect.');
          console.error('Login error:', error.message);
        }
      });
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = this.form.get('new_password')?.value;
      const confirmPassword = control.value;
      if (password !== confirmPassword) {
        this.passwordMismatch = true;
        return { passwordMismatch: true };
      } else {
        this.passwordMismatch = false;
        return null;
      }
    };
  }

  isPasswordVisible1: boolean = false;

  togglePasswordVisibility1() {
    this.isPasswordVisible1 = !this.isPasswordVisible1;
  }

  isPasswordVisible2: boolean = false;

  togglePasswordVisibility2() {
    this.isPasswordVisible2 = !this.isPasswordVisible2;
  }

  isPasswordVisible3: boolean = false;

  togglePasswordVisibility3() {
    this.isPasswordVisible3 = !this.isPasswordVisible3;
  }

}
