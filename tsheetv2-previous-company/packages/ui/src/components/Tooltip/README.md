# Tooltip

## Usage

After importing the `tooltip`, this component has to be used with two different props: `content` and `position`.

`content` is the text of the tooltip while position is the specific position you want. Content can either be a string or HTML element. The default position is `top`.

There are four different positions to choose from: `top`, `bottom`, `right` and `left`.

There are also three colors to choose from: `blue`, `orange` and `grey`. `Blue` is default and does not require modifiers. To modify the style, see the below example.

A disabled prop exists. This option will not render the tooltip when the boolean prop `disabled` is true. It is false by default. See the third example below (the `? true : false` values of the statement only exist for the sake of the example as they are not necessary.)

> **Note:**
> there is a modifier for `gap` which adjusts the spacing between the target object and the tooltip. The default value is 10 pixels and this should fit for any object; however, if you would like to adjust the value to any other number, do so by setting, as an example for 5 pixels, `gap=5` but any number can work.

---

## Example

```js
const TooltipExample = () => {
  return (
    <>
      // A basic tooltip with no modifiers.
      <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
        <div>
          Nulla pharetra diam sit amet. Eget mi proin sed libero enim. Neque aliquam vestibulum morbi blandit
          cursus risus. Faucibus a pellentesque sit amet porttitor.{' '}
        </div>
      </Tooltip>
      // A tooltip with the orange styling.
      <Tooltip
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        color="orange"
        position="bottom">
        <div>
          Dapibus ultrices in iaculis nunc sed augue. Euismod in pellentesque massa placerat duis ultricies.
          Lectus magna fringilla urna porttitor.{' '}
        </div>
      </Tooltip>
      // A tooltip that is disabled under a specific condition
      <Tooltip
        content="Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus."
        disabled={!exampleCondition ? true : false}>
        <div>
          Praesent tristique magna sit amet. Amet nulla facilisi morbi tempus iaculis urna id volutpat. Cras
          semper auctor neque vitae tempus.{' '}
        </div>
      </Tooltip>
    </>
  );
};
```
