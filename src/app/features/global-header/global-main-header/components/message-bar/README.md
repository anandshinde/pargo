## Mohawk Message Bar

### Purpose

The message bar provides a container attached to the bottom of the main
header to display messages to the user.

### API

```typescript
interface MessageBarProps {
	message?: string;
	color?: string;
	isError?: boolean;
	autoClose?: boolean;
	duration?: number;
}
```

- **message**: The message text displayed to the user. [default: null]
- **color**: color used for the background. If not specified, the color will
  be either red or green based on _isError_. [default: null]
- **isError**: If `true`, messages are displayed as white on red, otherwise
  they are white on green. If _color_ is specified, messages will be white
  on whatever color is provided.[default: false]
- **autoClose**: If `true`, the message bar will automatically close after
  the specified _duration_ or 10000ms. If `false`, it will need to be closed
  manually. [default: true]
- **duration**: number of milliseconds to display the message bar before
  closing. [default: 10000]

### Usage

In order to display a message, import the `MessagesService` and call the
`setResponseMessage` method. Provide a configuration based on your needs. If
a message is not provided, the message bar will not display.

There can be only one message at a time, so is a message is triggered while
another is still visible, it will replace it.

```typescript
this.messages.setResponseMessage({
	message: `An error occurred processing your request: ${
		resp.error?.error_description || resp.status
	}`,
	isError: true,
	duration: 12000,
	autoClose: true,
});
```
