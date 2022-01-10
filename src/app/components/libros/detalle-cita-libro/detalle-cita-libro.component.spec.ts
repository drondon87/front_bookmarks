import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCitaLibroComponent } from './detalle-cita-libro.component';

describe('DetalleCitaLibroComponent', () => {
  let component: DetalleCitaLibroComponent;
  let fixture: ComponentFixture<DetalleCitaLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCitaLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCitaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
