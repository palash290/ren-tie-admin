import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    if (!value || !searchTerm) {
      return value;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return value.filter(item => {
      return item.fullName && item.fullName.toLowerCase().includes(lowerCaseSearchTerm) || item.fullName && item.fullName.includes(lowerCaseSearchTerm) || item.mobileNumber && item.mobileNumber.toString().includes(lowerCaseSearchTerm) ||
        item.name && item.name.toLowerCase().includes(lowerCaseSearchTerm) || item.name && item.name.includes(lowerCaseSearchTerm) ||
        item.intrest_name && item.intrest_name.toLowerCase().includes(lowerCaseSearchTerm) || item.intrest_name && item.intrest_name.includes(lowerCaseSearchTerm)
      //item.start_from && item.start_from.includes(lowerCaseSearchTerm) || item.expire_on && item.expire_on.includes(lowerCaseSearchTerm) 
      //item.boySide?.fullName && item.boySide?.fullName.toLowerCase().includes(searchTerm) || item.girlSide?.fullName && item.girlSide?.fullName.toLowerCase().includes(searchTerm)
    });
  }
  //date_raised
}



@Pipe({
  name: 'filter2'
})
export class FilterPipe2 implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    if (!value || !searchTerm) {
      return value;
    }

    searchTerm = searchTerm.toLowerCase();

    return value.filter(item => {
      return (
        (item.paid_to_User.fullName && item.paid_to_User.fullName.toLowerCase().includes(searchTerm)) ||
        (item.recived_from_User.fullName && item.recived_from_User.fullName.toLowerCase().includes(searchTerm)) ||
        (item.paid_to_User.mobileNumber && item.paid_to_User.mobileNumber.toString().includes(searchTerm)) ||
        (item.recived_from_User.mobileNumber && item.recived_from_User.mobileNumber.toString().includes(searchTerm))
      );
    });
  }
}


@Pipe({
  name: 'filter3'
})
export class FilterPipe3 implements PipeTransform {

  transform(value: any[], searchTerm: string): any[] {
    if (!value || !searchTerm) {
      return value;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return value.filter(item => {
      return item.boySide.fullName && item.boySide.fullName.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.girlSide.fullName && item.girlSide.fullName.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.name && item.name.toLowerCase().includes(lowerCaseSearchTerm) || item.name && item.name.includes(lowerCaseSearchTerm)
        
    });
  }
  //date_raised
}