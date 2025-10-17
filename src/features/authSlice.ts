import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string; password: string }, thunkAPI) => {
        try {
            const res = await axios.post('http://localhost:3001/auth/login',

                { email, password },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            console.log('Login success', res.data)
        } catch (err: any) {
            console.error('Login failed:', err.response?.data || err.message);
        }
    }
);

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
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;