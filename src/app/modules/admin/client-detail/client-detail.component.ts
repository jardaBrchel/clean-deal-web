import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminClient} from '../../../models/admin.model';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  client!: AdminClient;
  clientId!: string;
  clientForm: UntypedFormGroup = {} as any;


  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('clientId') || '';
    this.fetchClient();
    this.clientForm = this.formBuilder.group({
      clientInfo: [''],
    });
  }

  fetchClient() {
    this.adminService.getClient(this.clientId).subscribe(
      {
        next: (res: AdminClient) => {
          this.client = res
          this.clientForm.get('clientInfo')?.patchValue(res.info);
          console.log('details', res);
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }

  saveClientInfo() {
    this.adminService.saveClientInfo(this.clientId, this.clientForm.value['clientInfo']).subscribe(
      {
        next: (res: any) => {
        },
        error: (e) => {
        },
      }
    )

  }

}
