import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Card, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddAccount = () => {
  const nav = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountType, setAccountType] = useState("Savings");
  const [balance, setBalance] = useState(1000);
  const [adharCard, setAdharCard] = useState("");

  const [alertMsg, setAlertMsg] = useState(""); 
  const [alertType, setAlertType] = useState(""); 
  const [showAlert, setShowAlert] = useState(false); 

  const addAccount = (e) => {
    e.preventDefault();

    const account = {
      accountNumber,
      accountHolderName,
      accountType,
      balance,
      adharCard,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:8080/api/user/addAccount", account, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setAlertType("success");
        setAlertMsg("Account added successfully!");
        setShowAlert(true);
        setAccountNumber("");
        setAccountHolderName("");
        setAccountType("Savings");
        setBalance(1000);
        setAdharCard("");
      })
      .catch((error) => {
        console.error("There was an error in adding the account!", error);
        setAlertType("error");
        setAlertMsg("Failed to add the account");
        setShowAlert(true);
      })
      .finally(() => {
        nav("/account");
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  return (
    <Box
      sx={{
        bgcolor: "#F5F5F5",
        width: "100vw",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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

      <Card
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: 1,
          border: "2px solid grey",
          width: "100%",
          maxWidth: 900,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#cc0000" }}
          align="center"
          gutterBottom
        >
          Add a New Account
        </Typography>
        <form onSubmit={addAccount}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Account Holder Name"
              variant="outlined"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              required
              InputProps={{
                sx: {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cc0000",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cc0000",
                  },
                },
              }}
            />
            <TextField
              label="Account Number"
              type="number"
              variant="outlined"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              InputProps={{
                sx: {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cc0000",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cc0000",
                  },
                },
              }}
            />
            <TextField
              label="Account Type"
              select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
              SelectProps={{
                native: true,
              }}
              variant="outlined"
              InputProps={{
                sx: {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cc0000",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cc0000",
                  },
                },
              }}
            >
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </TextField>
            <TextField
              label="Balance"
              type="number"
              variant="outlined"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
              InputProps={{
                sx: {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cc0000",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cc0000",
                  },
                },
              }}
            />
            <TextField
              label="Aadhar Card"
              variant="outlined"
              value={adharCard}
              onChange={(e) => setAdharCard(e.target.value)}
              required
              InputProps={{
                sx: {
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cc0000",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#cc0000",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#cc0000",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#b30000",
                },
              }}
              type="submit"
            >
              Add Account
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#cc0000",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#b30000",
                },
              }}
              type="button"
              onClick={() => nav("/account")} 
            >
              Close
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddAccount;
