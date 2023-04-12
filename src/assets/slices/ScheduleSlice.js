import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../js/firebase';
import { collection, getDocs, deleteDoc, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { query, orderBy } from 'firebase/firestore/lite';
import { cloneDeep } from 'lodash';
import dayjs from 'dayjs';

export const getSchedule = createAsyncThunk('ScheduleSlice/getSchedule', async (payload, { rejectWithValue }) => {
    const data = [];
    let snapshot = null;

    try {
        const ref = collection(db, "calendar");
        const q = query(ref, orderBy("yearMonth", "asc"), orderBy("date", "asc"));
        snapshot = await getDocs(q);
        snapshot.forEach(doc => {
            const temp = doc.data();
            temp.id = doc.id;
            data.push(temp);
        });
    } catch (err) {
        console.log(err);
        return rejectWithValue(err);
    }

    return data;
});

export const deleteSchedule = createAsyncThunk('ScheduleSlice/deleteSchedule', async (payload, { rejectWithValue }) => {
    try {
        await deleteDoc(doc(db, "calendar", payload));
    } catch (err) {
        return rejectWithValue(err);
    }

    return payload;
});

export const addSchedule = createAsyncThunk('ScheduleSlice/addSchedule', async (payload, { rejectWithValue }) => {
    let json = null;

    try {
        let docRef = await addDoc(collection(db, "calendar"), payload);
        const docId = docRef.id;
        docRef = doc(db, "calendar", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            json = docSnap.data();
            json.id = docId;
        } else {
            throw new Error('데이터 추가 실패');
        }
    } catch (err) {
        return rejectWithValue(err);
    }

    return json;
});

export const updateSchedule = createAsyncThunk('ScheduleSlice/updateSchedule', async (payload, { rejectWithValue }) => {
    let json = null;

    try {
        let docRef = doc(db, "calendar", payload.id);
        await updateDoc(docRef, payload.data);

        docRef = doc(db, "calendar", payload.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            json = docSnap.data();
            json.id = payload.id;
        } else {
            throw new Error('데이터 수정 실패');
        }
    } catch (err) {
        return rejectWithValue(err);
    }

    return json;
});

const ScheduleSlice = createSlice({
    name: 'ScheduleSlice',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        getCurrentData: (state, { payload }) => {
            return state;
        },
    },
    extraReducers: {
        [getSchedule.pending]: (state, { payload }) => {
            return { ...state, loading: true }
        },
        [getSchedule.fulfilled]: (state, { payload }) => {
            return {
                data: payload,
                loading: false,
                error: null
            }
        },
        [getSchedule.rejected]: (state, { payload }) => {
            const err = new Error();

            err.message = payload;
        
            return {
                ...state,
                loading: false,
                error: err
            }
        },

        [deleteSchedule.pending]: (state, { payload }) => {
            return { ...state, loading: true }
        },
        [deleteSchedule.fulfilled]: (state, { payload }) => {
            const temp = cloneDeep(state.data);
            const index = temp.findIndex(v => v.id == payload);
            temp.splice(index, 1);

            return {
                data: temp,
                loading: false,
                error: null
            }
        },
        [deleteSchedule.rejected]: (state, { payload }) => {
            const err = new Error();

            err.message = payload;
        
            return {
                ...state,
                loading: false,
                error: err
            }
        },

        [addSchedule.pending]: (state, { payload }) => {
            return { ...state, loading: true }
        },
        [addSchedule.fulfilled]: (state, { payload }) => {
            const temp = cloneDeep(state.data);
            const index = temp.findIndex(v => dayjs(`${payload.yearMonth}-${payload.date}`).isBefore(dayjs(`${v.yearMonth}-${v.date}`)));
            temp.splice(index, 0, payload);

            return {
                data: temp,
                loading: false,
                error: null
            }
        },
        [addSchedule.rejected]: (state, { payload }) => {
            const err = new Error();

            err.message = payload;
        
            return {
                ...state,
                loading: false,
                error: err
            }
        },

        [updateSchedule.pending]: (state, { payload }) => {
            return { ...state, loading: true }
        },
        [updateSchedule.fulfilled]: (state, { payload }) => {
            const temp = cloneDeep(state.data);
            let index = temp.findIndex(v => v.id == payload.id);
            temp.splice(index, 1);

            index = temp.findIndex(v => dayjs(`${payload.yearMonth}-${payload.date}`).isBefore(dayjs(`${v.yearMonth}-${v.date}`)));
            temp.splice(index, 0, payload);

            return {
                data: temp,
                loading: false,
                error: null
            }
        },
        [updateSchedule.rejected]: (state, { payload }) => {
            const err = new Error();

            err.message = payload;
        
            return {
                ...state,
                loading: false,
                error: err
            }
        },
    }
});

export const { getCurrentData } = ScheduleSlice.actions;

export default ScheduleSlice.reducer;