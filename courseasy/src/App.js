import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Users from './components/Admin/Users/Users';
import ForgetPassword from './components/Auth/ForgetPassword';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Courses from './components/Courses/Courses';
import Home from './components/Home/Home';
import Footer from './components/Layout/Footer/Footer';
import Header from './components/Layout/Header/Header';
import NotFound from './components/Layout/NotFound/NotFound';
import ChangePassword from './components/Profile/ChangePassword';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import Request from './components/Request/Request';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import Loader from './components/Layout/Loader/Loader';
import LecturesPage from './components/LecturesPage/LecturesPage';

function App() {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  const { isAuthenticated, user, message, error, loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forgetpassword"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ForgetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resetpassword/:token"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Contact />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Request />
                </ProtectedRoute>
              }
            />

            <Route
              path="/course/:id"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <LecturesPage user={user} />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />

            {/* admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/createcourse"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                >
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  adminRoute={true}
                  isAdmin={user && user.role === 'admin'}
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;
