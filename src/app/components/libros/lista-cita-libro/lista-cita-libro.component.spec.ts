import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCitaLibroComponent } from './lista-cita-libro.component';

describe('ListaCitaLibroComponent', () => {
  let component: ListaCitaLibroComponent;
  let fixture: ComponentFixture<ListaCitaLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCitaLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCitaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
