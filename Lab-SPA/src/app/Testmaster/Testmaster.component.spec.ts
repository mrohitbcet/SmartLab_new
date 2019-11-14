/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestmasterComponent } from './Testmaster.component';

describe('TestmasterComponent', () => {
  let component: TestmasterComponent;
  let fixture: ComponentFixture<TestmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
