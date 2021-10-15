import { Directive, EmbeddedViewRef, forwardRef, Host, Inject, Input, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgxContextStoreModel } from './ngx-context-store-model';

@Directive({
  selector: '[setContext], [setContextO]',
})
export class NgxContextStoreSetDirective implements OnInit, OnChanges, OnDestroy {
  private _view: EmbeddedViewRef<NgxContextStoreModel> | undefined;
  private _parentSubsciption: Subscription;
  
  private _localContext: NgxContextStoreModel;
  public context$ = new BehaviorSubject<NgxContextStoreModel>({});

  @Input() setContext: any;
  @Input() setContextUnder: string | undefined;
  @Input() setContextO: NgxContextStoreModel;

  constructor(
    @Optional() private templateRef: TemplateRef<any>,
    @Optional() private viewContainer: ViewContainerRef,
    @Optional()
    @SkipSelf()
    @Inject(forwardRef(() => NgxContextStoreSetDirective))
    private parentContextHolder: NgxContextStoreSetDirective
  ) {
    this._parentSubsciption = this.parentContextHolder?.context$.subscribe(ctx => this.updateContext());
  }

  ngOnInit(): void {
    // structural and attribute directive compatibility
    if (this.templateRef && this.viewContainer) {
      this._view = this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.setContext || changes?.setContextUnder) {
      const setContextUnder = changes?.setContextUnder?.currentValue ?? this.setContextUnder ?? '$implicit';
      const setContextValue = changes?.setContext?.currentValue ?? this.setContext;
      this._localContext = { ...this._localContext, ...{ [setContextUnder]: setContextValue } };
    } else if (changes?.setContextO) {
      this._localContext = { ...changes?.setContextO.currentValue };
    }
    this.updateContext();
  }

  ngOnDestroy() {
    if (this._view) {
      this.viewContainer.clear();
      this._view = undefined;
    }
    if (this._parentSubsciption) {
      this._parentSubsciption.unsubscribe();
    }
    this.context$.complete();
  }

  private updateContext() {
    const parentContext = this.parentContextHolder?.context$.value ?? undefined;
    this.context$.next({ ...parentContext, ...this._localContext });
  }

}
