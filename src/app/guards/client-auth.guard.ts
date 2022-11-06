import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ClientService} from '../services/client.service';

@Injectable()
export class ClientAuthGuard implements CanActivate {
  constructor(
    private clientService: ClientService,
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const currentUser = this.clientService.getCurrentUser();
    // If user is already setup, then go ahead
    if (currentUser?.email) {
      return of(true);
    }
    return from(this.clientService.getUserFromStorage())
      .pipe(
        map((user) => {
          if (typeof user === 'string') {
            user = JSON.parse(user);
          }
          if (user && user.email) {
            this.clientService.setCurrentUser(user);
            return true;
          } else {
            // if (user) {
            //   this.router.navigate(['/admin']);
            // }
            this.router.navigate(['/client/login']);
            return false;
          }
        })
      );
  }
}
