import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContextDialogComponent} from './context-dialog.component';
describe('EditDialogComponent', () => {
  let component: ContextDialogComponent;
  let fixture: ComponentFixture<ContextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
