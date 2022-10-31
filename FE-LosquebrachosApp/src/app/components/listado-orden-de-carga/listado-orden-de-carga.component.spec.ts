import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOrdenDeCargaComponent } from './listado-orden-de-carga.component';

describe('ListadoOrdenDeCargaComponent', () => {
  let component: ListadoOrdenDeCargaComponent;
  let fixture: ComponentFixture<ListadoOrdenDeCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoOrdenDeCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoOrdenDeCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
