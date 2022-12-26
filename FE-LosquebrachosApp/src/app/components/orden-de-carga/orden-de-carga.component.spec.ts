import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDeCargaComponent } from './orden-de-carga.component';

describe('OrdenDeCargaComponent', () => {
  let component: OrdenDeCargaComponent;
  let fixture: ComponentFixture<OrdenDeCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenDeCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenDeCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
