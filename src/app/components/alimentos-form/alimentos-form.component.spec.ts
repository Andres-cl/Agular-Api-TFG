import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosFormComponent } from './alimentos-form.component';

describe('AlimentosFormComponent', () => {
  let component: AlimentosFormComponent;
  let fixture: ComponentFixture<AlimentosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
