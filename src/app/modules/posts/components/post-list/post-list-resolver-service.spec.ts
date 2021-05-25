import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListResolverServiceComponent } from './post-list-resolver-service.component';

describe('PostListResolverServiceComponent', () => {
    let component: PostListResolverServiceComponent;
    let fixture: ComponentFixture<PostListResolverServiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostListResolverServiceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostListResolverServiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});