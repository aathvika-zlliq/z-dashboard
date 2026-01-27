import {
  RESET_USER_FOLLOW_CREATORS,
  SET_REELS,
  SET_REELS_LAST_SCROLLED_INDEX,
  UPDATE_REEL_LIKES,
  UPDATE_REEL_VIEWS,
} from "./actions";

const initialState = {
  list: [],
  count: 0,
  currentPage: 0,
  isMoreData: true,
  loadedReels: [],
  lastScrolledIndex: 0,
};

const reelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REELS: {
      if (action.payload) {
        return {
          ...state,
          list: [...state.list, ...(action.payload.data || [])],
          count: action.payload.total,
          currentPage: action.payload.next_cursor,
          isMoreData: action.payload.next_cursor !== null,
        };
      }

      return {
        ...state,
        list: [],
        count: 0,
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

    case UPDATE_REEL_VIEWS: {
      const list = [...state.list];
      list.forEach((element) => {
        if (element.id === action.payload.id) {
          element.total_views = action.payload.total;
        }
      });

      return { ...state, list };
    }

    case RESET_USER_FOLLOW_CREATORS: {
      const updateFollow = (arr) =>
        arr.map((element) =>
          element.user_id === action.payload.user_id
            ? { ...element, isFollow: action.payload.isFollow }
            : element
        );

      return {
        ...state,
        list: updateFollow(state.list),
        loadedReels: updateFollow(state.loadedReels),
      };
    }

    case SET_REELS_LAST_SCROLLED_INDEX: {
      return {
        ...state,
        lastScrolledIndex: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default reelReducer;
