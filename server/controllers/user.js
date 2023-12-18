import { customAlphabet } from 'nanoid';
import UserInfo from '../models/UserInfo.js';
import UserGoogleProfile from '../models/UserGoogleProfile.js';

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);

export async function generateUserId() {
  return nanoid();
}


async function createUserGoogleProfile(userPayload) {
  const _id = await generateUserId();

  console.log('createUserGoogleProfile PAYLOAD', userPayload);

  const userGoogleProfile = {
    _id: userPayload.sub,
    customId: _id,
    googleId: userPayload.sub,
    ...(userPayload.name && { name: userPayload.name }),
    ...(userPayload.email && { email: userPayload.email }),
    ...(userPayload.picture && { profilePicture: userPayload.picture }),
    timeCreated: Date.now(),
    timeUpdated: Date.now()
  }

  const newUserGoogleProfile = new UserGoogleProfile(userGoogleProfile);

  try {
    const savedUserGoogleProfile = await newUserGoogleProfile.save();
    console.log('User Google profile saved', savedUserGoogleProfile);
  }
  catch(error) {
    throw new Error('Error saving user Google profile: ' + error);
  }

  return userGoogleProfile;
}

export async function loadUserGoogleProfile(googleId) {
  const googleProfile = await UserGoogleProfile.findById(googleId);
  
  if(googleProfile) {
    console.log('User Google profile loaded', googleProfile);
    return googleProfile;
  }

  return null;
}

export async function storeUserInfo(userInfo) {
  // store user info in DB
  const newUserInfo = new UserInfo(userInfo);
  
  try {
    const savedUserInfo = await newUserInfo.save();
    console.log('User info stored', savedUserInfo);
  }
  catch(error) {
    throw new Error('Error saving user info: ' + error);
  }

  return;
}

export async function loadUserInfo(id) {
  const userInfo = await UserInfo.findById(id);

  if(userInfo) {
    console.log('User info loaded', userInfo);
    return userInfo;
  }

  return null;
}

async function createUserInfoGoogle(userGoogleProfile) {
  const userInfo = {
    _id: userGoogleProfile.customId,
    googleId: userGoogleProfile.googleId,
    name: userGoogleProfile.name,
    email: userGoogleProfile.email,
    profilePicture: userGoogleProfile.profilePicture,
    timeCreated: userGoogleProfile.timeCreated,
    timeUpdated: userGoogleProfile.timeUpdated
  };
  const newUserInfo = new UserInfo(userInfo);

  try {
    const savedUserInfo = await newUserInfo.save();
    console.log('User info saved', savedUserInfo);
  }
  catch(error) {
    throw new Error('Error saving user info: ' + error);
  }

  return userGoogleProfile;
}

/** 
 * loads user info from Google user payload;
 * creates user info/user Google profile in DB if doesn't exist
 */
export async function loadUserInfoGoogle(userPayload) {
  // load user Google profile from DB (using Google ID)
  let userGoogleProfile = await loadUserGoogleProfile(userPayload.sub);

  if(!userGoogleProfile) {
    try {
      userGoogleProfile = await createUserGoogleProfile(userPayload);
    }
    catch(error) {
      throw new Error('Failed to create user Google profile: ' + error);
      // FIXME: check if exists; if so, load it
    }
  }

  if(!userGoogleProfile) {
    throw new Error(`Failed to load user Google profile: user ${userGoogleProfile.sub}!`);
  }
  
  // load user info from DB (using NanoID)
  let userInfo = await loadUserInfo(userGoogleProfile.customId);

  if(!userInfo) {
    try {
      userInfo = await createUserInfoGoogle(userGoogleProfile);
    }
    catch(error) {
      throw new Error('Failed to create user info!');
      // FIXME: check if exists; if so, load it
    }
  }

  if(!userInfo) {
    throw new Error(`Failed to load user info: user ${userGoogleProfile.sub}!`);
  }

  return userInfo;
}
