import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliasFormComponent } from './familias-form.component';

describe('FamiliasFormComponent', () => {
  let component: FamiliasFormComponent;
  let fixture: ComponentFixture<FamiliasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamiliasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
