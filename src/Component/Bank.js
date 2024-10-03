import React, { useState, useEffect } from "react";
import AccountCard from "./AccountCard"; // Ensure this is the correct import path
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";
import "./Bank.css"; // Import your CSS file if needed

const Bank = () => {
  const nav = useNavigate();
  const [accounts, setAccounts] = useState([]); // Initialize with an empty array
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [filteredAccounts, setFilteredAccounts] = useState([]); // Filtered accounts for search
  const [alertMsg, setAlertMsg] = useState(""); // Message for success/error alerts
  const [alertType, setAlertType] = useState(""); // Type for alert severity (success, error)
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alerts

  const handleAddAccount = () => {
    nav("/addAccount");
  };

  const getAccounts = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/user/getAllAccounts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAccounts(response.data); // Set the accounts to the state
        setFilteredAccounts(response.data); // Initialize filtered accounts
      })
      .catch((error) => {
        console.error("There was an error fetching the accounts!", error);
        setAlertType("error");
        setAlertMsg("There was an error fetching the accounts!");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  // Search accounts based on account number
  const handleSearch = () => {
    const searchId = parseInt(searchTerm); // Convert search term to number
    if (!isNaN(searchId)) {
      const filtered = accounts.filter(
        (account) => account.accountNumber === searchId
      ); // Filter accounts by number
      setFilteredAccounts(filtered); // Set filtered accounts
    } else {
      setFilteredAccounts(accounts); // Reset to all accounts if the search term is invalid
    }
  };

  const removeAccount = (id) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8080/api/user/deleteAccount/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertType("success");
        setAlertMsg("Account removed successfully");
        setShowAlert(true);
        getAccounts(); // Refresh account list after deletion
      })
      .catch((error) => {
        console.error("There was an error removing the account!", error);
        setAlertType("error");
        setAlertMsg("There was an error removing the account!");
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const updateAccount = (id, updatedAccount) => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://localhost:8080/api/user/updateAccount/${id}`,
        updatedAccount,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlertType("success");
        setAlertMsg("Account updated successfully");
        setShowAlert(true);
        getAccounts(); // Refresh account list after update
      })
      .catch((error) => {
        console.error("There was an error updating the account!", error);
        setAlertType("error");
        setAlertMsg("There was an error updating the account!");
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const handleDeposit = (id, amount) => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://localhost:8080/api/user/depositAmount/${id}/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlertType("success");
        setAlertMsg("Deposit successful");
        setShowAlert(true);
        getAccounts(); // Refresh account list after deposit
      })
      .catch((error) => {
        console.error("There was an error depositing the amount!", error);
        setAlertType("error");
        setAlertMsg("There was an error depositing the amount!");
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const handleWithdraw = (accountNumber, amount) => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `http://localhost:8080/api/user/withdrawAmount/${accountNumber}/${amount}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlertType("success");
        setAlertMsg("Withdrawal successful");
        setShowAlert(true);
        getAccounts(); // Refresh account list after withdrawal
      })
      .catch((error) => {
        console.error("There was an error withdrawing the amount!", error);
        setAlertType("error");
        setAlertMsg("There was an error withdrawing the amount!");
        setShowAlert(true);
      })
      .finally(() => {
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  useEffect(() => {
    getAccounts();
  }, []);

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

      <input
        type="text"
        placeholder="Search by Account Number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleAddAccount}>Add Account</button><br></br>
      <div className="accounts-container">
        {accounts
          ? filteredAccounts.map((account) => (
              <AccountCard
                key={account.accountNumber}
                accountNumber={account.accountNumber}
                accountHolderName={account.accountHolderName}
                accountType={account.accountType}
                balance={account.balance}
                adharCard={account.adharCard}
                remove={() => removeAccount(account.accountNumber)}
                update={(id, updatedAccount) =>
                  updateAccount(account.accountNumber, updatedAccount)
                }
                deposit={(id, amount) =>
                  handleDeposit(account.accountNumber, amount)
                }
                withdraw={(id, amount) =>
                  handleWithdraw(account.accountNumber, amount)
                }
              />
            ))
          : accounts?accounts.map((account) => (
              <AccountCard
                key={account.accountNumber}
                accountNumber={account.accountNumber}
                accountHolderName={account.accountHolderName}
                accountType={account.accountType}
                balance={account.balance}
                adharCard={account.adharCard}
                remove={() => removeAccount(account.accountNumber)}
                update={(id, updatedAccount) =>
                  updateAccount(account.accountNumber, updatedAccount)
                }
                deposit={(id, amount) =>
                  handleDeposit(account.accountNumber, amount)
                }
                withdraw={(id, amount) =>
                  handleWithdraw(account.accountNumber, amount)
                }
              />
            )): null}
      </div>
    </>
  );
};

export default Bank;
