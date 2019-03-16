'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome at E-Notes API' }
})

Route.group(() => {
  Route.post("register", "AuthController.register").middleware('guest')
  Route.post("login", "AuthController.login").middleware('guest')
  Route.post("logout", "AuthController.logout").middleware("auth")
  Route.post("refresh_token", "AuthController.refreshToken")
  Route.post("profile", "AuthController.profile").middleware("auth")
  Route.get('auth/check', 'AuthController.accountCheck').middleware('auth')
}).prefix('api/v1')

Route.group(() => {
  Route.get("/:uid", "ProfileController.getProfile").middleware("auth")
  Route.post("/", "ProfileController.updateProfile").middleware("auth")
}).prefix("api/v1/user");

Route.group(() => {
  Route.get('/:id', 'NoteController.show');
  Route.patch('/:id', 'NoteController.update');
  Route.delete('/:id', 'NoteController.delete');
}).prefix("api/v1/note");

Route.group(() => {
  Route.get('/', 'NoteController.index');
  Route.get('/lastid', 'NoteController.lastid');
  Route.post('/', 'NoteController.store');
}).prefix("api/v1/notes");