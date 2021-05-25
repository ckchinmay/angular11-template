import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueListResolverServiceComponent } from './issue-list-resolver-service.component';

describe('IssueListResolverServiceComponent', () => {
    let component: IssueListResolverServiceComponent;
    let fixture: ComponentFixture<IssueListResolverServiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IssueListResolverServiceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IssueListResolverServiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});