import { Directive, EmbeddedViewRef, OnDestroy, OnInit, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxContextStoreModel } from './ngx-context-store-model';
import { NgxContextStoreSetDirective } from './ngx-context-store-set.directive';

@Directive({
  selector: '[getContext]',
})
export class NgxContextStoreGetDirective implements OnInit, OnDestroy {
  private _view: EmbeddedViewRef<NgxContextStoreModel> | undefined;
  private _parentSubsciption: Subscription | undefined;
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Optional() private parentContextHolder: NgxContextStoreSetDirective
  ) { }
  
  ngOnInit(): void {
    const context = this.parentContextHolder?.context$.value ?? undefined;
    this._parentSubsciption = this.parentContextHolder?.context$.subscribe(ctx => this.updateContext(ctx));
    if (this.templateRef && this.viewContainer) {
      this._view = this.viewContainer.createEmbeddedView(this.templateRef, context);
    }
  }

  ngOnDestroy() {
    if (this._view) {
      this.viewContainer.clear();
      this._view = undefined;
    }
    if (this._parentSubsciption) {
      this._parentSubsciption.unsubscribe();
    }
  }

  updateContext(context: NgxContextStoreModel) {
    if (this._view?.context != null) {
      for (const key in context) {
        if (Object.prototype.hasOwnProperty.call(context, key)) {
          this._view.context[key] = context[key];
        }
      }
    }
  }

}
