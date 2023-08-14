import { createSlice } from '@reduxjs/toolkit';
import { contactsInitialState } from './initialState';
// import { nanoid } from 'nanoid';
import {
  fetchContacts,
  addContact,
  deleteContact,
  changeContact,
} from './operations';
import { isAnyOf } from '@reduxjs/toolkit/dist';
const handelPending = state => {
  state.isLoading = true;
};
const handelRejected = (state, action) => {
  // console.log('action.payload: ', action.payload);
  state.isLoading = false;
  state.error = action.payload;
};
const handelFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.favouriteContacts = [];
};
const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState: contactsInitialState,

  // Об'єкт редюсерів
  reducers: {
    setActiveContactId(state, action) {
      state.activeContactId = action.payload;
    },

    sortAtoZ(state, action) {
      console.log('state: ', state.contacts);

      state.contacts.sort(function (contact1, contact2) {
        return contact1.name.localeCompare(contact2.name);
      });
    },
    sortZtoA(state, action) {
      state.contacts.sort(function (contact1, contact2) {
        return contact2.name.localeCompare(contact1.name);
      });
    },
    addToFavourite(state, action) {
      state.favouriteContacts.push(action.payload);
    },
    removeFromFavourite(state, action) {
      const index = state.favouriteContacts.findIndex(contact => {
        return contact.id === state.activeContactId;
      });
      state.favouriteContacts.splice(index, 1);
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload; // тут буде дата з бекенду
      // state.contacts.isLoading= false
    });
    // ----- addContact -----
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.contacts.unshift(action.payload); //  action.payload тут буде дата з бекенду обєкт нового  контакту
      console.log('action.payload: ', action.payload);
    });

    builder.addCase(changeContact.fulfilled, (state, action) => {
      const contactToChange = state.contacts.find(
        contact => contact.id === state.activeContactId
      );
      // console.log('contactToChange: ', contactToChange);
      // console.log('action.payload: ', action.payload);
      contactToChange.name = action.payload.name;
      contactToChange.phone_number = action.payload.number;
      //  action.payload тут буде дата з бекенду обєкт нового  контакту
    });

    builder
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== state.activeContactId
        );
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          changeContact.pending,
          addContact.pending,
          deleteContact.pending
        ),
        handelPending
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          changeContact.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        handelRejected
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          changeContact.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled
        ),
        handelFulfilled
      );
  },
});

// Генератори екшенів
export const {
  sortAtoZ,
  sortZtoA,
  setActiveContactId,
  addToFavourite,
  removeFromFavourite,
} = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;
