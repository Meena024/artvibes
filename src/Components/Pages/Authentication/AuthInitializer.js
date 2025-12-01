import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthAction } from "../../../Redux store/AuthSlice";
import { fetchAuthData } from "../../../Redux store/AuthActions";
// import { fetchUserData } from "../../../Redux store/ExpenseActions";
// import { firebaseUrl } from "../../../Redux store/ExpenseSlice";

export const useAuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(AuthAction.userAuthenticated(false));
      return;
    }

    dispatch(AuthAction.userAuthenticated(true));
    dispatch(fetchAuthData(token)).then((id) => {
      // dispatch(fetchUserData(firebaseUrl, id));
    });
  }, [dispatch]);
};
