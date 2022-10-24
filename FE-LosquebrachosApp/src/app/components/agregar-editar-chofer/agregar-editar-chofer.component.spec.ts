import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarChoferComponent } from './agregar-editar-chofer.component';

describe('AgregarEditarChoferComponent', () => {
  let component: AgregarEditarChoferComponent;
  let fixture: ComponentFixture<AgregarEditarChoferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEditarChoferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEditarChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
