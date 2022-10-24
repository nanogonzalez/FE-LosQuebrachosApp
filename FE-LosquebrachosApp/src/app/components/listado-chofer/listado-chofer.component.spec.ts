import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoChoferComponent } from './listado-chofer.component';

describe('ListadoChoferComponent', () => {
  let component: ListadoChoferComponent;
  let fixture: ComponentFixture<ListadoChoferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoChoferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoChoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
