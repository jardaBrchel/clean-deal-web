import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {
  resetPassForm: UntypedFormGroup = {} as any;
  emailSent = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private clientService: ClientService,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    this.resetPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onPassResetSubmit() {
    // TODO validation check zda jsou hesla stejna
    if (!this.resetPassForm.valid) {
      return;
    }

    this.doPassReset();
  }

  doPassReset() {
    const {email} = this.resetPassForm.value;

    this.clientService.sendForgotPass(email).subscribe(
      {
        next: (res) => {
          // TODO display message with link to login
          this.emailSent = true;
          this.resetPassForm.reset();
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
