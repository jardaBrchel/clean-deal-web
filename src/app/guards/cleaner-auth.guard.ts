import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {CleanerService} from '../services/cleaner.service';

@Injectable()
export class CleanerAuthGuard implements CanActivate {
  constructor(
    private cleanerService: CleanerService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('CleanerAuthGuard');
    const currentUser = this.cleanerService.getCurrentUser();
    // If user is already setup, then go ahead
    if (currentUser?.username) {
      return of(true);
    }
    return from(this.cleanerService.getUserFromStorage())
      .pipe(
        map((user) => {
          if (typeof user === 'string') {
            user = JSON.parse(user);
          }
          if (user && user.username) {
            this.cleanerService.setCurrentUser(user);
            return true;
          } else {
            this.router.navigate(['/cleaner/login']);
            return false;
          }
        })
      );
  }
}
