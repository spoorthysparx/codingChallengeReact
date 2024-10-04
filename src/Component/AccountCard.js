import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { Alert } from "@mui/material";
import "./AccountCard.css";

const AccountCard = ({
  accountNumber,
  accountHolderName,
  accountType,
  balance,
  adharCard,
  remove,
  update,
  deposit,
  withdraw,
}) => {
  const [open, setOpen] = useState(false);
  const [nAccountHolderName, setNAccountHolderName] =
    useState(accountHolderName);
  const [nAccountType, setNAccountType] = useState(accountType);
  const [nBalance, setNBalance] = useState(balance);
  const [nAdharCard, setNAdharCard] = useState(adharCard);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [amount, setAmount] = useState("");
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const handleUpdate = () => {
    const updatedData = {};

    if (nAccountHolderName !== accountHolderName) {
      updatedData.accountHolderName = nAccountHolderName;
    }

    if (nAccountType !== accountType) {
      updatedData.accountType = nAccountType;
    }

    if (nBalance !== balance) {
      updatedData.balance = nBalance;
    }

    if (nAdharCard !== adharCard) {
      updatedData.adharCard = nAdharCard;
    }

    if (Object.keys(updatedData).length > 0) {
      update(accountNumber, updatedData);
      setAlertType("success");
      setAlertMsg("Account updated successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setNAccountHolderName(accountHolderName);
    setNAccountType(accountType);
    setNBalance(balance);
    setNAdharCard(adharCard);
    setOpen(false);
  };

  const handleRemove = () => {
    remove(accountNumber);
    setAlertType("success");
    setAlertMsg("Account removed successfully!");
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      deposit(accountNumber, depositAmount);
      setAlertType("success");
      setAlertMsg("Amount deposited successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setDepositModalOpen(false);
    } else {
      alert("Invalid amount!");
    }
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
      withdraw(accountNumber, withdrawAmount);
      setAlertType("success");
      setAlertMsg("Amount withdrawn successfully!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setWithdrawModalOpen(false);
    } else {
      alert("Invalid amount!");
    }
  };

  return (
    <>
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1000,
            width: "320px",
          }}
        >
          <Alert severity={alertType}>{alertMsg}</Alert>
        </div>
      )}
      <div className="account-card">
        <h3>Account Number: {accountNumber}</h3>
        <p>Account Holder Name: {accountHolderName}</p>
        <p>Account Type: {accountType}</p>
        <p>Balance: {balance}</p>
        <p>Adhar Card: {adharCard}</p>
        <button onClick={handleRemove}>Remove Account</button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          trigger={
            <Button onClick={() => setOpen(true)}>Update Account</Button>
          }
        >
          <Modal.Header>Update Account Details</Modal.Header>
          <Modal.Content>
            <input
              type="text"
              value={nAccountHolderName}
              onChange={(e) => setNAccountHolderName(e.target.value)}
              placeholder="Account Holder Name"
            />
            <br />
            <input
              type="text"
              value={nAccountType}
              onChange={(e) => setNAccountType(e.target.value)}
              placeholder="Account Type"
            />
            <br />
            <input
              type="number"
              value={nBalance}
              onChange={(e) => setNBalance(e.target.value)}
              placeholder="Balance"
            />
            <br />
            <input
              type="text"
              value={nAdharCard}
              onChange={(e) => setNAdharCard(e.target.value)}
              placeholder="Adhar Card"
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleUpdate}>Confirm</Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </Modal.Actions>
        </Modal>

        <Modal
          open={depositModalOpen}
          onClose={() => setDepositModalOpen(false)}
          trigger={
            <Button onClick={() => setDepositModalOpen(true)}>Deposit</Button>
          }
        >
          <Modal.Header>Deposit Amount</Modal.Header>
          <Modal.Content>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to deposit"
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleDeposit}>Confirm</Button>
            <Button onClick={() => setDepositModalOpen(false)}>Cancel</Button>
          </Modal.Actions>
        </Modal>

        <Modal
          open={withdrawModalOpen}
          onClose={() => setWithdrawModalOpen(false)}
          trigger={
            <Button onClick={() => setWithdrawModalOpen(true)}>Withdraw</Button>
          }
        >
          <Modal.Header>Withdraw Amount</Modal.Header>
          <Modal.Content>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to withdraw"
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleWithdraw}>Confirm</Button>
            <Button onClick={() => setWithdrawModalOpen(false)}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </div>
    </>
  );
};

export default AccountCard;
