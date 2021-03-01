import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AppContext } from "../Context/globalContext";

import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const Profile = ({ linkImage, Wow }) => {
  const [state, dispatch] = useContext(AppContext);
  const { user } = state;

  const history = useHistory();
  const linkImageDefault = `http://localhost:5000/uploads/${user.profileImage}`;
  const subscribe = false;

  const handleBeranda = () => {
    history.push("/beranda");
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div className="profile-container">
      <div className="profile--content-user">
        <div className="profile--content-logo">
          <img
            onClick={handleBeranda}
            src={Wow ? Wow : "image/beranda/wow-icon.png"}
            alt="wow logo"
          />
        </div>
        <div className="profile--content-foto">
          <img
            src={linkImageDefault ? linkImageDefault : "image/beranda/user.png"}
            alt="user"
          />
        </div>
        <h2>{user.fullName ? user.fullName : "Annonymous"}</h2>
        <p className={subscribe ? "text-success" : "text-danger"}>
          {subscribe ? "Subscribed" : "Not Subscribed Yet"}
        </p>
      </div>
      <div className="profile--content-menu">
        <div className="profile-icon start-line">
          <PersonOutlineOutlinedIcon style={{ fontSize: "30px" }} />
          <Link to="/profile-user">Profile</Link>
        </div>
        <div className="profile-icon end-line">
          <SubscriptionsOutlinedIcon style={{ fontSize: "30px" }} />
          <Link to="/subscribe">Subscribe</Link>
        </div>

        <div className="profile-icon">
          <ExitToAppOutlinedIcon style={{ fontSize: "30px" }} />
          <Link onClick={handleLogout} to="/">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
