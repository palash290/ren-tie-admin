import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  data: any[] = [];
  p: any = 1;

  constructor(private route: Router, private service: SharedService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getNotifications();
  }


  getNotifications() {
    this.service.getApi('adminRouter/getAllNotifications').subscribe({
      next: resp => {
        this.data = resp.detail.reverse();
      },
      error: error => {
        console.log(error.message)
      }
    });
  }


}
