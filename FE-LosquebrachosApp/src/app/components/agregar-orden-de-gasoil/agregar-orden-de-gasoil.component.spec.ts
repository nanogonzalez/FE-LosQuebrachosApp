import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarOrdenDeGasoilComponent } from './agregar-orden-de-gasoil.component';

describe('AgregarOrdenDeGasoilComponent', () => {
  let component: AgregarOrdenDeGasoilComponent;
  let fixture: ComponentFixture<AgregarOrdenDeGasoilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarOrdenDeGasoilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarOrdenDeGasoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
