'use strict'

const User = use('App/Models/User')
const Profile = use('App/Models/Profile')

class AuthController {
	async login({ request, auth, response }) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      let access_token = await auth.withRefreshToken().attempt(email, password);
      return response.status(200).json({
        access_token: access_token
      });
    } catch (err) {
      return response.status(403).json({
        message: err.message,
        status: "You need to register firts!"
      });
    }
  }

	async register({ auth, request, response }) {
		const { email, username, password } =  request.post()
		try {
			let user = new User()
			let profile = new Profile()
			
			user.email = email
			user.username = username
			user.password = password
			
			await user.save()
			profile.user_id = user.id

			await profile.save()
			let accessToken = await auth.withRefreshToken().generate(user);
			return {
				user,
				access_token: accessToken
			}
		} catch(e) {
			switch(e.code) {
				case 'ER_DUP_ENTRY':
					return response.status(500).send({
						status: 'failed',
						message: 'Username or Email already taken!'
					})
				break
				default:
					return response.status(400).send({
						status: 'failed',
						message: e.code
					})
				break
			}

		}
    }
    
	async refreshToken({ request, auth }) {
			const refreshToken = request.input("refresh_token");
			return await auth.newRefreshToken().generateForRefreshToken(refreshToken);
	}

	async logout({ auth, response }) {
    const apiToken = auth.getAuthHeader();
    await auth.revokeTokens([apiToken], true);
    return response.status(200).json({
      msg: "Logout Success!"
    });
  }

	async show({ auth, params, response }) {
		try {
			const user = await auth.getUser()
			const profile = await user.profiles().fetch()
			if(auth.user.id !== Number(params.id)) {
				return 'you cant access other user'
			}
			return {
				status: 'success',
				data: { ...user.toJSON(), profile }
			}
		} catch(e) {
			return {
				status: 'failed',
				message: 'Missing or invalid jwt token!'
			}
		}
	}

	async editProfile({ auth, params, request }) {
		const { name, birth_date, gender } = request.post()
		try {
			const user = await auth.getUser()
			const profile = await user.profiles().fetch()
			if(auth.user.id !== Number(params.id)) {
				return 'you cant access other user'
			}

			profile.name = name
			profile.birth_date = birth_date
			profile.gender = gender
			
			await profile.save()

			return {
				status: 'success',
				data: { ...profile.toJSON() }
			}
		} catch(e) {
			return {
				status: 'failed',
				message: e.message
			}
		}
	}

}

module.exports = AuthController
