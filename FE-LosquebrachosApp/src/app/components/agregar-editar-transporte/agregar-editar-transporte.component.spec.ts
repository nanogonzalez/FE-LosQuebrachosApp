import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarTransporteComponent } from './agregar-editar-transporte.component';

describe('AgregarEditarTransporteComponent', () => {
  let component: AgregarEditarTransporteComponent;
  let fixture: ComponentFixture<AgregarEditarTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarTransporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
