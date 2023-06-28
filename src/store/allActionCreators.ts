import {clearUser, finishLoading, setUser, startLoading} from "./reducers/auth";
import {displayToast} from "./reducers/notifications";

export const allActionCreators = {
    setUser,
    clearUser,
    startLoading,
    finishLoading,
    displayToast
}
