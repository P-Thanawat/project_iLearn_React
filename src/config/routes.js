
export default {
  'admin': {
    route: [],
    redirect: ''
  },
  'teacher': {
    route: [],
    redirect: '',
  },

  'learner': {
    route: [
      {
        path: '/',
        component: Home
      }
    ],
    redirect: '/'
  },

  'guest': {
    route: [
      {
        path: '/login',
        component: Login
      },
      {
        path: '/register',
        component: Register
      }
    ],
    redirect: '/login'
  },
}