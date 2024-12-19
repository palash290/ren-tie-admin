import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {

  @ViewChild('imageTemplate', { static: true }) imageTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true }) statusTemplate!: TemplateRef<any>;

  data: any[] = [];
  columns!: any[];
  p: any = 1;
  totalAdminEarning: any;
  totalTotalEarning: any;
  searchQuery = '';

  constructor(private service: SharedService) {}

  ngOnInit(): void {

    this.columns = [
      { prop: 'userProfile', name: 'Image', cellTemplate: 'imageTemplate' },
      { prop: 'userName', name: 'Name' },
      { prop: 'gender', name: 'Gender' },
      { prop: 'total_amount', name: 'Total Amount' },
      { prop: 'payment_status', name: 'Payment Status', cellTemplate: 'statusTemplate' }
    ]; 
    this.getNotifications();
  }

  getNotifications(): void {
    this.service.getApi('adminRouter/transaction_history').subscribe({
      next: (resp: any) => {
        this.data = resp.detail;
        this.totalAdminEarning = resp.totalAdminEarning;
        this.totalTotalEarning = resp.totalTotalEarning;
      },
      error: (error: any) => {
        console.log(error.message);
      }
    });
  }


}
