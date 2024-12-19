import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.css'
})
export class InterestComponent {

  p: any = 1;
  data: any[] = [];
  searchQuery = '';
  interestForm!: FormGroup;

  iconCss = new FormControl();
  fallbackIcon = 'fas fa-user';

  editForm!: FormGroup;

  constructor(private service: SharedService, private toastr: ToastrService, private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit() {
    this.initForm();
    this.initUpdateForm();
    this.getNotifications();
  }
  selectedIcon: string = '';
  initForm() {
    this.interestForm = new FormGroup({
      //icon_images: new FormGroup({iconCss: this.iconCss}),
      icon_images: new FormControl(null),
      interest: new FormControl('', Validators.required)
    })
  }

  profileImageFile: File | null = null;

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

  initUpdateForm() {
    this.editForm = new FormGroup({
      interest: new FormControl(this.updateDet?.intrest_name, Validators.required)
    })
  }

  getNotifications() {
    this.service.getApi('/adminRouter/fetchIntrestsByAdmin').subscribe({
      next: resp => {
        this.data = resp.data;
      },
      error: error => {
        console.log(error.message)
      }
    });
  }

  updateDet: any;
  updateId: any;

  patchUpdate(details: any) {
    this.updateDet = details;
    this.updateId = details.id;
    this.initUpdateForm();
  }

  onIconSelect(icon: any): void {
    this.selectedIcon = icon;
    this.interestForm.get('icon_images')?.setValue(icon);
  }

  convertedImage: any

  convertIconToImage(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = this.iconCanvas.nativeElement;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject('Canvas context is not available');
        return;
      }

      // Set canvas dimensions and style
      canvas.width = 100;
      canvas.height = 100;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white'; // Background color
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render the selected icon
      const icon = document.createElement('i');
      icon.className = this.selectedIcon; // Example: 'fa fa-star'
      icon.style.fontSize = '80px';
      icon.style.color = 'black';
      icon.style.display = 'inline-block';

      document.body.appendChild(icon);
      const rect = icon.getBoundingClientRect();

      if (rect.width && rect.height) {
        const computedStyle = getComputedStyle(icon);
        ctx.font = `${rect.height}px ${computedStyle.fontFamily}`;
        ctx.fillStyle = computedStyle.color || 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(icon.textContent || '\uf005', canvas.width / 2, canvas.height / 2); // Use Unicode if applicable
      } else {
        reject('Icon dimensions are invalid.');
      }

      document.body.removeChild(icon);

      // Convert canvas to data URL and display the image
      const dataUrl = canvas.toDataURL('image/png');
      this.convertedImage = dataUrl; // Store the base64 image URL

      // Convert canvas to Blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject('Failed to convert canvas to Blob.');
        }
      }, 'image/png');
    });
  }



  btnLoader: boolean = false;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closeModal1') closeModal1!: ElementRef;
  @ViewChild('iconCanvas') iconCanvas!: ElementRef<HTMLCanvasElement>;
  async addQuestion() {
    this.interestForm.markAllAsTouched();

    const interest = this.interestForm.value.interest?.trim();
    if (!interest) {
      return;
    }

    if (this.interestForm.valid) {
      this.btnLoader = true;
      const formURlData = new FormData();
      formURlData.set('interest', this.interestForm.value.interest);

      // if (this.selectedIcon) {
      //   formURlData.set('icon', this.selectedIcon); // Add the selected icon to the form data
      // }

      // try {
      //   const iconBlob = await this.convertIconToImage();
      //   formURlData.append('intrestImg', iconBlob, 'icon.png'); // Add icon image to form data
      // } catch (error) {
      //   console.error('Error converting icon to image:', error);
      // }

      // if (this.profileImageFile) {
      //   formURlData.append('intrestImg', this.profileImageFile);
      // }

      this.service.postAPIFormData('adminRouter/addInterestsByAdmin', formURlData).subscribe({
        next: (resp) => {
          if (resp.status == true) {
            this.toastr.success(resp.message);
            this.btnLoader = false;
            this.closeModal.nativeElement.click();
            this.getNotifications();
            this.interestForm.reset();
            this.profileImageFile = null;
          } else {
            this.toastr.warning(resp.message);
            this.btnLoader = false;
            this.getNotifications();
          }
        },
        error: (error) => {
          this.btnLoader = false;
          if (error.error.message) {
            this.toastr.error(error.error.message);
          } else {
            this.toastr.error('Something went wrong!');
          }
        }
      });
    }
  }

  btnEditLoader: boolean = false;

  editSubAdmin() {
    this.editForm.markAllAsTouched();

    // Check for spaces in current_password and new_password
    const question = this.editForm.value.question?.trim();

    if (!question) {
      return;
    }

    if (this.editForm.valid) {
      this.btnEditLoader = true;
      const formURlData = new URLSearchParams();
      formURlData.set('question', this.editForm.value.question);
      formURlData.set('id', this.updateId);

      this.service.postAPI('sub-admin/updateDefaultInterviewQuestionById', formURlData.toString()).subscribe({
        next: (resp) => {
          if (resp.success == true) {
            this.toastr.success(resp.message);
            this.btnEditLoader = false;
            this.closeModal1.nativeElement.click();
            this.getNotifications();
          } else {
            this.toastr.warning(resp.message);
            this.btnEditLoader = false;
            this.getNotifications();
          }
        },
        error: (error) => {
          this.btnEditLoader = false;
          if (error.error.message) {
            this.toastr.error(error.error.message);
          } else {
            this.toastr.error('Something went wrong!');
          }
        }
      });
    }
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
              this.getNotifications();
            },
            error: error => {
              this.toastr.error('Something went wrong!')
              console.log(error.message)
            }
          });
        }
      });
  }


}
