import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRuquestsComponent } from './book-ruquests.component';

describe('BookRuquestsComponent', () => {
  let component: BookRuquestsComponent;
  let fixture: ComponentFixture<BookRuquestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookRuquestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRuquestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
