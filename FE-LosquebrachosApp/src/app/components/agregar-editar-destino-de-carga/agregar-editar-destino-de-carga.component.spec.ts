import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarDestinoDeCargaComponent } from './agregar-editar-destino-de-carga.component';

describe('AgregarEditarDestinoDeCargaComponent', () => {
  let component: AgregarEditarDestinoDeCargaComponent;
  let fixture: ComponentFixture<AgregarEditarDestinoDeCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarDestinoDeCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarDestinoDeCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
