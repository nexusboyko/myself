import React from 'react';
import { connect } from 'react-redux';
import QuotesView from './QuotesView';
import MeditateView from './MeditateView';
import StretchView from './StretchView';

const DashboardView = (props) => {
  return (
    <div className='w-[65%] m-auto h-[75vh] flex flex-col justify-center'>
      <h1 className='text-3xl font-bold mb-10 text-center'>Welcome back, {props.user.name.split(' ')[0]}.</h1>
      <div id='dashboard' className='flex flex-col gap-y-10'>
        <MeditateView />
        <StretchView />
        <QuotesView />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(DashboardView);
