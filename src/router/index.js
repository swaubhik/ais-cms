import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '../stores/user'

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  userStore.loadingSession = true
  const user = await userStore.currentUser()
  if (user) {
    next()
  } else {
    next('/login')
  }
  userStore.loadingSession = false
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Login',
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        title: 'Register',
        requiresAuth: false
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue'),
      meta: {
        title: 'Forgot-password',
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true
      }
    },
    {
      path: '/chapter-preview/:id/',
      name: 'chapter-preview',
      component: () => import('../views/PreviewView.vue'),
      meta: {
        title: 'Preview',
        requiresAuth: true
      }
    },
    {
      path: '/add-chapter',
      name: 'add-chapter',
      component: () => import('../views/AddChapterView.vue'),
      meta: {
        title: 'Create Chapter',
        requiresAuth: true
      }
    },
    {
      path: '/chapter/:id',
      name: 'chapter',
      component: () => import('../views/ChapterView.vue'),
      meta: {
        title: 'Chapter',
        requiresAuth: true
      }
    },
    {
      path: '/chapter/:id/create-page/:pageNumber',
      name: 'chapter-page',
      component: () => import('../views/ChapterView.vue'),
      meta: {
        title: 'Chapter',
        requiresAuth: true
      }
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} | AIS CMS`
  const userStore = useUserStore()
  userStore.loadingSession = true
  const user = await userStore.currentUser()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
  userStore.loadingSession = false
})
