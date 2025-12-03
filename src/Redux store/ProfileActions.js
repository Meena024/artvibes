import { ProfileActions as SliceActions } from "./ProfileSlice";
import { dbApi } from "../../Components/Hooks/DbApi";

/* ------------------ FETCH PROFILE FROM BACKEND ------------------ */

export const fetchProfile = (userId) => {
  return async (dispatch) => {
    const data = await dbApi.get(`profiles/${userId}`);

    if (!data) return; // No profile exists yet

    dispatch(
      SliceActions.setProfile({
        name: data.name || "",
        email: data.email,
        role: data.role,
      })
    );
  };
};

/* ------------------ UPDATE PROFILE ------------------ */

export const updateProfile = (userId, profileData) => {
  return async (dispatch) => {
    await dbApi.patch(`profiles/${userId}`, profileData);

    dispatch(
      SliceActions.setProfile({
        name: profileData.name ?? "",
        email: profileData.email ?? "",
        role: profileData.role ?? "",
      })
    );
  };
};

/* ------------------ RESET PROFILE ------------------ */

export const resetProfile = () => {
  return (dispatch) => {
    dispatch(SliceActions.reset());
  };
};

/* ------------------ EXPORT ALL ACTIONS ------------------ */

export const ProfileAPI = {
  ...SliceActions,
  fetchProfile,
  updateProfile,
  resetProfile,
};
