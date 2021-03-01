import React, { useState } from "react";

const TransactionComponent = ({ index, data, getUserId }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleDropDownMenu = () => setShowDropDown(!showDropDown);
  return (
    <tr key={data.id}>
      <td>{index + 1}</td>
      <td>{data.user.fullName}</td>
      <td>
        <a href={`http://localhost:5000/uploads/${data.transferProof}`}>
          Image Proof
        </a>
      </td>
      <td>{data.remainingActive} / Hari</td>
      <td
        className={
          data.userStatus === "Active" ? "text-active" : "text-deactive"
        }
      >
        {data.userStatus}
      </td>
      <td
        className={
          data.paymentStatus === "Approved"
            ? "text-active"
            : data.paymentStatus === "Cancel"
            ? "text-deactive"
            : "text-warning"
        }
      >
        {data.paymentStatus}
      </td>
      <td>
        <img
          src="image/beranda/action-icon.png"
          alt="icon action"
          onClick={handleDropDownMenu}
          style={{ display: "inline-block", position: "relative" }}
          className="--cursor-pointer"
        />
        {showDropDown ? (
          <div className="dropdown--menu">
            <p
              onClick={() => getUserId(data.id, "Approved")}
              className="text-active --cursor-pointer"
            >
              Approved
            </p>
            <p
              onClick={() => getUserId(data.id, "Cancel")}
              className="text-deactive --cursor-pointer"
            >
              Cancel
            </p>
          </div>
        ) : null}
      </td>
    </tr>
  );
};

export default TransactionComponent;
