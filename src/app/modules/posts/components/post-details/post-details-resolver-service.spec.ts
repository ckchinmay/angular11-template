import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsResolverServiceComponent } from './post-details-resolver-service.component';

describe('PostDetailsResolverServiceComponent', () => {
    let component: PostDetailsResolverServiceComponent;
    let fixture: ComponentFixture<PostDetailsResolverServiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PostDetailsResolverServiceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostDetailsResolverServiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});