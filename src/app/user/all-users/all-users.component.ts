import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/services/shared.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import * as countryCodes from 'country-codes-list';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {

  p: any = 1;
  data: any[] = [];
  data1: any[] = [];
  newForm!: FormGroup;
  editForm!: FormGroup;

  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closeModal1') closeModal1!: ElementRef;
  @ViewChild('closeModal2') closeModal2!: ElementRef;

  profileImageFile: File | null = null;
  imagesFiles: File[] = [];

  user_profile_images: any;
  userDetails: any[] = [];
  activity_id: any;
  user_id: any;

  imageUrls: string[] = [];
  activities: any[] = [];
  searchQuery = '';

  constructor(private route: Router, private service: SharedService, private toastr: ToastrService) { }


  countryMobileCodes = [
    { country: "Australia", code: "+61" },
    { country: "United States", code: "+48" },
    { country: "Brazil", code: "+55" },
    { country: "Canada", code: "+1" },
    { country: "China", code: "+86" },
    { country: "France", code: "+33" },
    { country: "Germany", code: "+49" },
    { country: "India", code: "+91" },
    { country: "Italy", code: "+39" },
    { country: "Japan", code: "+81" },
    { country: "Mexico", code: "+52" },
    { country: "Russia", code: "+7" },
    { country: "South Africa", code: "+27" },
    { country: "South Korea", code: "+82" },
    { country: "United Kingdom", code: "+44" },
    { country: "United States", code: "+1" },

  ];

  countries: { name: string, dialCode: string }[] = [];

  ngOnInit() {

    const countryList: any = countryCodes.all();

    // Map the list to the format required for the dropdown
    this.countries = Object.keys(countryList).map(key => {
      const country = countryList[key];
      return {
        name: country.countryNameEn,
        dialCode: country.countryCallingCode
      };
    });


    //  if (india) {
    //    this.newForm.patchValue({ countryCode: india.dialCode });
    //  }

    this.initForm();
    this.initEditForm();
    this.getAll();
    // this.getMale();
    // this.getFemale();

    this.newForm.get('gender')?.valueChanges.subscribe(gender => {
      this.toggleActivityPriceFields(gender);
    });

    this.setMaxDate()

    // this.editForm.get('gender')?.valueChanges.subscribe(gender => {
    //   this.toggleActivityPriceFieldsEdit(gender);
    // });

  }

  toggleActivityPriceFields(gender: string) {
    const activityControl = this.newForm.get('activity');
    const priceControl = this.newForm.get('price');

    if (gender === 'female') { // Assuming '2' is for Female
      activityControl?.setValidators([Validators.required]);
      priceControl?.setValidators([Validators.required]);
    } else {
      activityControl?.clearValidators();
      priceControl?.clearValidators();
    }
    activityControl?.updateValueAndValidity();
    priceControl?.updateValueAndValidity();
  }

  toggleActivityPriceFieldsEdit(gender: string) {
    const activityControl = this.editForm.get('newActivity');
    const priceControl = this.editForm.get('price');

    if (gender === 'female') { // Assuming '2' is for Female
      activityControl?.setValidators([Validators.required]);
      priceControl?.setValidators([Validators.required]);
    } else {
      activityControl?.clearValidators();
      priceControl?.clearValidators();
    }
    activityControl?.updateValueAndValidity();
    priceControl?.updateValueAndValidity();
  }


  view(userId: number) {
    this.route.navigateByUrl(`/user/main/view/${userId}`);
  }

  fetchUserData(userId: number) {

    this.service.getApi(`adminRouter/get_user_byId?id=${userId}`).subscribe((response: any) => {
      if (response.success) {
        this.user_profile_images = response.detail[0]?.profile_images
        this.userDetails = response.detail[0];
        const userData = response.detail[0];
        this.activity_id = userData.activity?.length > 0 ? userData.activity[0]?.id : ''
        this.user_id = response.detail[0]?.id
        //this.activities = response.detail[0].activity;

        this.editForm.patchValue({
          fullName: userData.fullName,
          dob: this.convertDateFormat(userData.dob),
          address: userData.address,
          mobileNumber: userData.mobileNumber,
          bio: userData.bio,
          gender: userData.gender,
          newActivity: userData.activity?.length > 0 ? userData.activity[0].activity : '',
          price: userData.activity?.length > 0 ? userData.activity[0].price : ''

        });
        this.toggleActivityPriceFieldsEdit(userData.gender);

        if (userData.images) {
          debugger
          this.imageUrls = JSON.parse(userData.images).map((image: any) => `https://www.ren-tie.com:4000/profile/${image}`);
        }

      }
    });
  }

  convertDateFormat(dateString: string): string {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return '';
    }
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }


  removeImage(index: number) {
    this.imageUrls.splice(index, 1);
    this.imagesFiles.splice(index, 1);
  }

  getAll() {
    this.service.getApi('adminRouter/listOfUsers').subscribe({
      next: resp => {
        this.data = resp.detail.reverse();
      },
      error: error => {
        console.log(error.message)
      }
    });
  }

  getMale() {
    const formURlData = new URLSearchParams();
    formURlData.set('id', '1');
    this.service.postAPI('adminRouter/listOfUsers', formURlData.toString()).subscribe({
      next: resp => {
        this.data = resp.detail.reverse();
      },
      error: error => {
        console.log(error.message)
      }
    });
  }

  getFemale() {
    const formURlData = new URLSearchParams();
    formURlData.set('id', '2');
    this.service.postAPI('adminRouter/listOfUsers', formURlData.toString()).subscribe({
      next: resp => {
        this.data1 = resp.detail.reverse();
      },
      error: error => {
        console.log(error.message)
      }
    });
  }

  pattern1 = "^[0-9_\\-+]{10,14}$";


  maxDate: any;
  setMaxDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.maxDate = `${yyyy}-${mm}-${dd}`;
  }

  initForm() {
    // Find India's country code
    const defaultCountry = this.countries[154];
    console.log(defaultCountry);

    this.newForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern(this.pattern1)]),
      countryCode: new FormControl(defaultCountry.dialCode, Validators.required),
      bio: new FormControl('', Validators.required),
      gender: new FormControl('0', Validators.required),
      images: new FormControl(null),
      profile_images: new FormControl(null),
      // activity: new FormControl('', Validators.required),
      // price: new FormControl('', Validators.required),
    })

    this.newForm.get('dob')?.valueChanges.subscribe(value => {
      this.validateAge(value);
    });
  }

  validateAge(dob: string) {
    if (!dob) return; // Ensure DOB is not empty

    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    const dobControl = this.newForm.get('dob');

    // Clear previous error if exists
    if (dobControl && dobControl.errors) {
      delete dobControl.errors['age'];
      dobControl.updateValueAndValidity();
    }

    // Check if the user is under 18
    if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())))) {
      if (dobControl) {
        dobControl.setErrors({ age: true });
      }
    }
  }

  validateAge1(dob: string) {
    if (!dob) return; // Ensure DOB is not empty

    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    const dobControl = this.editForm.get('dob');

    // Clear previous error if exists
    if (dobControl && dobControl.errors) {
      delete dobControl.errors['age'];
      dobControl.updateValueAndValidity();
    }

    // Check if the user is under 18
    if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())))) {
      if (dobControl) {
        dobControl.setErrors({ age: true });
      }
    }
  }
  

  get SearchCountryField() {
    return SearchCountryField;
  }
  get CountryISO() {
    return CountryISO;
  }


  initEditForm() {
    this.editForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      // mobileNumber: new FormControl('', [Validators.required, Validators.pattern(this.pattern1)]),
      mobileNumber: new FormControl({ value: '', disabled: true }),
      bio: new FormControl('', Validators.required),
      gender: new FormControl({ value: '', disabled: true }),
      images: new FormControl(null),
      profile_images: new FormControl(null),
      // newActivity: new FormControl('', Validators.required),
      // price: new FormControl('', Validators.required),
    })

    this.editForm.get('dob')?.valueChanges.subscribe(value => {
      this.validateAge1(value);
    });
  }


  onFileSelect(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      if (controlName === 'profile_images') {
        this.profileImageFile = input.files[0];
      }
      //  else if (controlName === 'images') {
      //   this.imagesFiles = Array.from(input.files);
      // }
    }
  }


  // onFileSelectEdit(event: Event, controlName: string) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length) {
  //     if (controlName === 'images') {
  //       this.imagesFiles = Array.from(input.files);
  //     }
  //   }
  // }
  maxImages = 4;
  selectedImages: File[] = [];

  onFileSelectEdit(event: any) {
    const files: FileList = event.target.files;
    if (files.length > this.maxImages) {
      alert(`You can only upload a maximum of ${this.maxImages} images.`);
      // Reset the file input
      event.target.value = '';
    } else {
      this.selectedImages = Array.from(event.target.files);
      // console.log(files);
      // this.newForm.patchValue({
      //   profile_images: files
      // });
    }
  }


  onFileSelected(event: any): void {
    this.selectedImages = Array.from(event.target.files);
  }

  saveForm() {
    // console.log('=========>', this.newForm.get('mobileNumber')?.value)
    // return
    this.newForm.markAllAsTouched();
    // if (!this.newForm.valid) {
    //   if (this.newForm.controls['mobileNumber'].invalid) {
    //     this.toastr.error('Mobile number is not valid!');
    //   }
    //   return;
    // }
    // if (!this.newForm.valid) {
    //   this.toastr.error('Please check all the fields!')
    //   return
    // }

    if (this.newForm.valid) {
      const formData = new FormData();
      // Object.keys(this.newForm.controls).forEach(key => {
      //   if (key !== 'images' && key !== 'profile_images') {
      //     // Only append 'activity' and 'price' if gender is '2' (Female)
      //     if ((key === 'activity' || key === 'price') && this.newForm.get('gender')?.value !== 'male') {
      //       return;
      //     }
      //     formData.append(key, this.newForm.get(key)?.value);
      //   }
      // });


      formData.append('fullName', this.newForm.get('fullName')?.value);
      const dob = this.newForm.get('dob')?.value;
      const formattedDob = this.convertDateToDDMMYYYY(dob);
      formData.append('dob', formattedDob);
      formData.append('address', this.newForm.get('address')?.value);
      formData.append('bio', this.newForm.get('bio')?.value);

      const countryCode = this.newForm.get('countryCode')?.value;
      const mobileNumber = this.newForm.get('mobileNumber')?.value;
      const fullMobileNumber = `+${countryCode}${mobileNumber}`;

      // formData.append('mobileNumber', this.newForm.get('mobileNumber')?.value);
      formData.append('mobileNumber', fullMobileNumber);
      formData.append('gender', this.newForm.get('gender')?.value);

      // if (this.newForm.get('gender')?.value !== 'male') {
      //   formData.append('activity', this.newForm.get('activity')?.value);
      //   formData.append('price', this.newForm.get('price')?.value);
      // }

      if (this.profileImageFile) {
        formData.append('profile_images', this.profileImageFile);
      }

      // if (this.imagesFiles && this.imagesFiles.length) {
      //   this.imagesFiles.forEach(file => formData.append('images', file));
      // }

      this.service.postAPIFormData('adminRouter/add_users', formData).subscribe({
        next: (response) => {
          if (response.success == true) {
            this.closeModal.nativeElement.click();
            this.toastr.success(response.message);
            this.newForm.reset();
            //this.uploadImages1()
            //console.log('Form successfully submitted:', response);
            this.getAll();
            // this.getMale();
            // this.getFemale();
            const defaultCountry = this.countries[0];
            this.newForm.patchValue({
              countryCode: defaultCountry.dialCode,
              gender: '0'
            });
            this.profileImageFile = null
          } else {
            this.toastr.warning(response.message)
          }
        },
        error: (error) => {
          this.toastr.warning('Something went wrong!')
          console.error('Form submission error:', error);
          // Handle error response
        }
      });
    }
  }

  convertDateToDDMMYYYY(dateString: string): string {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return '';
    }
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}-${month}-${year}`;
  }


  saveEditForm() {
    this.editForm.markAllAsTouched();
    // if (!this.editForm.valid) {
    //   // if (this.editForm.controls['mobileNumber'].invalid) {
    //   //   this.toastr.error('Mobile number is not valid!');
    //   // }
    //   this.toastr.error('Please check all the fields!')
    //   return;
    // }
    // if (!this.editForm.valid) {
    //   this.toastr.error('Please fill all the fields!')
    //   return
    // }
    if (this.editForm.valid) {
      const formData = new FormData();

      formData.append('fullName', this.editForm.get('fullName')?.value);
      const dob = this.editForm.get('dob')?.value;
      const formattedDob = this.convertDateToDDMMYYYY(dob);
      formData.append('dob', formattedDob);
      formData.append('address', this.editForm.get('address')?.value);
      formData.append('bio', this.editForm.get('bio')?.value);
      formData.append('mobileNumber', this.editForm.get('mobileNumber')?.value);
      formData.append('gender', this.editForm.get('gender')?.value);

      formData.append('user_id', this.user_id);

      // if (this.editForm.get('gender')?.value !== 'male') {
      //   // formData.append('activity_id', this.activity_id);
      //   // formData.append('newActivity', this.editForm.get('newActivity')?.value);
      //   // formData.append('price', this.editForm.get('price')?.value);
      //   const rowData: { id: any; activity: any; }[] = [];

      //   this.activities.forEach((row, index) => {
      //     //console.log(this.oldPrice)
      //     console.log('row', row)
      //     console.log('id', row.id)
      //     console.log('itemid', row.item_id)
      //     rowData.push({
      //       id: row.id,
      //       activity: row.activity,
      //     });
      //   });
      //   const rowDataString = JSON.stringify(rowData);
      //   formData.set('activity', rowDataString);
      // }


      if (this.UploadedFile) {
        formData.append('profile_images', this.UploadedFile);
      }

      // if (this.imagesFiles && this.imagesFiles.length) {
      //   this.imagesFiles.forEach(file => formData.append('images', file));
      // }


      this.service.postAPIFormData('adminRouter/edit_user_by_admin', formData).subscribe({
        next: (response) => {
          if (response.success == true) {
            this.closeModal1.nativeElement.click();
            this.toastr.success(response.message);
            this.uploadImages1()
            this.getAll();
            this.getMale();
            this.getFemale();
            this.editForm.patchValue({
              //profile_images: null,
              images: null,
            });
            this.UploadedFile = null
          } else {
            this.toastr.warning(response.message)
          }
        },
        error: (error) => {
          this.toastr.warning('Something went wrong!')
          console.error('Form submission error:', error);
          // Handle error response
        }
      });
    }
  }





  uploadImages1(): void {
    this.service.uploadImages(this.imageUrls, this.selectedImages, this.user_id).subscribe(() => {
      this.selectedImages = [];
    });
  }


  deleteImage(imageUrl: string): void {
    const data = {
      "user_id": this.user_id,
      "image": imageUrl
    }
    this.service.deleteImage(data).subscribe(() => {
      this.fetchUserData(this.user_id);
    });
  }


  activeTab: string = 'boy'; // Set the initial active tab

  activateTab(tabName: string) {
    this.activeTab = tabName; // Update the active tab
  }


  UploadedFile: File | null = null;
  handleFileInput(event: any) {
    const file = event.target.files[0];
    const img = document.getElementById('blah') as HTMLImageElement;

    if (img && file) {
      img.style.display = 'block';
      const reader = new FileReader();
      reader.onload = (e: any) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.UploadedFile = inputElement.files[0];
    }

  }


  fetchActivities(user_id: any) {
    const formURlData = new URLSearchParams();
    formURlData.set('user_id', user_id)
    this.user_id = user_id
    this.service.postAPI(`adminRouter/getAllActivtyById`, formURlData.toString()).subscribe((response: any) => {
      //this.activities = response.allActivity;
      this.activities = response.allActivity?.map((activity: any) => ({ ...activity, new: false }));
    });
  }

  addCommittedRow() {
    this.activities.push({ activity: '', price: null, isVisiable: 0, new: true });
  }


  saveActivity(index: number) {
    const activity = this.activities[index];
    const formURlData = new URLSearchParams();
    formURlData.set('user_id', this.user_id);
    formURlData.set('newActivity', activity.activity);
    formURlData.set('price', activity.price);

    this.service.postAPI('adminRouter/addNewActivity', formURlData.toString()).subscribe({
      next: (data: any) => {
        if (data.success == true) {
          this.toastr.success(data.message)
          console.log('Activity updated successfully', data);
          this.closeModal2.nativeElement.click();
        } else {
          this.toastr.warning(data.message)
        }
      },
      error: (error) => {
        this.toastr.warning('Error updating activity!')
        console.error('Error updating activity', error);
      }
    });
  }

  editActivity(index: number) {
    const activity = this.activities[index];
    const formURlData = new URLSearchParams();
    formURlData.set('user_id', this.user_id);
    formURlData.set('newActivity', activity.activity);
    formURlData.set('price', activity.price);
    formURlData.set('activity_id', activity.id);

    this.service.postAPI('adminRouter/edit_activites', formURlData.toString()).subscribe({
      next: (data: any) => {
        if (data.success == true) {
          console.log('Activity updated successfully', data);
          this.closeModal2.nativeElement.click();
          this.toastr.success(data.message)
        } else {
          this.toastr.warning(data.message)
        }
      },
      error: (error) => {
        this.toastr.error('Error updating activity!')
        console.error('Error updating activity', error);
      }
    });
  }


  deleteActivity(index: number) {
    const activity = this.activities[index];
    if (activity.price == null) {
      this.activities.splice(index, 1);
      return
    }

    const formURlData = new URLSearchParams();
    formURlData.set('user_id', this.user_id);
    formURlData.set('activity_id', activity.id);

    this.service.deleteActivity(formURlData.toString()).subscribe({
      next: (data: any) => {
        if (data.success == true) {
          console.log('Activity deleted successfully', data);
          this.fetchActivities(this.user_id);
          this.toastr.success(data.message)
        } else {
          this.toastr.warning(data.message)
        }
      },
      error: (error) => {
        this.toastr.error('Error deleting activity!')
        console.error('Error deleting activity', error);
      }
    });

  }


  deleteField(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ".swal-button--orange",
        cancelButton: ".swal-button--red"
      },
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      confirmButtonColor: "#b92525",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const formURlData = new URLSearchParams();
          formURlData.set('id', id);
          this.service.postAPI('/adminRouter/delete_account', formURlData).subscribe({
            next: resp => {
              //console.log(resp)
              this.toastr.success(resp.message)
              this.getAll();
              this.getMale();
              this.getFemale();
            },
            error: error => {
              this.toastr.error('Something went wrong!')
              console.log(error.message)
            }
          });
        }
      });
  }

  userImg1: any;

  showImg(url: any) {
    this.userImg1 = url;
  }


}