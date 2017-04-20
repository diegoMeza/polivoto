import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionesComponent } from './elecciones.component';

describe('EleccionesComponent', () => {
  let component: EleccionesComponent;
  let fixture: ComponentFixture<EleccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EleccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
