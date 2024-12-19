import { Component } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent {

  p: any = 1;
  data: any[] = [];
  searchQuery = '';

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.service.getApi('adminRouter/listOfUsersSubscription').subscribe({
      next: resp => {
        this.data = resp.detail;
      },
      error: error => {
        console.log(error.message)
      }
    });
  }


}
