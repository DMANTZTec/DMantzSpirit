/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopicstoreComponent } from './topicstore.component';

describe('TopicstoreComponent', () => {
  let component: TopicstoreComponent;
  let fixture: ComponentFixture<TopicstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
