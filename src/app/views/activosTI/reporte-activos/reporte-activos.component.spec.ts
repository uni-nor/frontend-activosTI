import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteActivosComponent } from './reporte-activos.component';

describe('ReporteActivosComponent', () => {
  let component: ReporteActivosComponent;
  let fixture: ComponentFixture<ReporteActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteActivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
