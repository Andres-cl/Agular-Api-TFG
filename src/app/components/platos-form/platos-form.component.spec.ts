import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatosFormComponent } from './platos-form.component';

describe('PlatosFormComponent', () => {
  let component: PlatosFormComponent;
  let fixture: ComponentFixture<PlatosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
