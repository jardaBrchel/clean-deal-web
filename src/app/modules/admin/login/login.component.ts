import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {OrderService} from '../../../services/order.service';
import {AdminService} from '../../../services/admin.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {setAdminUser} from '../../../actions/admin-user.actions';
import {AdminUser} from '../../../models/admin.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup = {} as any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    // const adminUser: AdminUser = await this.adminService.getUserFromStorage();
    // console.log('LoginComponent adminUser', adminUser);
    // if (adminUser?.username) {
    //   this.router.navigate(['/admin']);
    // }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLoginSubmit() {
    // TODO validation check
    if (!this.loginForm.valid) {
      return;
    }

    this.doLogin();
  }

  doLogin() {
    const {username, password} = this.loginForm.value;

    this.adminService.loginViaEmail(username, password).subscribe(
      {
        next: (res) => {
          const adminUser: AdminUser = {
            username,
          }
          this.adminService.setCurrentUser(adminUser);
          this.router.navigate(['/admin']);
          console.log('logged in, do store set');
        },
        error: (e) => {
          console.log('error');
        },
        complete: () => {
        }
      }
    )
  }

}
