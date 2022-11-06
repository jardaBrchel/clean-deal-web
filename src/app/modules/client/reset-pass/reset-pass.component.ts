import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import aes from 'crypto-js/aes';
import * as cryptoJs from 'crypto-js';
import {CLIENT_ID_SALT} from '../../../config/api.config';
import {validateEmail} from '../../../helpers/logic.helper';
import {Client} from '../../../models/client.model';
import {mapClient} from '../../../helpers/client';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  resetPassForm: UntypedFormGroup = {} as any;
  token!: string;
  userEmail!: string;
  invalidEmail = false;
  errorOnSubmit = false;
  passwordsMatch = true;
  formSent = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private clientService: ClientService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  async ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    this.userEmail = aes.decrypt(this.token, CLIENT_ID_SALT).toString(cryptoJs.enc.Utf8);

    if (!validateEmail(this.userEmail)) {
      this.invalidEmail = true;
    }

    this.resetPassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordAgain: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onPassResetSubmit() {
    this.formSent = true;
    this.passwordsMatch = this.resetPassForm.value['password'] === this.resetPassForm.value['passwordAgain'];
    if (!this.resetPassForm.valid || !this.passwordsMatch) {
      return;
    }

    this.doPassReset();
  }

  doPassReset() {
    const {password} = this.resetPassForm.value;

    this.clientService.resetPass(this.userEmail, password).subscribe(
      {
        next: () => {
          this.clientService.loginViaEmail(this.userEmail, password).subscribe(
            {
              next: (res) => {
                // TODO otestovat
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
        },
        error: (e) => {
          this.errorOnSubmit = true;
          console.log('error');
        },
        complete: () => {
        }
      }
    )
  }

}
