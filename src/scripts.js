// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// imports 
import users  from './data/users';
import hydration from './data/hydration';
import './css/styles.css';
import './images/turing-logo.png';
import './images/femaleAvatar.jpg';
import './domUpdates';

import { 
  createRandomUser,
  retrieveUserData, 
  returnAverageSteps, 
  nameFriends,
  getAllTimeAverageFlOz,
  getDailyFlOz,
  createUserHydroData,
  weeklyHydroData,  
} from './functions';

import{
  updateUserDailyStepGoal,
  updateUserInfoPage,
  calcStepComparison,
  displayCohortStepAverage,
  updateUserName,
  toggleInfo,
  userInfoButton,
  updateIcon,
} from './domUpdates'

// const userHydrationData = hydration.hydrationData
//   .filter((datum) => datum.userID === currentUser.id);

const masterData = {
  users: users.users,
  hydration: hydration.hydrationData,
  currentUser: createRandomUser(users.users),
}

// event handlers
window.addEventListener('load', () => {
  const currentUserH2O = createUserHydroData(masterData.currentUser, masterData.hydration);
  updateIcon();
  console.log(currentUserH2O);
  weeklyHydroData(currentUserH2O,99);
  updateUserDailyStepGoal(masterData.currentUser);
  updateUserName(masterData.currentUser);
  displayCohortStepAverage(masterData.users);
  calcStepComparison(masterData.currentUser, masterData.users);
  updateUserInfoPage(masterData.currentUser, masterData.users);
});

userInfoButton.addEventListener('click', toggleInfo);