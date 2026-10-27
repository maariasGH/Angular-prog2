import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSucursales } from './lista-sucursales';

describe('ListaSucursales', () => {
  let component: ListaSucursales;
  let fixture: ComponentFixture<ListaSucursales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSucursales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSucursales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
