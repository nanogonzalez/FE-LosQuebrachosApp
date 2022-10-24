import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerChoferComponent } from './ver-chofer.component';

describe('VerChoferComponent', () => {
  let component: VerChoferComponent;
  let fixture: ComponentFixture<VerChoferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerChoferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
