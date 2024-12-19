import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { Observable } from 'rxjs'
import { SharedService } from '../services/shared.service'

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor (private service: SharedService, private router: Router) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.service.isLogedIn()) {
      // this.router.navigate(['/home/login']);
      return true
    }
    this.router.navigate(['/admin/login'])
    return false
  }
}
