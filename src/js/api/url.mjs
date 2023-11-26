/**
 * Base URL for the API.
 * @type {string}
 */
export const API_BASE_URL = 'https://api.noroff.dev';

/**
 * API version endpoint.
 * @type {string}
 */
export const API_VERSION = '/api/v1';

/**
 * Endpoint for user registration.
 * @type {string}
 */
export const REGISTER_ENDPOINT = '/auction/auth/register';

/**
 * Endpoint for user login.
 * @type {string}
 */
export const LOGIN_ENDPOINT = '/auction/auth/login';

/**
 * This endpoint returns all listings in an array.
 * @type {string}
 */
export const LISTINGS_ENDPOINT = '/auction/listings';

/**
 * This endpoint returns a list of all registered profiles.
 * @type {string}
 */
export const PROFILES_ENDPOINT = '/auction/profiles';

/**
 * Common query parameters to be used with API requests.
 * These parameters are used to fetch additional related data like seller and bids.
 * @type {string}
 */
export const QUERY_PARAMETERS = '?_seller=true&bids=true';

/**
 * Common filter parameters to be used with API requests.
 * These parameters are used to fetch additional related data like tag and active.
 * @type {string}
 */
export const FILTER_PARAMETERS = '?_tag=my_tag&_active=true';
