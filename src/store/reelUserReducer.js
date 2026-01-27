import { SET_USER_REELS, UPDATE_REEL_LIKES } from './actions';

const initialState = {
    list: [],
    count: 0,
    currentPage: 0,
    lastPage: 0,
    isMoreData: true,
    loadedUserReels: []
};

// eslint-disable-next-line default-param-last
const reelUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_REELS: {
            if (action.payload) {
                return {
                    ...state,
                    list: [...state.list, ...(action.payload.data || [])],
                    loadedUserReels: [...state.list, ...(action.payload.data || [])],
                    count: action.payload.total,
                    currentPage: action.payload.current_page,
                    lastPage: action.payload.last_page,
                    isMoreData: action.payload.current_page !== action.payload.last_page
                };
            }

            return {
                ...state,
                list: [],
                count: 0,
                lastPage: 0
            };
        }

        case UPDATE_REEL_LIKES: {
            const list = [...state.list];

            list.forEach((element) => {
                if (element.id === action.payload.id) {
                    element.is_like = action.payload.is_like;
                    element.total_likes = action.payload.total_likes;
                }
            });

            return { ...state, list };
        }

        default: {
            return { ...state };
        }
    }
};

export default reelUserReducer;
