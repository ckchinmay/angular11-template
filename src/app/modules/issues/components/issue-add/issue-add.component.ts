import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import { BugService } from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issue-add',
  templateUrl: './issue-add.component.html',
  styleUrls: ['./issue-add.component.scss']
})

export class AddIssueComponent implements OnInit {
  issueForm: any;
  IssueArr: any = [];

  ngOnInit() {
    this.addIssue()
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public bugService: BugService,
    private alertService: ToastrService
  ){ }

  addIssue() {
    this.issueForm = this.fb.group({
      issue_name: new FormControl('', Validators.required),
      issue_message: new FormControl('', Validators.required)
    });

  }

  submitForm() {
    this.bugService.CreateBug(this.issueForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/issues'));
      this.alertService.success('Issue added!');
    });
  }

}