import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BugService } from '../../services';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.scss']
})

export class EditIssueComponent implements OnInit {
  IssuesList: any = [];
  updateIssueForm: any;

  ngOnInit() {
    this.updateForm()
  }

  constructor(
    private actRoute: ActivatedRoute,
    public bugService: BugService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private alertService: ToastrService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bugService.GetIssue(Number(id)).subscribe((data) => {
      this.updateIssueForm = this.fb.group({
        issue_name: [data.issue_name],
        issue_message: [data.issue_message]
      })
    })
  }

  updateForm() {
    this.updateIssueForm = this.fb.group({
      issue_name: [''],
      issue_message: ['']
    })
  }

  submitForm() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bugService.UpdateBug(Number(id), this.updateIssueForm.value).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/issues'));
      this.alertService.success('Issue updated!');
    })
  }

}