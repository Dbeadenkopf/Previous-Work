# Modal

A general purpose, customizable modal container.

## Component props

- `title`: optional title label for modal.
- `close`: a callback to set the modal activation state. When set, you can either click the `'x'` in the upper right corner of the modal, press the `esc` key, or click outside the modal to close it.

---

## Example usage

```js
const ModalExample = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalConfirm = () => {
    console.log('Confirmed');
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={() => setShowModal(!showModal)}>Trigger Modal</Button>

      {showModal && (
        <Modal title="Modal Title" close={() => setShowModal(!showModal)}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem provident non soluta, sapiente ea
            praesentium explicabo laborum, odio eligendi deserunt amet, debitis sequi sunt perspiciatis
            officia ab. Hic, consequatur eos!
          </p>
          <p>Are you sure?</p>
          <Button onClick={handleModalConfirm}>Yes</Button>{' '}
          <Button color="danger" onClick={() => setShowModal(!showModal)}>
            No
          </Button>
        </Modal>
      )}
    </>
  );
};
```
