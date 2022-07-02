import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRightNavbarComponent } from './filter-right-navbar.component';

describe('FilterRightNavbarComponent', () => {
  let component: FilterRightNavbarComponent;
  let fixture: ComponentFixture<FilterRightNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRightNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRightNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
