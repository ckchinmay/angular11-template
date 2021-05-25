import { TestBed } from '@angular/core/testing';

import { IssuesGuard } from './issues.guard';

describe('Issues Guards', () => {
    let issuesGuard: IssuesGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [IssuesGuard],
        });
        issuesGuard = TestBed.get(IssuesGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            issuesGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });
});
