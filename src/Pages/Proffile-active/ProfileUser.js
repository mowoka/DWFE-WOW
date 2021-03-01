import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ProfileUser.css";
import Profile from "../../Components/Profile";
import { AppContext } from "../../Context/globalContext";
import { API } from "../../config/api";
import UserBooks from "../../Components/UserBooks";
import LoadingComponent from "../../Components/Loading/LoadingComponent";
import SettingProfile from "../../Components/Profile/SettingProfile";
import EmailIcon from "@material-ui/icons/Email";
import WcIcon from "@material-ui/icons/Wc";
import CallIcon from "@material-ui/icons/Call";
import HomeIcon from "@material-ui/icons/Home";

const ProfileUser = ({}) => {
  const [posts, setPosts] = useState({
    gender: "",
    noHp: "",
    alamat: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [state] = useContext(AppContext);

  const { email } = state.user;
  const history = useHistory();

  const linkImage = `http://localhost:5000/uploads/${posts.profileImage}`;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goDetailBookPage = () => {
    history.push("/detail-book");
  };

  const GetProfile = async () => {
    try {
      setLoading(true);

      const profile = await API.get("/profile");

      setPosts({
        gender: profile.data.data.profile.gender,
        noHp: profile.data.data.profile.noHp,
        alamat: profile.data.data.profile.alamat,
        profileImage: profile.data.data.profile.profileImage,
      });

      setLoading(false);
      setProfile(true);
    } catch (error) {
      console.log("Profile not Found");
    }
  };

  useEffect(() => {
    GetProfile();
  }, []);
  const UserBookList = [
    {
      id: 1,
      img: "image/beranda/serankai.png",
      alt: "buku1",
      title: "Serangkai",
      author: "Valeri Patkar",
    },
    {
      id: 2,
      img: "image/beranda/serankai.png",
      alt: "buku1",
      title: "Serangkai",
      author: "Valeri Patkar",
    },
  ];

  return (
    <div className="beranda-container">
      <div className="beranda--container-profile">
        <Profile setPosts={setPosts} linkImage={linkImage} />
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="beranda--container-content">
          <h3 className="profile--title-name">Profile</h3>
          <div className="profile--user-description">
            <div className="user-description-menu">
              <div className="user--description">
                <div className="description--icon">
                  <EmailIcon className="user-icon" />
                </div>
                <div className="description--text">
                  <p>{email ? email : "set email"}</p>
                  <small>Email</small>
                </div>
              </div>
              <div className="user--description">
                <div className="description--icon">
                  <WcIcon className="user-icon" />
                </div>
                <div className="description--text">
                  <p>{posts.gender ? posts.gender : "set Gender"}</p>
                  <small>Gender</small>
                </div>
              </div>
              <div className="user--description">
                <div className="description--icon">
                  <CallIcon className="user-icon" />
                </div>
                <div className="description--text">
                  <p>{posts.noHp ? posts.noHp : "set Phone Number"}</p>
                  <small>Mobile Phone</small>
                </div>
              </div>
              <div className="user--description">
                <div className="description--icon">
                  <HomeIcon className="user-icon" />
                </div>
                <div className="description--text">
                  <p>{posts.alamat ? posts.alamat : "set Address"}</p>
                  <small>Address</small>
                </div>
              </div>
            </div>
            <div className="user--descriptionn-image">
              <img
                src={linkImage ? linkImage : "image/beranda/egi.png"}
                alt="foto-profile"
              />
              <div onClick={handleShow} className="user--description-button">
                <p>Edit profile</p>
              </div>
              <SettingProfile
                GetProfile={GetProfile}
                show={show}
                handleClose={handleClose}
                posts={posts}
                profile={profile}
                linkImage={linkImage}
              />
            </div>
          </div>
          <div className="profile--description-books">
            <h3>My List Books</h3>
            <div className="user--book-container">
              {UserBookList.map((book, index) => (
                <UserBooks
                  book={book}
                  key={book.id}
                  goDetailBookPage={goDetailBookPage}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUser;
