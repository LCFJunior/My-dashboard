import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStartComponent } from './dashboard-start.component';

describe('DashboardStartComponent', () => {
  let component: DashboardStartComponent;
  let fixture: ComponentFixture<DashboardStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
