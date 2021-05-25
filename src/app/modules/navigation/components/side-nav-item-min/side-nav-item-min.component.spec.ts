import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockSideNavItem } from '@testing/mocks/navigation';

import { SideNavItemMinComponent } from './side-nav-item-min.component';

const mockSideNavItem = new MockSideNavItem();

@Component({
    template: `
        <app-side-nav-item-min [sideNavItem]="sideNavItem"></app-side-nav-item-min>
    `,
})
class TestHostComponent {
    sideNavItem = mockSideNavItem;
    // someFunction(event: Event) {}
}

describe('SideNavItemMinComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let hostComponentDE: DebugElement;
    let hostComponentNE: Element;

    let component: SideNavItemMinComponent;
    let componentDE: DebugElement;
    let componentNE: Element;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent, SideNavItemMinComponent],
            imports: [NoopAnimationsModule],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        hostComponentDE = fixture.debugElement;
        hostComponentNE = hostComponentDE.nativeElement;

        componentDE = hostComponentDE.children[0];
        component = componentDE.componentInstance;
        componentNE = componentDE.nativeElement;

        fixture.detectChanges();
    });

    it('should display the component', () => {
        expect(hostComponentNE.querySelector('app-side-nav-item-min')).toEqual(jasmine.anything());
    });
});
