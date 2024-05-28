import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSeguimientosComponent } from './reporte-seguimientos.component';

describe('ReporteSeguimientosComponent', () => {
  let component: ReporteSeguimientosComponent;
  let fixture: ComponentFixture<ReporteSeguimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteSeguimientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteSeguimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
