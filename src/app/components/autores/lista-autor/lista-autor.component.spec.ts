import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAutorComponent } from './lista-autor.component';

describe('ListaAutorComponent', () => {
  let component: ListaAutorComponent;
  let fixture: ComponentFixture<ListaAutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
