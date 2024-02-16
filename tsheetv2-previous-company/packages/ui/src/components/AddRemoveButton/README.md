# AddRemoveButton

## Usage

```js
return (
  <>
    <AddRemoveButton type="add" onClick={() => {}} />
  </>
);
```

---

## Required Props

The only required props for the AddRemoveButton component are `type` and `onClick`.

- There are only two values for type: `add` | `remove`

---

## Optional Functional Props

There are two optional functional props:

- `disabled?: boolean`

  - Removes the onClick function and cursor, as well as changes the button color to gray.

- `className?: string`

  - Allows for additional styling on the button and label.

---

## Customizable Props

There are a few props described below that can be used to customize the appearance of the initials:

- `label?: string`

  - Adds a label to the right of the button.

- `buttonColor?: Primary | Secondary | Warning | Success | Danger`

  - Default value: `Primary`.

- `fontColor?: Primary | Secondary | Warning | Success | Danger`

  - Default value: `Primary`.

- `size?: string`

  - The default size will be the FontAwesome class declaration without an additional size specification:
    `fa fa-circle-xmark`.

- `hover?: boolean`

  - Changes color to green or red on hover, depending on the button type.
