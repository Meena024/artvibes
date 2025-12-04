import { ProfileActions as SliceActions } from "./ProfileSlice";
import { dbApi } from "../Components/Hooks/DbApi";

/* ------------------ FETCH PROFILE FROM BACKEND ------------------ */

export const fetchProfile = (userId) => {
  return async (dispatch) => {
    const data = await dbApi.get(`users/${userId}`);
    if (!data || !data.userProfile) return;

    dispatch(
      SliceActions.setProfile({
        name: data.userProfile.name ?? "user",
        email: data.userProfile.email,
        role: data.userProfile.role,
      })
    );
  };
};

/* ------------------ UPDATE PROFILE ------------------ */

export const updateName = (userId, profileData) => {
  return async (dispatch) => {
    await dbApi.patch(`users/${userId}/userProfile`, profileData);

    dispatch(SliceActions.setName(profileData.name ?? "user"));
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
  updateName,
  resetProfile,
};
