import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import { useState } from "react";
const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  // we need a usestate since we want to change the state
  // of a certain element
  const [incrementAmount, setIncrementAmount] = useState(0);

  // made addValue short circuit problem, if there is
  // no ammount just go ahead and zero it out
  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p href="text" className="amount-count">
        {count}
      </p>
      <div>
        <button
          href="text"
          className="button-one"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          href="text"
          className="button-two"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <input
        type="text"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(e.target.value)}
      />

      <div>
        <button
          href="text"
          className="add-amount"
          onClick={() => dispatch(incrementByAmount(addValue))}
        >
          Add Amount
        </button>
        <button
          href="text"
          className="reset-amount"
          onClick={() => dispatch(resetAll)}
        >
          Reset
        </button>
      </div>
    </section>
  );
};

export default Counter;
