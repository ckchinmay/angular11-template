import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExpirationAlertModalComponent } from './session-expiration-alert-modal.component';

describe('SessionExpirationAlertModalComponent', () => {
    let component: SessionExpirationAlertModalComponent;
    let fixture: ComponentFixture<SessionExpirationAlertModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SessionExpirationAlertModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionExpirationAlertModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});