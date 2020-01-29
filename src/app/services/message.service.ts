import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  setMessage$: Observable<any>;
  private setMessageSubject = new Subject<any>();

  constructor() {
    this.setMessage$ = this.setMessageSubject.asObservable();
  }

  public setMessage(value: string) {
    this.setMessageSubject.next(value);
  }
}
