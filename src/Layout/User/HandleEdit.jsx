import { useEffect, useState } from "react";
import TechnicalError from "../../Components/Modal/TechnicalError";
import { useSelector } from "react-redux";
import { getUser } from "../../api/userApi";
import AddressEditor from "./EditAddress";
import ProfileEditor from "./profileEditor";

export default function HandleEdit({ editProfile, setEditProfile }) {
  const [profile, setProfile] = useState(null); // Set initial state to null
  const [error, setError] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    getUser(setProfile, user.token).then((res) => {
      
      
      if (!res) {
        setError(true);
      }
    });
  }, [user.token,]);

  return (
    <>

      {isEditAddress ? (
        <AddressEditor user={profile} isEditAddress={isEditAddress} setIsEditAddress={setIsEditAddress} />
      ) : (
        profile && <ProfileEditor setEditProfile={setEditProfile} user={profile} setIsEditAddress={setIsEditAddress} />
      )}

      <TechnicalError setOpenModal={setError} openModal={error} />
    </>
  );
}
