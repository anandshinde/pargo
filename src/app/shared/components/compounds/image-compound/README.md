### IMAGE COMPOUND

Image Compound is a dumb UI component that handles displaying images from the
Bloomreach DAM.

**Extends:**

- Simple Component base class

**Inputs:**

- content:

  ```javascript
  // example

  {
    desktop: {
        height: 123
        size: 12345,
        url: "http://base.com/path/to/original",
        width: 123
    },
    mobile:{
        height: 123
        size: 12345,
        url: "http://base.com/path/to/thumbnail",
        width: 123
    }
  }
  ```

- presentation:

  ```javascript
  // example

  {
  	theme: 'dark';
  }
  ```

**Structure:**

Image Compoung leverages the HTML `<picture>` element.

```html
<picture>
	<source [attr.srcset]="mobile?.url" [media]="mobileBreakpoint" />
	<img [src]="desktop?.url" alt="" />
</picture>
```
