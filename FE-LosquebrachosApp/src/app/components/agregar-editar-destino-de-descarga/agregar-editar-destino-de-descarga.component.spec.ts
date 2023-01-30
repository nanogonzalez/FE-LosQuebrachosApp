import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarDestinoDeDescargaComponent } from './agregar-editar-destino-de-descarga.component';

describe('AgregarEditarDestinoDeDescargaComponent', () => {
  let component: AgregarEditarDestinoDeDescargaComponent;
  let fixture: ComponentFixture<AgregarEditarDestinoDeDescargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarDestinoDeDescargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarDestinoDeDescargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
