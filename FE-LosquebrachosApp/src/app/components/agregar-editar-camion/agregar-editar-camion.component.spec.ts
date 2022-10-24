import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarCamionComponent } from './agregar-editar-camion.component';

describe('AgregarEditarCamionComponent', () => {
  let component: AgregarEditarCamionComponent;
  let fixture: ComponentFixture<AgregarEditarCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarCamionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
