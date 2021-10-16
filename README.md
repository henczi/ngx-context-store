# NgxContextStore

An alternative yet advanced mechanism for Angular components to share data.

## Getting started

### Install via NPM

```ts
npm install ngx-context-store
```
### Import the `NgxContextStoreModule`
```ts
@NgModule({
  /* ... */
  imports: [
    /* ... */
    NgxContextStoreModule,
  ],
})
export class AppModule { }
```
## Usage

You can use the `setContext` (optionally with `setContextUnder`) or `setContextO` directive to put some data into the context.

Then you can get this data everywhere inside with the `getContext` directive.

### Easy syntax

```html
<div [setContext]="'some value'"><!-- $implicit context -->
  <div *setContext="'other value' under 'other'"> <!-- 'other' is the name of the context key -->
    <div *getContext="let implicit; let other = other">
      <strong>
        {{implicit}} === 'some value'
        {{other}} === 'other value'
      </strong>
    </div>
  </div>
</div>
```

### Over multiple components

<!-- parent.component -->
```html
<div [setContextO]="{ lastname: 'Appleseed', info: '...' }">
    <child-component></child-component>
</div>
```

<!-- child.component -->
```html
<div *setContext="myHelp under 'help'"> <!-- myHelp is a function -->
    <grandchild-component></grandchild-component>
</div>
```

<!-- grandchild.component -->
```html
<div *getContext="let lastname = lastname; let info = info; let help = help">
    Lastname: {{lastname}}
    Info: {{info}}
    Help: {{help()}}
</div>
```
