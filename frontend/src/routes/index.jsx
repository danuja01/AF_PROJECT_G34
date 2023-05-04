import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks'
import Home from '../pages/home'
import NotFound from '../pages/404'
import Tours from '../pages/tours'
import Tour from '../pages/tour'
import EditReview from '../pages/edit-review'
import ProductsList from '../pages/ItemsPage/products-list'
import Restaurant from '../pages/ItemsPage/products'
import AddReview from '../pages/ItemsPage/add-review'
import Login from '../pages/ItemsPage/login'

const AnimatedRoutes = () => {
  // useAuth()

  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tour/:id" element={<Tour />} />
        <Route path="/review/:id" element={<EditReview />} />
        <Route path="/restaurants" element={<ProductsList />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
        <Route path="/restaurants/:id/review" element={<AddReview />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
