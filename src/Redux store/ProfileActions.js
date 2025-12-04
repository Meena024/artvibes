import { ProfileActions as SliceActions } from "./ProfileSlice";
import { dbApi } from "../Components/Hooks/DbApi";

/* ------------------ FETCH PROFILE FROM BACKEND ------------------ */

export const fetchProfile = (userId) => {
  return async (dispatch) => {
    const data = await dbApi.get(`users/${userId}`);
    if (!data || !data.userProfile) return;

    dispatch(
      SliceActions.setProfile({
        name: data.userProfile.name || "",
        email: data.userProfile.email,
        role: data.userProfile.role,
      })
    );
  };
};

/* ------------------ UPDATE PROFILE ------------------ */

export const updateProfile = (userId, profileData) => {
  return async (dispatch) => {
    await dbApi.patch(`users/${userId}`, profileData);

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

export const ProfileActions = {
  ...SliceActions,
  fetchProfile,
  updateProfile,
  resetProfile,
};
