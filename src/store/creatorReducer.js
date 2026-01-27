import {
  SET_CREATORS,
  UPDATE_IS_FOLLOW_CREATOR,
  SET_USER_FOLLOW_CREATORS,
  RESET_USER_FOLLOW_CREATORS,
  RESET_FOLLOW_UPDATED, // ✅ new action
} from "./actions";

const DEFAULT_DATA = {
  list: [],
  count: 0,
  currentPage: 0,
  lastPage: 0,
  isMoreData: true,
  channelIds: [],
};

const initialState = {
  creators: { ...DEFAULT_DATA },
  followCreators: { ...DEFAULT_DATA },
  youtubeVideos: { ...DEFAULT_DATA },
  followUpdated: false, // ✅ new flag
};

const updateCreatorFollow = (state, data) => {
  if (!data) {
    return state;
  }

  const creatorObj = { ...state.creators };
  const list = [...creatorObj.list];

  list.forEach((element) => {
    if (element.user_id === data.user_id) {
      element.isFollow = data.isFollow;
    }
  });

  creatorObj.list = list;

  return {
    ...state,
    creators: creatorObj,
  };
};

// eslint-disable-next-line default-param-last
const creatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CREATORS: {
      const creatorObj = { ...state.creators };

      if (action.payload) {
        creatorObj.list =
          action.payload.current_page === 1
            ? action.payload.data
            : [...creatorObj.list, ...(action.payload.data || [])];
        creatorObj.count = action.payload.total;
        creatorObj.currentPage = action.payload.current_page;
        creatorObj.lastPage = action.payload.last_page;
        creatorObj.isMoreData =
          action.payload.current_page !== action.payload.last_page;

        const channelIds = action.channelIds || [];
        return {
          ...state,
          creators: creatorObj,
          channelIds,
        };
      }

      return {
        ...state,
        creators: { ...DEFAULT_DATA },
      };
    }

    case UPDATE_IS_FOLLOW_CREATOR: {
      const updatedState = updateCreatorFollow(state, action.payload);
      return {
        ...updatedState,
        followUpdated: action.payload?.isFollow === true, // ✅ conditionally set
      };
    }

    case SET_USER_FOLLOW_CREATORS: {
      if (action.payload) {
        const creatorObj = { ...state.followCreators };

        creatorObj.list = [...creatorObj.list, ...(action.payload.data || [])];
        creatorObj.count = action.payload.total;
        creatorObj.currentPage = action.payload.current_page;
        creatorObj.lastPage = action.payload.last_page;
        creatorObj.isMoreData =
          action.payload.current_page !== action.payload.last_page;

        creatorObj.list.forEach((element) => {
          element.isFollow = true;
        });

        return {
          ...state,
          followCreators: creatorObj,
        };
      }

      return {
        ...state,
        followCreators: { ...DEFAULT_DATA },
      };
    }

    case RESET_USER_FOLLOW_CREATORS: {
      const obj = updateCreatorFollow(state, action.payload);

      return {
        ...obj,
        followCreators: { ...DEFAULT_DATA },
      };
    }

    case RESET_FOLLOW_UPDATED: {
      // ✅ reset the flag manually
      return {
        ...state,
        followUpdated: false,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default creatorReducer;
