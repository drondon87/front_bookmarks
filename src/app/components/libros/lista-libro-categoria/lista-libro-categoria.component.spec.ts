import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLibroCategoriaComponent } from './lista-libro-categoria.component';

describe('ListaLibroCategoriaComponent', () => {
  let component: ListaLibroCategoriaComponent;
  let fixture: ComponentFixture<ListaLibroCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaLibroCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaLibroCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
