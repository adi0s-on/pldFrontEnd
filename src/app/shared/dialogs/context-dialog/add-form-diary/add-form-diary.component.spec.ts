import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormDiaryComponent } from './add-form-diary.component';

describe('AddFormDiaryComponent', () => {
  let component: AddFormDiaryComponent;
  let fixture: ComponentFixture<AddFormDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormDiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
