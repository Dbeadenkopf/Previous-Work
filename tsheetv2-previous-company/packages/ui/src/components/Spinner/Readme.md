# Spinner

## Basic Usage

Use the `spinner` component with styling from the container class:

```js
return (
  <>
    <Spinner className={styles.container} />;
  </>
);
```

---

## Props

All the properties are optional.

### `className?: string`

Applies styling to the entire spinner component as a whole.

### `squareClassName?: string`

Applies styling to each individual square in the spinner.

### `color?: string`

Default value: `primary color of the T1CG logo`.

### `delay?: number`

Measure the amount of time that the animation of the logo is delayed. Default value: `500` (milliseconds).
