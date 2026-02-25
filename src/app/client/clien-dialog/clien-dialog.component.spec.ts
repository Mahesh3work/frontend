import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienDialogComponent } from './clien-dialog.component';

describe('ClienDialogComponent', () => {
  let component: ClienDialogComponent;
  let fixture: ComponentFixture<ClienDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
