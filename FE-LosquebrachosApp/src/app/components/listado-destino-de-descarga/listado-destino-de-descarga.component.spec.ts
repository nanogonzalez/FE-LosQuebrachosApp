import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDestinoDeDescargaComponent } from './listado-destino-de-descarga.component';

describe('ListadoDestinoDeDescargaComponent', () => {
  let component: ListadoDestinoDeDescargaComponent;
  let fixture: ComponentFixture<ListadoDestinoDeDescargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoDestinoDeDescargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDestinoDeDescargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
