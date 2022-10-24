import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTransporteComponent } from './listado-transporte.component';

describe('ListadoTransporteComponent', () => {
  let component: ListadoTransporteComponent;
  let fixture: ComponentFixture<ListadoTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTransporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
