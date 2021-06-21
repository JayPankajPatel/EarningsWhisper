import { Component } from "react";
import { connect } from "react-redux";
import { grabUserInfo } from "../src/actions";

function User() {
  const [data, setdata] = useState([]);
  setdata(grabUserInfo());
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, { grabUserInfo })(User);
