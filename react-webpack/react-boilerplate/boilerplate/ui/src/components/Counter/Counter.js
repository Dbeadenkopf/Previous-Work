import React from "react";
import { setCount, clearCount } from "../../redux/actions/counter";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectCount } from "../../redux/selectors/counter";

const Counter = () => {
  const dispatch = useAppDispatch();

  const count = useAppSelector(selectCount);

  return (
    <>
      <h3>Increment/Decrement Count</h3>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={() => dispatch(setCount(count - 1))}>-</button>
        {count}
        <button onClick={() => dispatch(setCount(count + 1))}>+</button>
      </div>
      <br />
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => dispatch(clearCount())}>Clear</button>
      </div>
    </>
  );
};

export default Counter;
