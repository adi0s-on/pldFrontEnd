import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainpageuserComponent } from './mainpageuser.component';

describe('MainpageuserComponent', () => {
  let component: MainpageuserComponent;
  let fixture: ComponentFixture<MainpageuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainpageuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainpageuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
