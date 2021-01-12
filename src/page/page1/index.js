import React from "react";
import {connect} from 'react-redux';
import {actions} from "@/store/modules/test/actions";

// redux的state
const mapStateToProps = state => {
  const {testStore} = state;
  return {...testStore};
};

// redux的actions
const mapDispatchToProps = dispatch => {
  return {
    updateState: (value) => {
      dispatch(actions.updateState(value));
    }
  }
}

const Page1 = connect(mapStateToProps, mapDispatchToProps)((props) => {
  const onClick = () => {
    const {count, updateState} = props;
    updateState({
      count: count + 1,
    });
  };
  return <div>
    <p onClick={onClick}>{props.count}</p>
    {/*<button onClick={() => setNumber(number + 1)}>+</button>*/}
    {/*<button onClick={alertNumber}>alertNumber</button>*/}
  </div>
})

export default Page1;