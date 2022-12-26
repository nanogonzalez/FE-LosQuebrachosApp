import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOrdenDeGasoilComponent } from './listado-orden-de-gasoil.component';

describe('ListadoOrdenDeGasoilComponent', () => {
  let component: ListadoOrdenDeGasoilComponent;
  let fixture: ComponentFixture<ListadoOrdenDeGasoilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoOrdenDeGasoilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoOrdenDeGasoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
