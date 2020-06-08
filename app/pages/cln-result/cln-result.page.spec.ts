import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClnResultPage } from './cln-result.page';

describe('ClnResultPage', () => {
  let component: ClnResultPage;
  let fixture: ComponentFixture<ClnResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClnResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClnResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
