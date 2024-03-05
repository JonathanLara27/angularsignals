import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private loadingSignal = signal<boolean>(false);

  public get isLoadingSignal() {
    return this.loadingSignal;
  }

  public setLoadingSignal(loading: boolean): void {
    this.loadingSignal.set(loading);
  }

  public get loading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }
}
