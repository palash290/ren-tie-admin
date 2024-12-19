import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SharedService } from '../../shared/services/shared.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  resetForm!: FormGroup
  loading: boolean = false

  constructor (
    private route: Router,
    private srevice: SharedService,
    private toastr: ToastrService
  ) {}

  ngOnInit (): void {
    this.initForm()
  }

  initForm () {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubmit () {
    this.resetForm.markAllAsTouched()
    if (this.resetForm.valid) {
      this.loading = true
      const formURlData = new URLSearchParams()
      formURlData.set('email', this.resetForm.value.email)
      console.log('formURlData.toString()', formURlData.toString())
      //return
      this.srevice
        .postAPI('adminRouter/forgotPassword', formURlData.toString())
        .subscribe({
          next: (resp: any) => {
            if (resp.success == true) {
              this.loading = false
              this.toastr.success(resp.message)
              this.resetForm.reset()
              this.route.navigateByUrl('/admin/login')
            } else {
              this.loading = false
              this.toastr.warning(resp.message)
            }
            console.log(resp)
          },
          error: (err: any) => {
            this.loading = false
            this.toastr.error('Something went wrong!')
            console.log(err)
          }
        })
      //this.route.navigateByUrl('home/confirmPassword/ggtg')
    }
  }
}
