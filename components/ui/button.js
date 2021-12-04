import { Fragment } from "react";

const Button = (props) => {
  return (
    <Fragment>
      <button
        onClick={props.onClick}
        className="inline-block p-2 m-2 mx-auto text-sm text-red-500"
      >
        {props.children}
      </button>
    </Fragment>
  );
};

export default Button;
