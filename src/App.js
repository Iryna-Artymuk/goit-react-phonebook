import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';

import { GlobalStyles } from './GlobalStyles';

import { fetchContacts, refreshUser } from './redux/operations';

import { light } from './components/Theme/Theme';
import Layout from './components/Layout/Layout';
import { ContactsList } from './components/ContactsList/ContactsList';

import AddContactForm from './components/Forms/AddContact';
import Modal from './components/Modal/Modal';
import { Filter } from './components/Filter/Filter';
import ChangeContactForm from './components/Forms/ChangeContact ';
import { ChangeThemeButton } from './components/Theme/TheamButton';
import Header from './components/Header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { FavouriteContactsList } from 'components/ContactsList/FavouriteContactsList';
import {
  getError,
  getIsAuthorizated,
  getIsLoading,
  getToken,
} from 'redux/selectors';
import Loader from 'components/Loader';
import ErrorPage from 'components/ErrorPage/ErrorPage';
import Home from 'Pages/Home';
import LoginPage from 'Pages/LoginPage';
import RegisterPage from 'Pages/RegisterPage';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

// import { useMemo } from 'react';
function App() {
  const [selectedTheme, setSelectedTheme] = useState(light);

  const [showModal, setShowModal] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showChangeForm, setShowChangeForm] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const token = useSelector(getToken);
  const error = useSelector(getError);
  const IsAuthorizated = useSelector(getIsAuthorizated);

  const handleThemeChange = theme => setSelectedTheme(theme);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const activateAddForm = () => {
    setShowAddForm(true);
  };
  const deActivateAddForm = () => {
    setShowAddForm(false);
  };
  const activateChangeForm = () => {
    setShowChangeForm(true);
  };
  const deActivateChangeForm = () => {
    setShowChangeForm(false);
  };

  useEffect(() => {
    if (!token || IsAuthorizated) return;

    dispatch(refreshUser());
    dispatch(fetchContacts());
  }, [token, dispatch, IsAuthorizated]);

  useEffect(() => {
    if (!token) return;

    dispatch(fetchContacts());
  }, [token, dispatch]);

  return (
    <Layout>
      <ThemeProvider theme={selectedTheme || light}>
        <GlobalStyles />
        <Toaster />
        <Header>
          <ChangeThemeButton handleThemeChange={handleThemeChange} />
        </Header>

        <main>
          {isLoading && <Loader />}
          {showFilter && <Filter />}
          {error ? (
            <ErrorPage />
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route
                  path="/Contacts"
                  element={
                    <PrivateRoute>
                      <ContactsList
                        toggleFilter={toggleFilter}
                        activateAddForm={activateAddForm}
                        toggleModal={toggleModal}
                        activateChangeForm={activateChangeForm}
                      />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/favouriteContacts"
                  element={
                    <PrivateRoute>
                      <FavouriteContactsList
                        toggleFilter={toggleFilter}
                        activateAddForm={activateAddForm}
                        toggleModal={toggleModal}
                        activateChangeForm={activateChangeForm}
                      />
                    </PrivateRoute>
                  }
                />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </>
          )}

          {showModal && (
            <Modal
              toggleModal={toggleModal}
              deActivateAddForm={deActivateAddForm}
              deActivateChangeForm={deActivateChangeForm}
            >
              {showAddForm && (
                <AddContactForm
                  deActivateAddForm={deActivateAddForm}
                  toggleModal={toggleModal}
                />
              )}
              {showChangeForm && (
                <ChangeContactForm
                  toggleModal={toggleModal}
                  deActivateChangeForm={deActivateChangeForm}
                />
              )}
            </Modal>
          )}
        </main>
      </ThemeProvider>
    </Layout>
  );
}

export default App;
