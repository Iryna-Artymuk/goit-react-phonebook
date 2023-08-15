import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axios from 'axios';

const axios_instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});
export const setToken = token => {
  axios_instance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  axios_instance.defaults.headers['Authorization'] = '';
};
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios_instance.get('/contacts');
      console.log(' response.data: ', response.data);

      return response.data;
    } catch (error) {
      toast.error('This is an error!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    // console.log('newContact: ', newContact);
    // newContact сюди приходить дані з форми

    try {
      const response = await axios_instance.post('/contacts', newContact);
      response && toast.success('Successfully added ');
      return response.data;
    } catch (error) {
      toast.error('This is an error!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const changeContact = createAsyncThunk(
  'contacts/changeContact',
  async (newContactData, thunkAPI) => {
    const state = thunkAPI.getState();
    const id = state.contacts.activeContactId;

    try {
      const response = await axios_instance.patch(
        `/contacts/${id}`,
        newContactData
      );
      response && toast.success('Successfully changed');
      return response.data;
    } catch (error) {
      toast.error('This is an error!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    console.log('id: ', id);

    try {
      const response = await axios_instance.delete(`/contacts/${id}`);

      response && toast.success('Successfully removed ');
      return response.data;
    } catch (error) {
      toast.error('This is an error!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//---------------AUTH OPERATIONS------------
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    console.log('user: ', userData);

    try {
      const response = await axios_instance.post(`/users/signup`, userData);
      response && toast.success('register successfully  ');
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      toast.error('This is an error!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios_instance.post(`/users/login`, user);
      response && toast.success(' login successfully ');
      setToken(response.data.token);
      return response.data;
    } catch (error) {
      toast.error('This is an error!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      setToken(token);
      const response = await axios_instance.get(`/users/current`);
      // response && toast.success(' login successfully ');
      return response.data;
    } catch (error) {
      // toast.error('This is an error!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk(
  'auth/logOutUser',
  async (token, thunkAPI) => {
    try {
      const response = await axios_instance.post(`/users/logout`);
      response && toast.success(' logout successfully ');
      return response.data;
    } catch (error) {
      toast.error('This is an error!');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
