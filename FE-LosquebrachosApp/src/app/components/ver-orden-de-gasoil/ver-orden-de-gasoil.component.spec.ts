import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOrdenDeGasoilComponent } from './ver-orden-de-gasoil.component';

describe('VerOrdenDeGasoilComponent', () => {
  let component: VerOrdenDeGasoilComponent;
  let fixture: ComponentFixture<VerOrdenDeGasoilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerOrdenDeGasoilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerOrdenDeGasoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
