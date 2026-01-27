import {
  SET_CAMPAIGN_CATEGORIES,
  SET_CAMPAIGN_REELS,
  UPDATE_CAMPAIGN_REEL_LIKES,
} from "./actions";

const initialState = {
  list: {},
  categories: [],
  count: {},
};

const campaignReelReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAMPAIGN_REELS: {
      const { id, result } = action.payload;
      if (result) {
        return {
          ...state,
          list: {
            ...state.list,
            [id]: [...(state.list[id] || []), ...(result.rows || [])],
          },
          count: {
            ...state.count,
          },
        };
      }

      return {
        ...state,
        list: {},
        count: {},
        lastPage: 0,
      };
    }

    case SET_CAMPAIGN_CATEGORIES:
      return {
        ...state,
        categories: [...(action.payload || [])],
      };

    case UPDATE_CAMPAIGN_REEL_LIKES: {
      const { campaignId } = action.payload;
      console.log("payload", action.payload);
      const campaignList = state.list[campaignId] || [];
      campaignList.forEach((element) => {
        if (element.id === action.payload.id) {
          element.is_like = action.payload.is_like;
          element.total_likes = action.payload.total_likes;
        }
      });

      return {
        ...state,
        list: {
          ...state.list,
          [campaignId]: campaignList,
        },
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default campaignReelReducer;
