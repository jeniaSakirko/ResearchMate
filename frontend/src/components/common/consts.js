export const BASE_API = '/api'

// Auth
export const LOGIN_URL = '/api/auth/login';
export const USER_URL = '/api/auth/user';
export const LOGOUT_URL = '/api/auth/logout';


// Participant
export const BASE_PARTICIPANT_API = BASE_API + '/participant'
export const PARTICIPANT_REGISTER_URL = BASE_PARTICIPANT_API + '/register';
export const PARTICIPANT_GET_ALL_URL = BASE_PARTICIPANT_API;
export const PARTICIPANT_GET_ALL_FORMS_URL = BASE_PARTICIPANT_API + '/forms';
export const PARTICIPANT_PUT_AGREE_ON_FORM_URL = PARTICIPANT_GET_ALL_FORMS_URL + '/agree';

//Research
export const  RESEARCH_GET_ALL = '/api/research';
export const  RESEARCH_ASSIGH = '/assign';
export const  RESEARCH_UNASSIGH = '/unassign';

