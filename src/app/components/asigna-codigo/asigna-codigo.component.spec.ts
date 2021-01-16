import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaCodigoComponent } from './asigna-codigo.component';

describe('AsignaCodigoComponent', () => {
  let component: AsignaCodigoComponent;
  let fixture: ComponentFixture<AsignaCodigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignaCodigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
