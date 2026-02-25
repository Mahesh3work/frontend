import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HadctComponent } from './hadct.component';

describe('HadctComponent', () => {
  let component: HadctComponent;
  let fixture: ComponentFixture<HadctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HadctComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HadctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
