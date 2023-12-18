import React from "react";
import { connect } from 'react-redux';
import Header from "./components/Header";
import DashboardView from "./components/DashboardView";
import logo from '../public/images/logo.svg';

const App = (props) => {
  return (
    <div className="w-[60%] m-auto">
      <Header />
      {props.user.accessToken ? (
        <DashboardView />
      ) : (
        <div className="h-[60vh] flex flex-col gap-y-5 justify-center items-center">
          <img src={logo} className="h-20 mb-6" alt="logo" />
          <h1 className="font-bold text-5xl">Hi, myself.</h1>
          <h2 className="text-xl">Sign in with Google to get started!</h2>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(App);