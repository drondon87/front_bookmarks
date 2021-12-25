import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCapituloComponent } from './lista-capitulo.component';

describe('ListaCapituloComponent', () => {
  let component: ListaCapituloComponent;
  let fixture: ComponentFixture<ListaCapituloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCapituloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCapituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
