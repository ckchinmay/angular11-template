import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueListResolver } from './issue-list/issue-list-resolver-service';
import { AddIssueComponent } from './issue-add/issue-add.component';
import { EditIssueComponent } from './issue-edit/issue-edit.component';

export const components = [
    IssueListComponent,
    AddIssueComponent,
    EditIssueComponent
];

export const resolvers = [
    IssueListResolver
]


export * from './issue-list/issue-list.component';
export * from './issue-add/issue-add.component';
export * from './issue-edit/issue-edit.component';
export * from './issue-list/issue-list-resolver-service';
