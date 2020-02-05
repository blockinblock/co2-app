import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  setMessage$: Observable<any>;
  private setMessageSubject = new Subject<any>();

  setFeature$: Observable<any>;
  private setFeatureSubject = new Subject<any>();

  constructor() {
    this.setMessage$ = this.setMessageSubject.asObservable();
    this.setFeature$ = this.setFeatureSubject.asObservable();
  }

  /**
   * For sending a message to show / hide dashboard
   * @param value the message to send
   */
  public setMessage(value: string) {
    this.setMessageSubject.next(value);
  }

  /**
   * For sending an Open Layers feature
   * @param value the Open Layers feature
   */
  public setFeature(value: string) {
    this.setFeatureSubject.next(value);
  }
}
