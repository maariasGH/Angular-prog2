import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSucursales } from './tabla-sucursales';

describe('TablaSucursales', () => {
  let component: TablaSucursales;
  let fixture: ComponentFixture<TablaSucursales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaSucursales],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaSucursales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
