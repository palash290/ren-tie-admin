import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { numberRangeValidator } from '../../shared/validators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  newForm!: FormGroup;
  newForm1!: FormGroup;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closeModal1') closeModal1!: ElementRef;

  @Output() toggleEvent = new EventEmitter<boolean>();

  toggleMenu() {
    this.toggleEvent.emit(true); // Emit event to parent component
  }

  constructor(private service: SharedService, private toastr: ToastrService) { }

  ngOnInit() {
    this.newForm = new FormGroup({
      body: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/), // Ensures only digits are allowed
        numberRangeValidator(1, 100) // Ensures the number is between 1 and 100
      ]),
     
    })

    this.newForm1 = new FormGroup({
      body: new FormControl('',
        Validators.required,
      ),
      title: new FormControl('', Validators.required),
    })
  }

  addEvent() {
    this.newForm.markAllAsTouched();
    if (this.newForm.valid) {
      const formURlData = new URLSearchParams();
      formURlData.set('AdminCommission', this.newForm.value.body)
      // console.log('formURlData.toString()', formURlData.toString())
      // return
      this.service.postAPI('adminRouter/addAdminCommission', formURlData.toString()).subscribe({
        next: (resp) => {
          if (resp.success === true) {
            this.closeModal.nativeElement.click();
            this.newForm.reset();
            this.toastr.success(resp.message);
          } else {
            this.toastr.warning(resp.message);
          }
        },
        error: error => {
          this.toastr.error('Something went wrong.');
          console.log(error.message);
        }
      })
    }
  }

  addNotification() {
    this.newForm1.markAllAsTouched();
    if (this.newForm1.valid) {
      const formURlData = new URLSearchParams();
      formURlData.set('content', this.newForm1.value.body)
      formURlData.set('title', this.newForm1.value.title)
      // console.log('formURlData.toString()', formURlData.toString())
      // return
      this.service.postAPI('adminRouter/sendNotificationToAllUsers', formURlData.toString()).subscribe({
        next: (resp) => {
          if (resp.success === true) {
            this.closeModal1.nativeElement.click();
            this.newForm1.reset();
            this.toastr.success(resp.message);
          } else {
            this.toastr.warning(resp.message);
          }
        },
        error: error => {
          this.toastr.error('Something went wrong.');
          console.log(error.message);
        }
      })
    }
  }


  logOut() {
    this.service.logout();
  }


}
