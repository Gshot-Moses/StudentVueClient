import { createRouter, createWebHistory } from 'vue-router'
import { useStateStore } from '../stores/state.js'
import SignIn from '../components/SignIn.vue'
import StudentListing from '../components/StudentListing.vue'
import CreateStudent from '../components/CreateStudent.vue'
import StudentDashboard from '../components/StudentDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn
    },

    {
      path: '/admin',
      name: 'admin',
      component: StudentListing
    },

    {
      path: '/new',
      name: 'new',
      component: CreateStudent
    },

    {
      path: '/student',
      name: 'student',
      component: StudentDashboard
    },
  ]
})

router.beforeEach((to, from, next) => {
  const store = useStateStore()
  console.log(store.currentUser)
  if (!store.currentUser && ['admin', 'new', 'student'].includes(to.name)) {
    return next({ name: 'home' });
  }

  if (store.currentUserRole === 'Student' && ['admin', 'new'].includes(to.name)) {
    return next({ name: 'student' });
  }

  return next();
});

export default router
