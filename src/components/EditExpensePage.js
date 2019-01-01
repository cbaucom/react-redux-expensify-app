import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import ConfirmModal from "./ConfirmModal";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import { openModal, closeModal } from "../actions/modal";

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push("/");
  };
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.closeModal();
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button
            className="button button--danger"
            onClick={this.props.openModal}
          >
            Remove Expense
          </button>
          <ConfirmModal
            isOpen={this.props.modalStatus}
            onRequestClose={this.props.closeModal}
            expenseDescription={this.props.description}
            onRemove={this.onRemove}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
  modalStatus: state.modal.modalIsOpen
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data)),
  openModal: () => dispatch(openModal()),
  closeModal: () => dispatch(closeModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpensePage);
