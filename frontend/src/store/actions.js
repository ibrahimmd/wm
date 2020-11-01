export const ActionTypes = {
    SET_USER:       "SET_USER",
    CLOCK_IN:       "CLOCK_IN",
    CLOCK_OUT:      "CLOCK_OUT",
    RESET_STATE:    "RESET_STATE",
};

export function setUser(user_id) {
    return {
        type: ActionTypes.SET_USER,
        payload: user_id,
    };
}

export function setClockIn(clock_in) {
    return {
        type: ActionTypes.CLOCK_IN,
        payload: clock_in,
    };
}

export function setClockOut(clock_out) {
    return {
        type: ActionTypes.CLOCK_OUT,
        payload: clock_out,
    };
}

export function resetState() {
    return {
        type: ActionTypes.RESET_STATE,
        payload: 0,
    }
}
