import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeTemplatesComponent } from './resume-templates.component';

describe('ResumeTemplatesComponent', () => {
  let component: ResumeTemplatesComponent;
  let fixture: ComponentFixture<ResumeTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
