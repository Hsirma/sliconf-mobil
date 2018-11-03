const baseApi = 'https://api.sliconf.com/service/';
const betaApi = 'http://beta.api.sliconf.com/service/';

//event
export const getEvent = `${betaApi}events/get/with-key/`;

//auth
export const postLogin = betaApi + 'users/login';
export const postLoginDevice = postLogin + '/anonymous/';
export const postRegister = betaApi + 'users/register';
export const postRegisterDevice = postRegister + '/anonymous/';
export const postForgot = betaApi + 'users/password-reset/send/';

//comment
export const postComment = betaApi + 'events/comment/add-new';
export const getComments = betaApi + 'events/comment/list/';
export const postVote = betaApi + 'events/comment/vote/';

//vote
export const voteTalk = betaApi + 'events/agenda/vote/';
export const getVoteByUser = betaApi + 'events/agenda/get-vote/';

//Schedule
export const postSchedule = `${betaApi}schedule/add`;
export const deleteSchedule = `${betaApi}schedule/remove`;
export const getSchedule = `${betaApi}schedule/list/`;

//Survey
//Gets all surveys of a specific event
export const getSurveys = `${betaApi}events`;
//Get answered surveys
export const getAnsweredSurveys = `${betaApi}events`;
//Post answers to specific survey
export const postAnswers = `${betaApi}events`;
//Increase user view count
export const increaseView = `${betaApi}events`;
