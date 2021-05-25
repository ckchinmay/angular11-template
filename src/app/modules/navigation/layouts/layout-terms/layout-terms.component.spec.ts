import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTermsComponent } from './layout-terms.component';

describe('LayoutTermsComponent', () => {
  let component: LayoutTermsComponent;
  let fixture: ComponentFixture<LayoutTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
