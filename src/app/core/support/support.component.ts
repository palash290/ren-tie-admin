import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { SharedService } from '../../shared/services/shared.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
  supportForm!: FormGroup
  loading: boolean = false

  constructor (private srevice: SharedService, private toastr: ToastrService) {}

  ngOnInit (): void {
    this.initForm()
  }

  initForm () {
    this.supportForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      comment: new FormControl(''),
      name: new FormControl('', Validators.required)
    })
  }

  onSubmit () {
    this.supportForm.markAllAsTouched()
    if (this.supportForm.valid) {
      this.loading = true
      const formURlData = new URLSearchParams()
      formURlData.set('email', this.supportForm.value.email)
      formURlData.set('name', this.supportForm.value.name)
      formURlData.set('comment', this.supportForm.value.comment)

      this.srevice.support(formURlData.toString()).subscribe({
        next: resp => {
          if (resp.success == true) {
            this.toastr.success(resp.message)
            this.loading = false
          } else {
            this.toastr.warning(resp.message)
            this.loading = false
          }
        },
        error: error => {
          this.loading = false
          this.toastr.warning('Something went wrong.')
        }
      })
    }
  }
}
