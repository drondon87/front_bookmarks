import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCapituloComponent } from './detalle-capitulo.component';

describe('DetalleCapituloComponent', () => {
  let component: DetalleCapituloComponent;
  let fixture: ComponentFixture<DetalleCapituloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCapituloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCapituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
