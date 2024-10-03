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
  const [nAccountHolderName, setNAccountHolderName] = useState(accountHolderName);
  const [nAccountType, setNAccountType] = useState(accountType);
  const [nBalance, setNBalance] = useState(balance);
  const [nAdharCard, setNAdharCard] = useState(adharCard);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  
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
      setAlertType('success');
      setAlertMsg('Account updated successfully!');
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
    setAlertType('success');
    setAlertMsg('Account removed successfully!');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleDeposit = () => {
    const amount = parseFloat(prompt("Enter amount to deposit:"));
    if (!isNaN(amount) && amount > 0) {
      deposit(accountNumber, amount);
    } else {
      alert("Invalid amount!");
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(prompt("Enter amount to withdraw:"));
    if (!isNaN(amount) && amount > 0) {
      withdraw(accountNumber, amount);
    } else {
      alert("Invalid amount!");
    }
  };

  return (
    <>
      {showAlert && (
        <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1000, width: "320px" }}>
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
        <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} trigger={<Button>Update Account</Button>}>
          <input type="text" value={nAccountHolderName} onChange={(e) => setNAccountHolderName(e.target.value)} placeholder="Account Holder Name" /><br/>
          <input type="text" value={nAccountType} onChange={(e) => setNAccountType(e.target.value)} placeholder="Account Type" /><br/>
          <input type="number" value={nBalance} onChange={(e) => setNBalance(e.target.value)} placeholder="Balance" /><br></br>
          <input type="text" value={nAdharCard} onChange={(e) => setNAdharCard(e.target.value)} placeholder="Adhar Card" /><br></br>
          <button onClick={handleUpdate}>Confirm</button>
          <button onClick={handleClose}>Cancel</button>
        </Modal>
        <button onClick={handleDeposit}>Deposit</button>
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
    </>
  );
};

export default AccountCard;
