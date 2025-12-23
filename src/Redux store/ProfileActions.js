import { ProfileActions as SliceActions } from "./ProfileSlice";
import { dbApi } from "../Components/Hooks/DbApi";

/* ------------------ FETCH PROFILE ------------------ */

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if (!userId) return;

    const data = await dbApi.get(`users/${userId}`);
    const profile = data?.userProfile;
    if (!profile) return;

    dispatch(
      SliceActions.setProfile({
        email: profile.email,
        role: profile.role,
        name: profile.name,
        phone: profile.phone,
        address: profile.address ?? [],
      })
    );
  };
};

/* ------------------ UPDATE FULL PROFILE ------------------ */

export const updateFullProfile = (profileData) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if (!userId) return;

    await dbApi.patch(`users/${userId}/userProfile`, profileData);
    dispatch(SliceActions.updateProfile(profileData));
  };
};

/* ------------------ RESET ------------------ */

export const resetProfile = () => (dispatch) => dispatch(SliceActions.reset());

/* ------------------ EXPORT ALL ------------------ */

export const ProfileActions = {
  ...SliceActions,
  fetchProfile,
  updateFullProfile,
  resetProfile,
};
