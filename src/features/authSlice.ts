import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3001";

interface User {
    id: number;
    email: string;
    role: 'admin' | 'user';
}

export const loginUser = createAsyncThunk<User, { email: string; password: string }>(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                '/auth/login',
                { email, password },
                { withCredentials: true }
            );
            return res.data.user as User;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    if (state.auth.isLoading) return; // 👈 prevents repeated calls
    try {
        const res = await axios.get('/auth/me');
        return res.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Unauthorized');
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
    try {
        await axios.post('/auth/logout');
        return true;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Logout failed');
    }
});

interface AuthState {
    user: any | null;
    isLoading: boolean;
    error: string | null
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {

        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

        // GET ME
        builder
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload as string;
            });

        // LOGOUT
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;