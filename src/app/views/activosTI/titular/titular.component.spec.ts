import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitularComponent } from './titular.component';

describe('TitularComponent', () => {
  let component: TitularComponent;
  let fixture: ComponentFixture<TitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
