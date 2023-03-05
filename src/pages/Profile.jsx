import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    navigate(`/user/${user.username}`);
  });
  return <div>Profile</div>;
}

export default Profile;
