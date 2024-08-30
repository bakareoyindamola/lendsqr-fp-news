import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthAxios, SomethingWentWrongErrorText } from '../../utils/axios';
import { logout } from '../auth/authSlice.ts';
import { Meta, NewsItem, NewsResponse, Params } from './news.types.ts';

export interface NewsState {
  trendingData: NewsItem[];
  trendingMeta: Meta | null;
  trendingIsLoading: boolean;
  exploreData: NewsItem[];
  exploreMeta: Meta | null;
  exploreIsLoading: boolean;
  currentlyReading: NewsItem | null;
}

const initialState: NewsState = {
  trendingData: [],
  trendingMeta: null,
  trendingIsLoading: false,
  exploreData: [],
  exploreMeta: null,
  exploreIsLoading: false,
  currentlyReading: null,
};

export const getNewsAsync = createAsyncThunk<NewsResponse, Params>(
  'news/getNewsAsync',
  async ({ page, pageSize }: Params, { rejectWithValue }) => {
    try {
      let query = `news-catchers?pagination[page]=${page}`;

      if (pageSize) {
        query += `&pagination[pageSize]=${pageSize}`;
      }

      const res = await AuthAxios.get(query);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || SomethingWentWrongErrorText,
      );
    }
  },
);

export const getExploreNewsAsync = createAsyncThunk<NewsResponse, Params>(
  'news/getExploreNewsAsync',
  async ({ page, pageSize, sort, filter }: Params, { rejectWithValue }) => {
    try {
      let query = `news-catchers?pagination[page]=${page}`;

      if (pageSize) {
        query += `&pagination[pageSize]=${pageSize}`;
      }

      if (sort) {
        query += `&sort=${sort}`;
      }

      if (filter) {
        filter.forEach(f => {
          if (Array.isArray(f.value)) {
            query += f.value
              .map(v => `&filters[${f.field}][${f.operator}]=${v}`)
              .join('');
          } else {
            query += `&filters[${f.field}][${f.operator}]=${f.value}`;
          }
        });
      }

      const res = await AuthAxios.get(query);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || SomethingWentWrongErrorText,
      );
    }
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCurrentlyReading: (state, action: PayloadAction<NewsItem>) => {
      state.currentlyReading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getNewsAsync.pending, state => {
        state.trendingIsLoading = true;
      })
      .addCase(
        getNewsAsync.fulfilled,
        (state, action: PayloadAction<NewsResponse>) => {
          state.trendingIsLoading = false;
          state.trendingData = action.payload.data;
          state.trendingMeta = action.payload.meta;
        },
      )
      .addCase(getNewsAsync.rejected, state => {
        state.trendingIsLoading = false;
      })
      .addCase(getExploreNewsAsync.pending, state => {
        state.exploreIsLoading = true;
      })
      .addCase(
        getExploreNewsAsync.fulfilled,
        (state, action: PayloadAction<NewsResponse>) => {
          state.exploreIsLoading = false;
          state.exploreData = action.payload.data;
          state.exploreMeta = action.payload.meta;
        },
      )
      .addCase(getExploreNewsAsync.rejected, state => {
        state.exploreIsLoading = false;
      })
      .addCase(logout, () => {
        return initialState;
      });
  },
});

export const { setCurrentlyReading } = newsSlice.actions;

export default newsSlice.reducer;
