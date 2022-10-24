import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmBoxComponent } from './mat-confirm-box.component';

describe('MatConfirmBoxComponent', () => {
  let component: MatConfirmBoxComponent;
  let fixture: ComponentFixture<MatConfirmBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatConfirmBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatConfirmBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
