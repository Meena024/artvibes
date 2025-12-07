import { ProfileActions as SliceActions } from "./ProfileSlice";
import { dbApi } from "../Components/Hooks/DbApi";

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await dbApi.get(`users/${userId}`);

    if (!data || !data.userProfile) return;

    dispatch(
      SliceActions.setProfile({
        email: data.userProfile.email,
        role: data.userProfile.role,
        name: data.userProfile.name,
        phone: data.userProfile.phone,
        address: data.userProfile.address ?? [],
      })
    );
  };
};

export const updateFullProfile = (profileData) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    await dbApi.patch(`users/${userId}/userProfile`, profileData);

    dispatch(SliceActions.updateProfile(profileData));
  };
};

export const resetProfile = () => (dispatch) => dispatch(SliceActions.reset());

export const ProfileActions = {
  ...SliceActions,
  fetchProfile,
  updateFullProfile,
  resetProfile,
};
