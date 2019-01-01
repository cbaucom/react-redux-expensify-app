import React from "react";
import { connect } from "react-redux";
import { startLogin, authenticateWithNewAccount } from "../actions/auth";
import ConfirmAuthModal from "./ConfirmAuthModal";
import { openModal, closeModal } from "../actions/modal";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credential: props.credential ? props.credential : "",
      currProvider: props.currProvider ? props.currProvider : "",
      providerName: props.providerName ? props.providerName : ""
    };
  }

  addNewAccount = () => {
    this.props.closeModal();
    authenticateWithNewAccount(this.state.currProvider, this.state.credential);
  };
  auth = (providerName, e) => {
    e.preventDefault();

    this.props
      .startLogin(providerName)
      .then(({ code, credential, currProvider }) => {
        if (code === "auth/account-exists-with-different-credential") {
          this.setState(() => ({
            credential,
            currProvider,
            providerName: currProvider.providerId
          }));
          this.props.openModal();
        }
      });
  };
  render() {
    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Expensify</h1>
          <p>A place to track your expenses</p>
          <button
            className="button button--google-login"
            onClick={this.auth.bind(this, "google.com")}
          >
            <span className="button--soc-icon">
              <img src="/images/google-ico.png" />
            </span>
            <span className="button--text">Login with Google</span>
          </button>
          <button
            className="button button--facebook-login"
            onClick={this.auth.bind(this, "facebook.com")}
          >
            <span className="button--soc-icon">
              <img src="/images/facebook-ico.png" />
            </span>
            <span className="button--text">Login with Facebook</span>
          </button>
          <button
            className="button button--github-login"
            onClick={this.auth.bind(this, "github.com")}
          >
            <span className="button--soc-icon">
              <img src="/images/github-ico.png" />
            </span>
            <span className="button--text">Login with Github</span>
          </button>
        </div>
        <ConfirmAuthModal
          isOpen={this.props.modalStatus}
          onRequestClose={this.props.closeModal}
          providerName={this.state.providerName}
          addNewAccount={this.addNewAccount}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: provider => dispatch(startLogin(provider)),
  authenticateWithNewAccount: (currProvider, credential) =>
    dispatch(authenticateWithNewAccount(currProvider, credential)),
  openModal: () => dispatch(openModal()),
  closeModal: () => dispatch(closeModal())
});

const mapStateToProps = (state, props) => ({
  modalStatus: state.modal.modalIsOpen
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
