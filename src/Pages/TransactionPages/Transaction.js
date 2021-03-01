import React, { useState, useContext, useEffect } from "react";
import "./Transaction.css";
import TransactionComponent from "../../Components/TransactionComponent";
import LoadingComponent from "../../Components/Loading/LoadingComponent";
import { API } from "../../config/api";
import { AppContext } from "../../Context/globalContext";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BookIcon from "@material-ui/icons/Book";

const Transaction = () => {
  const [showDropDownProfile, setShowDropDownProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useContext(AppContext);
  const [transactions, setTransactions] = useState([]);
  const { user } = state;
  const linkImageDefault = `http://localhost:5000/uploads/${user.profileImage}`;

  const getTransactions = async () => {
    setIsLoading(true);

    const response = await API.get("/transactions");

    setIsLoading(false);

    setTransactions(response.data.data.transactions);
  };

  const handleShowDropDownProfile = () =>
    setShowDropDownProfile(!showDropDownProfile);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const getUserId = (id, status) => {
    const findTransaction = transactions.filter(
      (transaction) => transaction.id == id
    );
    const transactionId = findTransaction[0].id;

    editTransaction(transactionId, status);
    // console.log(transaction);
    // console.log(transaction[0].id);
  };

  const editTransaction = async (id, status) => {
    try {
      const body = JSON.stringify({
        paymentStatus: status,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const post = await API.patch(`/transaction/${id}`, body, config);

      const Updateresponse = post.data.data.transaction;

      console.log(Updateresponse);
      const updatedPosts = transactions.map((post) =>
        post.id === Updateresponse.id ? Updateresponse : post
      );

      setTransactions(updatedPosts);
    } catch (error) {
      console.log("fungsi edit transaction error");
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="transaction--container">
          <div className="transaction--menu-header">
            <div className="header--menu-logo">
              <img src="image/beranda/wow-icon.png" alt="wow-logo" />
            </div>
            <div className="header--menu-profile">
              <img
                style={{
                  display: "inline-block",
                  position: "relative",
                  borderRadius: "50%",
                }}
                src={
                  linkImageDefault
                    ? linkImageDefault
                    : "image/beranda/admin-icon.png"
                }
                alt="admin-avatar"
                onClick={handleShowDropDownProfile}
              />
              {showDropDownProfile ? (
                <div className="dropdown--menu-profile">
                  <div className="dropdown--poligon">
                    <img src="image/beranda/action-icon-2.png" alt="arrow" />
                  </div>
                  <div className="dropdown--menu-list">
                    <div className="dropdown--addbook">
                      <Link to="/add-book">
                        <BookIcon
                          style={{
                            color: "#929292",
                            fontSize: "30px",
                            marginTop: "4px",
                          }}
                        />
                        <p style={{ marginLeft: "10px" }}>Add Book </p>
                      </Link>
                    </div>
                    <div className="dropdown--logout">
                      <Link onClick={handleLogout} to="/">
                        <ExitToAppIcon
                          className="text-deactive"
                          style={{
                            fontSize: "30px",
                            marginTop: "4px",
                          }}
                        />
                        <p style={{ marginLeft: "10px" }}>Logout</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="transaction--menu-body">
            <div className="body--menu-title">
              <p>Incoming Transaction</p>
            </div>
            <div className="body--menu-table">
              <table>
                <thead>
                  <tr
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      backgroundColor: "#f2f2f2",
                      fontSize: "14px",
                      color: "#ff0000",
                    }}
                  >
                    <th>No</th>
                    <th>Users</th>
                    <th>Bukti Transfer</th>
                    <th>Remaining Active</th>
                    <th>Status User</th>
                    <th>Status Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((data, index) => (
                    <TransactionComponent
                      index={index}
                      data={data}
                      getUserId={getUserId}
                      key={data.id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Transaction;
