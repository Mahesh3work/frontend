import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardcompComponent } from './boardcomp.component';

describe('BoardcompComponent', () => {
  let component: BoardcompComponent;
  let fixture: ComponentFixture<BoardcompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardcompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
