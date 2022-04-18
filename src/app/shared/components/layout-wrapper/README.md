### Layout Wrapper

The layout wrapper wraps feature components with a responsive grid
structure that provides content inset and background image capabilities.

**Extends:**

- Simple Component base class

**Inputs:**

- content:

  ```javascript
  // example

    {
        backgroundImage: {
            original :{
                height: 123
                size: 12345,
                url: "http://base.com/path/to/thumbnail",
                width: 123
            },
             thumbnail :{
                height: 123
                size: 12345,
                url: "http://base.com/path/to/thumbnail",
                width: 123
             },
        }
    }
  ```

- presentation:

  - **theme**: `[dark, light]` Use this for ensuring that the
    text is light on a dark background and vice versa.
  - **inset**: `[true, false]` When true, all content will be confined to
    the "content" width. This will not apply to ant background images that
    are set.
  - **stackMobile** `[true, false]` When true, the background image and the
    overlay content will stack in mobile.

  ```javascript
  // example

  {
  	theme: 'dark';
  	isInset: true;
  	stackMobile: true;
  }
  ```

**Structure:**

Layout Wrapper leverages Angulat transclusion

```angular2html
<section
    class="layout-container"
    [ngClass]="{ 'has-background': hasBackground }">
	<div class="layout-container_grid"
	   [ngClass]="{
	      'inset': contentIsInset,
		  'stack-in-mobile': stackInMobile
	   }">
		<div class="layout-container_background"
           [style.backgroundImage]="backgroundImage"></div>
		<div class="layout-container_grid_area">
		  <ng-content></ng-content>
		</div>
	</div>
</section>

```

**Usage:**

```angular2html

<mflooring-layout-wrapper
  [content]="backgroundImageContent"
  [presentation]="backgroundImagePresentation">

    <!-- Content goes in here -->

</mflooring-layout-wrapper>

```
