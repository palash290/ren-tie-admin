import { Component } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { SharedService } from '../../shared/services/shared.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm!: FormGroup
  passwordMismatch = false

  userId: any

  constructor (
    private route: Router,
    private srevice: SharedService,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit (): void {
    this.initForm()

    this.router.paramMap.subscribe((params: { get: (arg0: string) => any }) => {
      this.userId = params.get('id')
      console.log('User ID====>', this.userId)
    })
  }

  initForm () {
    this.resetForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })

    this.resetForm
      .get('confirmPassword')
      ?.setValidators([Validators.required, this.passwordMatchValidator()])
  }

  onSubmit () {
    this.resetForm.markAllAsTouched()
    // const formValues = {
    //   password: this.resetForm.get('password')?.value
    // }
    if (this.resetForm.valid && !this.passwordMismatch) {
      // const stringfyUrlData = JSON.stringify(formValues);
      // const formURlData = new URLSearchParams();
      // formURlData.set('updateJson', stringfyUrlData);
      const formURlData = new URLSearchParams()
      formURlData.set('password', this.resetForm.value.password)
      formURlData.set('confirm_password', this.resetForm.value.confirmPassword)
      formURlData.set('token', this.userId)
      console.log('Form submitted successfully:', formURlData.toString())
      //return
      this.srevice.resetPassword(formURlData.toString()).subscribe(
        result => {
          if (result.success == true) {
            this.route.navigateByUrl('/admin/login')
            this.toastr.success(result.message)
          } else {
            this.toastr.warning(result.message)
          }
        },
        (err: Error) => {
          this.toastr.error('Something went wrong!')
          console.log(err)
        }
      )
      console.log('Form submitted successfully:', this.resetForm.value)
    }
  }

  passwordMatchValidator (): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = this.resetForm.get('password')?.value
      const confirmPassword = control.value
      if (password !== confirmPassword) {
        this.passwordMismatch = true
        return { passwordMismatch: true }
      } else {
        this.passwordMismatch = false
        return null
      }
    }
  }

  isPasswordVisible: boolean = false

  togglePasswordVisibility () {
    this.isPasswordVisible = !this.isPasswordVisible
  }

  isPasswordVisible1: boolean = false

  togglePasswordVisibility1 () {
    this.isPasswordVisible1 = !this.isPasswordVisible1
  }
}
