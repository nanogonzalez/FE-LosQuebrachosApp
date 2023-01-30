import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDestinoDeCargaComponent } from './listado-destino-de-carga.component';

describe('ListadoDestinoDeCargaComponent', () => {
  let component: ListadoDestinoDeCargaComponent;
  let fixture: ComponentFixture<ListadoDestinoDeCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoDestinoDeCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDestinoDeCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
