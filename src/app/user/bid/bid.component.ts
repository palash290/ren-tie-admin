import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrl: './bid.component.css'
})
export class BidComponent {

  p: any = 1;
  data: any[] = [];
  searchQuery = '';

  constructor(private route: Router, private service: SharedService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getNotifications();
  }


  getNotifications() {
    this.service.getApi('adminRouter/bid_listing').subscribe({
      next: resp => {
        this.data = resp.detail;
      },
      error: error => {
        console.log(error.message)
      }
    });
  }

  cleanCityName(city: string): string {
    return city?.replace(/"/g, '');
  }

}
