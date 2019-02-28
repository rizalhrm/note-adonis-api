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

  Route.get('notes', 'NoteController.index');
  Route.get('notes/lastid', 'NoteController.lastid');
  Route.get('note/:id', 'NoteController.show');
  Route.post('notes', 'NoteController.store');
  Route.patch('note/:id', 'NoteController.update');
  Route.delete('note/:id', 'NoteController.delete');
  
  Route.post("register", "AuthController.register").middleware('guest')
  Route.post("login", "AuthController.login").middleware('guest')
  Route.post("logout", "AuthController.logout").middleware("auth")
  Route.post("refresh_token", "AuthController.refreshToken")
  Route.post("profile", "AuthController.profile").middleware("auth")

  Route.get("user/:uid", "ProfileController.getProfile").middleware("auth")
  Route.post("user", "ProfileController.updateProfile").middleware("auth")

}).prefix('api/v1')