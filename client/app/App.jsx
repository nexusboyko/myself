import React, { useEffect} from "react";
// import QuotesView from "./components/QuotesView";
import { useSelector, useDispatch, connect } from 'react-redux';
import { updateAuthToken, fetchUserInfo } from './features/usersSlice';
import { useGoogleLogin } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const App = (props) => {
  const dispatch = useDispatch();
  const { name, profilePicture } = props.user || {};

  useEffect(() => {
    console.log('user info', props.user);
  }, [props.user]);

  const onLoginFailure = (res) => {
    console.error('Google Login Failure', res);
  };

  const onLoginSuccess = ({ code }) => {
    // get access token, verify, and fetch user info
    dispatch(fetchUserInfo(code));
  };

  const onFinish = () => {};

  const signIn = useGoogleLogin({
    clientId,
    onSuccess: onLoginSuccess,
    onError: onLoginFailure,
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
    isSignedIn: true,
    accessType: 'offline',
    // (authorization code flow)
    flow: 'auth-code',
  });

  return (
    <div className="font-inter flex flex-col gap-3 justify-center items-center">
      { !props.user.accessToken ? 
        <button className="btn" type="button" onClick={() => signIn()}>
          Google Sign In
        </button> :
        <button className="btn" type="button" onClick={() => console.log('signOut()')}>
          Sign Out
        </button>
      }

      {
        !props.user.accessToken ? 
        <div>Loading profile...</div> :
        <div>
          <div>
            <img src={profilePicture} alt={name} />
          </div>
          <small>{name}</small>
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(App);