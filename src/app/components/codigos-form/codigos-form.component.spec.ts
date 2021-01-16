import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigosFormComponent } from './codigos-form.component';

describe('CodigosFormComponent', () => {
  let component: CodigosFormComponent;
  let fixture: ComponentFixture<CodigosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
