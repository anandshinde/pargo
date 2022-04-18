## Mohawk Front End Styling

### Environment

- SCSS

All component-specific styling should be contained in the component's `.scss` file and import any needed mixins.

### Linting

[Stylelint](https://stylelint.io/) with the [Airbnb](https://github.com/airbnb/css) configuration is being used to handle linting of all SCSS/CSS.

```json
{
	"extends": "stylelint-config-airbnb",
	"rules": {
		"indentation": "tab"
	}
}
```

### Style Guide

Mohawk front end styling is based on SCSS as governed by the [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css#readme)

### Iconography

Mohawk uses a custom icon font for small, single-color icons that are applied
using a custom class name and ligatures.

Current version: 4.3

**Available Icons**

```html
<!-- Youtube Icon -->
<span class="icon-">youtube</span>

<!-- twitter Icon -->
<span class="icon-">twitter</span>

<!-- pinterest Icon -->
<span class="icon-">pinterest</span>

<!-- houzz Icon -->
<span class="icon-">houzz</span>

<!-- facebook Icon -->
<span class="icon-">facebook</span>

<!-- instagram Icon -->
<span class="icon-">instagram</span>

<!-- phone Icon -->
<span class="icon-">phone</span>

<!-- mail Icon -->
<span class="icon-">mail</span>

<!-- home Icon -->
<span class="icon-">home</span>

<!-- account Icon -->
<span class="icon-">account</span>

<!-- search Icon -->
<span class="icon-">search</span>

<!-- bag/cart Icon -->
<span class="icon-">bag</span>
<span class="icon-">cart</span>

<!-- map-pin/pin Icon -->
<span class="icon-">map-pin</span>
<span class="icon-">pin</span>
<!-- up arrow Icon -->
<span class="icon-">up</span>

<!-- down arrow Icon -->
<span class="icon-">down</span>

<!-- right arrow Icon -->
<span class="icon-">right</span>

<!-- left arrow Icon -->
<span class="icon-">left</span>

<!-- hamburger/mobile Icon -->
<span class="icon-">hamburger</span>
<span class="icon-">mobile</span>

<!-- close Icon -->
<span class="icon-">close</span>

<!-- target Icon -->
<span class="icon-">target</span>

<!-- link Icon -->
<span class="icon-">link</span>
<span class="icon-">chevronRight</span>

<!-- solid heart Icon -->
<span class="icon-">heart</span>
<span class="icon-">heart-solid</span>

<!-- heart outline Icon -->
<span class="icon-">heart-outline</span>

<!-- star Icon -->
<span class="icon-">star</span>

<!-- circle/unchecked Icon -->
<span class="icon-">unchecked</span>
<span class="icon-">circle</span>

<!-- checked Icon -->
<span class="icon-">checked</span>

<!-- Pencil Icon -->
<span class="icon-">pencil, edit</span>
<span class="icon-">edit</span>

<!-- visualizer Icon -->
<span class="icon-">visualizer</span>

<!-- bedroom Icon -->
<span class="icon-">bedroom</span>

<!-- livingroom Icon -->
<span class="icon-">livingroom</span>

<!-- bathroom Icon -->
<span class="icon-">bathroom</span>

<!-- camera Icon -->
<span class="icon-">camera</span>

<!-- expand Icon -->
<span class="icon-">expand</span>

<!-- kitchen Icon -->
<span class="icon-">kitchen</span>

<!-- scratch resistant Icon -->
<span class="icon-">scratchresistant</span>

<!-- waterproof Icon -->
<span class="icon-">waterproof</span>

<!-- easy clean Icon -->
<span class="icon-">easyclean</span>

<!-- wand Icon -->
<span class="icon-">wand</span>

<!-- wand reverse Icon -->
<span class="icon-">wand-rev</span>

<!-- coupon Icon -->
<span class="icon-">tag</span>
<span class="icon-">coupon</span>

<!-- delete/trash Icon -->
<span class="icon-">delete</span>
<span class="icon-">trash</span>
```
