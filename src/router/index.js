import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminHome from '../pages/AdminHome.vue'
import Home from '../pages/Home.vue'
import AdminUsers from '../pages/AdminUsers.vue'
import AdminParticipant from '../pages/AdminParticipants.vue'
import Vote from '../pages/Vote.vue'
import Register from '../pages/Register.vue'
import VoteResult from '../pages/VoteResult.vue'
import VoteResult2 from '../pages/VoteResult2.vue'
import AdminSession from '../pages/AdminSession.vue'
import redirects from '../pages/redirect.vue'
import LoginPage from '../pages/AdminLogin.vue'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: '/onlinevotingsystem/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: redirects
    },
    {
      path: '/admin',
      name: 'admin home',
      component:AdminHome,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/user',
      name: 'admin user',
      component:AdminUsers,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/session',
      name: 'admin session',
      component:AdminSession,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/participants',
      name: 'admin participant',
      component:AdminParticipant,
      meta: { requiresAuth: true }
    },
    {
      path: '/vote',
      name: 'vote',
      component:Vote
    },
    {
      path: '/results',
      name: 'vote result',
      component:VoteResult
    },
    {
      path: '/admin/results',
      name: 'admin vote result',
      component:VoteResult2,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'register',
      component:Register
    },
    {
      path: '/login', 
      component: LoginPage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log(to.path)
  console.log(window.location.href)
  
  try {
    const response = await axios.get('http://128.199.118.198/fyp/config/session.php');
    var sessions = response.data
    const now = new Date()

    // Convert string-based start time to Date object
    const startTimeStr = sessions[0].start_vote // Example start time: 9:00 AM
    const [startHour, startMinute, startSecond] = startTimeStr.split(':')
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond)

    // Convert string-based end time to Date object
    const endTimeStr = sessions[0].end_vote // Example end time: 5:00 PM
    const [endHour, endMinute, endSecond] = endTimeStr.split(':')
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, endSecond)

    console.log(now)
    console.log(startTime)
    console.log(endTime)
    console.log(startTime < now)
    console.log(endTime > now)

    // Check if the current time is between the defined start and end time
    if (to.path !== '/redirect' && !to.path.startsWith('/admin') && !to.path.startsWith('/login')) {
      if (now > startTime && now <= endTime) {
        // Proceed with navigation unless the route starts with '/admin'
        if (!to.path.startsWith('/admin')) {
          next()
        } else {
          // If the route starts with '/admin', allow navigation without redirection
          if (to.meta.requiresAuth && !localStorage.getItem('isLoggedIn')) {
            next('/login');
          } else {
            next();
          }
        }
      }
      else{
        next('/redirect')
      }
    } else {
      if (to.path.startsWith('/admin')){
        if (to.meta.requiresAuth && !localStorage.getItem('isLoggedIn')) {
          next('/login');
        } else {
          next();
        }
      }
      else{
        next()
      }
    }
    // if (now > startTime && now <= endTime) {
    //   // Proceed with navigation unless the route starts with '/admin'
    //   if (!to.path.startsWith('/admin')) {
    //     next()
    //   } else {
    //     // If the route starts with '/admin', allow navigation without redirection
    //     if (to.meta.requiresAuth && !localStorage.getItem('isLoggedIn')) {
    //       next('/login');
    //     } else {
    //       next();
    //     }
    //   }
    // } else {
    //   // Redirect to the redirect page if the current time is outside the defined range and the route is not '/redirect'
    //   if (to.path !== '/redirect' && !to.path.startsWith('/admin')) {
    //     next('/redirect')
    //   } else {
    //     if (to.path.startsWith('/admin')){
    //       if (to.meta.requiresAuth && !localStorage.getItem('isLoggedIn')) {
    //         next('/login');
    //       } else {
    //         next();
    //       }
    //     }
    //     else{
    //       next()
    //     }
    //   }
    // }

  } catch (error) {
    console.error('Error fetching parcipants:', error);
  }

});

export default router
