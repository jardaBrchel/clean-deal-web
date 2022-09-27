import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, of, from} from 'rxjs';
import {map} from 'rxjs/operators';
import {AdminService} from '../services/admin.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const currentUser = this.adminService.getCurrentUser();
    // If user is already setup, then go ahead
    if (currentUser?.username) {
      return of(true);
    }
    return from(this.adminService.getUserFromStorage())
      .pipe(
        map((user) => {
          if (typeof user === 'string') {
            user = JSON.parse(user);
          }
          if (user && user.username) {
            this.adminService.setCurrentUser(user);
            return true;
          } else {
            // if (user) {
            //   this.router.navigate(['/admin']);
            // }
            this.router.navigate(['/admin/login']);
            return false;
          }
        })
      );
  }
}
