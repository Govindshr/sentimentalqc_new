import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlddataComponent } from './olddata.component';

describe('OlddataComponent', () => {
  let component: OlddataComponent;
  let fixture: ComponentFixture<OlddataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OlddataComponent]
    });
    fixture = TestBed.createComponent(OlddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
