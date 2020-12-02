import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFormDiaryComponent } from './remove-form-diary.component';

describe('RemoveFormDiaryComponent', () => {
  let component: RemoveFormDiaryComponent;
  let fixture: ComponentFixture<RemoveFormDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFormDiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFormDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
