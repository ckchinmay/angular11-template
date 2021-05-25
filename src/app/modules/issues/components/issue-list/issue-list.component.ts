import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BugService } from '../../services';
import { ConfirmBoxService } from '../../../../core/services';
import { ToastrService } from 'ngx-toastr';
import { Bug } from '@app/modules/issues/models';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  IssuesList: any = [];
  currentRec: any;

  ngOnInit() {
    this.loadIssues();

  }

  constructor(
    private route: ActivatedRoute,
    public bugService: BugService,
    private alertService: ToastrService,
    private confirmBoxService: ConfirmBoxService
  ) { }

  // Issues list
  loadIssues() {
    this.IssuesList = this.route.snapshot.data['issues'];
    // return this.bugService.GetIssues().subscribe((data: {}) => {
    //   this.IssuesList = data;
    // })
  }

  confirmDeleteIssue(data: any) {
    this.currentRec = data;
    this.confirmBoxService.confirmThis("Are you sure you want to delete this record?", this.doDeleteIssue.bind(this), this.cancelDeleteIssue.bind(this));
  }

  doDeleteIssue() {
    this.deleteIusse(this.currentRec);
  }

  cancelDeleteIssue() {
    this.currentRec = null;
  }

  // Delete issue
  deleteIusse(data: Bug) {
    var index = this.IssuesList.map((x: Bug) => { return x.issue_name }).indexOf(data.issue_name);
    return this.bugService.DeleteBug(Number(data.id)).subscribe(res => {
      this.IssuesList.splice(index, 1)
      this.alertService.success('Issue deleted!');
      this.cancelDeleteIssue();
    })
  }

}