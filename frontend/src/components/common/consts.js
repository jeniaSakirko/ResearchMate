// Auth
export const LOGIN_URL = '/api/auth/login';
export const USER_URL = '/api/auth/user';



// Participant
export const PARTICIPANT_REGISTER_URL = '/api/participant/register';
export const PARTICIPANT_GET_ALL_URL = '/api/participant';
export const PARTICIPANT_GET_ALL_FORMS_URL = (id) => `/api/participant/${id}/form?status=all`;

//Research
export const  RESEARCH_GET_ALL = '/api/research';
export const  RESEARCH_ASSIGH = '/assign';

