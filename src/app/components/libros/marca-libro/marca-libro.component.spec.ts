import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaLibroComponent } from './marca-libro.component';

describe('MarcaLibroComponent', () => {
  let component: MarcaLibroComponent;
  let fixture: ComponentFixture<MarcaLibroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaLibroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
