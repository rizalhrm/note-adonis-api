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

  Route.get('notes', 'NoteController.index')
  Route.get('note/:id', 'NoteController.show')
  Route.post('notes', 'NoteController.store')
  Route.patch('note/:id', 'NoteController.update')
  Route.delete('note/:id', 'NoteController.delete')

  Route.get('categories', 'CategoryController.index')
  Route.get('category/:id', 'CategoryController.show')
  Route.post('categories', 'CategoryController.store')
  Route.patch('category/:id', 'CategoryController.update')
  Route.delete('category/:id', 'CategoryController.delete')

  Route.post("auth/register", "AuthController.register").middleware(['guest'])
  Route.post("auth/login", "AuthController.login").middleware(['guest'])
  Route.post("auth/logout", "AuthController.logout").middleware("auth");
  Route.post("auth/refresh_token", "AuthController.refreshToken");

  Route.get('profile/:id', 'UserController.show').middleware(['auth'])
  Route.patch('profile/:id', 'UserController.editProfile').middleware(['auth'])

}).prefix('api/v1')