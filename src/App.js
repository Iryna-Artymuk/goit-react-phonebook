import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';

import { GlobalStyles } from './GlobalStyles';

import { fetchContacts, refreshUser } from './redux/operations';

import { light } from './components/Theme/Theme';
import Layout from './components/Layout/Layout';
import AddContactForm from './components/Forms/AddContact';
import Modal from './components/Modal/Modal';
import ChangeContactForm from './components/Forms/ChangeContact ';
import { ChangeThemeButton } from './components/Theme/TheamButton';
import Header from './components/Header/Header';
import { getIsAuthorizated, getToken } from 'redux/selectors';
import Home from 'Pages/Home';
import LoginPage from 'Pages/LoginPage';
import RegisterPage from 'Pages/RegisterPage';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import ContactsPage from 'Pages/ContactsPage';
import FavouriteContactsPage from 'Pages/FavouriteContactsPage';
import { Route, Routes } from 'react-router';

// import { useMemo } from 'react';
function App() {
  const [selectedTheme, setSelectedTheme] = useState(light);

  const [showModal, setShowModal] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showChangeForm, setShowChangeForm] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector(getToken);

  const isAuthorizated = useSelector(getIsAuthorizated);

  const handleThemeChange = theme => setSelectedTheme(theme);

  const toggleModal = () => {
    setShowModal(!showModal);
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
    if (!token || isAuthorizated) return;

    dispatch(refreshUser());
  }, [token, dispatch, isAuthorizated]);

  useEffect(() => {
    if (!isAuthorizated) return;
    dispatch(fetchContacts());
  }, [dispatch, isAuthorizated]);

  return (
    <Layout>
      <ThemeProvider theme={selectedTheme || light}>
        <GlobalStyles />
        <Toaster />
        <Header>
          <ChangeThemeButton handleThemeChange={handleThemeChange} />
        </Header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Contacts"
              element={
                <PrivateRoute redirectTo="/login">
                  <ContactsPage
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
                  <FavouriteContactsPage
                    redirectTo="/"
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
