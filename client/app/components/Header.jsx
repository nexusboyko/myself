import React, { useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import { fetchUserInfo, signOut } from '../redux/features/usersSlice';
import { useGoogleLogin } from '@react-oauth/google';
import logo from '../../public/images/logo.svg';
import google from '../../public/images/google.svg'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Header = (props) => {
  const dispatch = useDispatch();
  const { name, profilePicture } = props.user || {};

  const onLoginFailure = (res) => {
    console.error('Google Login Failure', res);
  };

  const onLoginSuccess = ({ code }) => {
    // get access token, verify, and fetch user info
    dispatch(fetchUserInfo(code));
  };

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
    <>
      <div className="navbar bg-base-100 flex justify-around mt-4">
        
        <div className="flex items-center">
          <a className="btn btn-ghost text-2xl">
            <div className="w-16">
              <img src={logo} alt="" />
            </div>
            myself
          </a>
        </div>

        <div className="flex gap-x-2">
          { !props.user.accessToken ? 
            (<button className="btn btn-ghost border border-myself text-myself" type="button" onClick={() => signIn()}>
              <img src={google} className="w-6" alt="google" /> Sign In
            </button>) :
            (<button className="btn btn-ghost border border-myself text-myself" type="button" onClick={() => dispatch(signOut())}>
              Sign Out
            </button>)
          }

          {
            props.user.accessToken && 
            (<div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-16 rounded-full">
                  <img
                    alt={name}
                    title={name}
                    src={profilePicture}
                  />
              </div>
            </div>)
          }
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Header);
