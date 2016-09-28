// All of our mutation constants, in one tidy spot
//
// This allows us to easliy read all the possible mutations
// from the root of the store and any modules we define. It also
// acts as a repository of mutations that our store's actions
// can use to compose in differnt ways.
//
// For example, see the use of LOAD_MESSAGES in resetMessages in
// the messages module.
//
// One further step we could take is to use namespaces for our
// modules to allow future dev like:
//   messages/LOAD
//   another_module/LOAD
// http://vuex.vuejs.org/en/modules.html#namespacing

// Root state constants
export const SET_CLIENT_ID = 'SET_CLIENT_ID'

// Message module constants
export const NEW_MESSAGE = 'NEW_MESSAGE'
export const LOAD_MESSAGES = 'LOAD_MESSAGES'
