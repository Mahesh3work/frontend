import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDialogComponent } from './site-dialog.component';

describe('SiteDialogComponent', () => {
  let component: SiteDialogComponent;
  let fixture: ComponentFixture<SiteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
