import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlicuotaFormComponent } from './alicuota-form.component';

describe('AlicuotaFormComponent', () => {
  let component: AlicuotaFormComponent;
  let fixture: ComponentFixture<AlicuotaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlicuotaFormComponent]
    });
    fixture = TestBed.createComponent(AlicuotaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
