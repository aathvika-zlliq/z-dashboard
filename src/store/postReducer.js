import { GET_POST, POST_LIKE, SET_REPORT_POST_LIST } from "./actions";

const initialState = {
  list: {}, // { [id]: { [type]: [...] } }
  currentPage: {}, // { [id]: { [type]: page } }
  lastPage: {}, // { [id]: { [type]: page } }
  isMoreData: {}, // { [id]: { [type]: boolean } }
  reportPostList: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST: {
      const { id, type, result } = action.payload;
      const isFirstPage = result.current_page === 1;
      const existingData = state.list?.[id]?.[type] || [];
      return {
        ...state,
        list: {
          ...state.list,
          [id]: {
            ...state.list[id],
            [type]: isFirstPage
              ? result.data || []
              : [...existingData, ...(result.data || [])],
          },
        },
        currentPage: {
          ...state.currentPage,
          [id]: {
            ...state.currentPage[id],
            [type]: result.current_page,
          },
        },
        lastPage: {
          ...state.lastPage,
          [id]: {
            ...state.lastPage[id],
            [type]: result.last_page,
          },
        },
        isMoreData: {
          ...state.isMoreData,
          [id]: {
            ...state.isMoreData[id],
            [type]: result.current_page < result.last_page,
          },
        },
      };
    }

    case POST_LIKE: {
      const { userId, postType, id, is_like, total_likes } = action.payload;
      const updatedList = (state.list?.[userId]?.[postType] || []).map(post => {
        if (post.id === id) {
          return {
            ...post,
            is_like: is_like,
            total_likes: total_likes,
          };
        }
        return post;
      });

      return {
        ...state,
        list: {
          ...state.list,
          [userId]: {
            ...state.list[userId],
            [postType]: updatedList,
          },
        },
      };
    }

    case SET_REPORT_POST_LIST: {
      return {
        ...state,
        reportPostList: action.payload,
      };
    }
    default:
      return state;
  }
};

export default postReducer;
