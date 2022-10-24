import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCamionComponent } from './listado-camion.component';

describe('ListadoCamionComponent', () => {
  let component: ListadoCamionComponent;
  let fixture: ComponentFixture<ListadoCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCamionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
