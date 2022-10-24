import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCamionComponent } from './ver-camion.component';

describe('VerCamionComponent', () => {
  let component: VerCamionComponent;
  let fixture: ComponentFixture<VerCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCamionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
