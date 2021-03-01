import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import LoadingComponent from "../Loading/LoadingComponent";
import { API } from "../../config/api";

const SettingProfile = ({
  show,
  handleClose,
  GetProfile,
  posts,
  profile,
  linkImage,
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formProfile, setFormProfile] = useState({
    gender: "",
    noHp: "",
    alamat: "",
    profileImage: null,
  });
  useEffect(() => {
    profile
      ? setFormProfile({
          gender: posts.gender,
          noHp: posts.noHp,
          alamat: posts.alamat,
          profileImage: linkImage,
        })
      : setFormProfile({
          gender: "",
          noHp: "",
          alamat: "",
          profileImage: null,
        });
  }, [profile, posts]);

  const { gender, noHp, alamat, profileImage } = formProfile;

  const onChange = (e) => {
    const updateForm = { ...formProfile };
    updateForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormProfile(updateForm);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = new FormData();

      body.append("gender", gender);
      body.append("noHp", noHp);
      body.append("alamat", alamat);
      body.append("profileImage", profileImage);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      setLoading(true);

      const post = await API.post("/add-profile", body, config);

      setLoading(false);

      const response = post.data;

      setMessage(response.message);
      if (post.data.message === "Profile Successfully added") {
        handleClose();
        GetProfile();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const body = new FormData();

      body.append("gender", gender);
      body.append("noHp", noHp);
      body.append("alamat", alamat);
      body.append("profileImage", profileImage);

      setLoading(true);

      const post = await API.patch("/edit-profile", body, config);

      setLoading(false);

      const response = post.data;

      setMessage(response.message);

      if (response.status === "Success") {
        handleClose();
        GetProfile();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <h3
              style={{
                textAlign: "center",
                fontWeight: "700px",
              }}
            >
              {profile ? "Editing Profile" : "Submit Profile"}
            </h3>
            <div
              style={{
                textAlign: "center",
                color: "red",
              }}
            >
              {message ? message : null}
            </div>
            <Form onSubmit={profile ? (e) => onUpdate(e) : (e) => onSubmit(e)}>
              <input
                type="text"
                placeholder="Male / Female"
                className="form-control mt-5"
                name="gender"
                onChange={(e) => onChange(e)}
                value={gender}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="form-control mt-3"
                name="noHp"
                value={noHp}
                onChange={(e) => onChange(e)}
              />
              <input
                type="text"
                placeholder="Addresss"
                className="form-control mt-3"
                name="alamat"
                value={alamat}
                onChange={(e) => onChange(e)}
              />
              <input
                type="file"
                className="form-control mt-3"
                name="profileImage"
                onChange={(e) => onChange(e)}
              />
              <input
                type="submit"
                className="btn btn-primary mt-4"
                value={profile ? "Update Profile" : "Add Profile"}
              />
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default SettingProfile;
