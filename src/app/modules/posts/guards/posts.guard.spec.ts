import { TestBed } from '@angular/core/testing';

import { PostsGuard } from './posts.guard';

describe('Posts Guards', () => {
    let postsGuard: PostsGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [PostsGuard],
        });
        postsGuard = TestBed.get(PostsGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            postsGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });
});
