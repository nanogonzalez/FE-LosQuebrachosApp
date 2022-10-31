import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarOrdenDeCargaComponent } from './agregar-editar-orden-de-carga.component';

describe('AgregarEditarOrdenDeCargaComponent', () => {
  let component: AgregarEditarOrdenDeCargaComponent;
  let fixture: ComponentFixture<AgregarEditarOrdenDeCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarOrdenDeCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarOrdenDeCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
