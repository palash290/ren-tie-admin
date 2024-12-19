import { Component } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  profileForm!: FormGroup;
  userDet: any;
  userEmail: any;
  name: any;
  phone: any;
  address: any;
  admin_commission: any;

  pattern1 = "^[0-9_-]{10,12}";

  constructor(private route: Router, private service: SharedService, private toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
    this.loadUserProfile();
  }

  initForm() {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('',  [Validators.required, Validators.pattern(this.pattern1)]),
      email: new FormControl({value: this.userEmail, disabled: true}),
      admin_commission: new FormControl({value: this.admin_commission, disabled: true}),
    });
  }

  loadUserProfile() {
    this.service.getApi('adminRouter/getAdminProfile').subscribe({
      next: (resp) => {
        this.userEmail = resp.detail.email;
        this.name = resp.detail.full_name;
        this.phone = resp.detail.phone_number;
        this.address = resp.detail.address;
        this.admin_commission = resp.detail.admin_commission

        this.profileForm.patchValue({
          name: this.name,
          address: this.address,
          phone: this.phone,
          email: this.userEmail,
          admin_commission: this.admin_commission
        });

      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }

  onSubmit() {
    // if (this.profileForm.valid) {
    //   this.toastr.warning('Please check all the fields!');
    //   return;
    // }
    this.profileForm.markAllAsTouched();
    
    if (this.profileForm.valid) {
      const formURlData = new URLSearchParams();
      formURlData.set('full_name', this.profileForm.value.name);
      formURlData.set('address', this.profileForm.value.address);
      formURlData.set('phone_number', this.profileForm.value.phone);
     
      this.service.postAPI('adminRouter/editProfile', formURlData.toString()).subscribe({
        next: (resp) => {
          if (resp.success === true) {
            this.toastr.success(resp.message);
          } else {
            this.toastr.warning(resp.message);
          }
        },
        error: (error) => {
          this.toastr.warning('Something went wrong.');
          console.log(error.message);
        }
      });
    } else {
      this.toastr.warning('Please check all the fields!');
    }
  }

//admin_commission
}
