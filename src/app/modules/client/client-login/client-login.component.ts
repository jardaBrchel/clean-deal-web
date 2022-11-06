import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {Router} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import {Client, ClientRes} from '../../../models/client.model';
import {mapClient} from '../../../helpers/client';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent implements OnInit {
  loginForm: UntypedFormGroup = {} as any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private clientService: ClientService,
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  async ngOnInit() {
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

    this.clientService.loginViaEmail(username, password).subscribe(
      {
        next: (res: ClientRes) => {
          const client: Client = mapClient(res);
          this.clientService.setCurrentUser(client);
          this.router.navigate(['/client', 'orders']);
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
