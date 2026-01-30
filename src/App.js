import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';
import MyProductsPage from './pages/MyProductsPage.js'
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import ProfilePage from './pages/ProfilePage';
import CheckOutProdPage from './pages/CheckOutProdPage';
import MyOrders from './pages/MyOrders';
import GenerateOTP from './pages/GenerateOTP';
import OrderDetailsPage from './pages/OrderDetalsPage';
import ProdPage from './pages/ProdPage.js';
import AdminPanel from './pages/Adminpanel';
import ResetPassword from './pages/ResetPassword';
import VendorPanel from './pages/VendorPanel';
import ProtectedRoute from './components/ProtectedRoute.js';
import { AuthProvider } from './components/AuthContext.js';
import AuthUsers from './pages/AuthUsers.js';
import AboutPage from './pages/AboutPage.js';
import AuthAv from './pages/AuthAV.js';
import CategoryPagePreview from './pages/CategoryPagePreview.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Protected Admin Routes */}
          <Route 
            path='/admin' 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Vendor Routes */}
          <Route 
            path='/products/myproducts' 
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <MyProductsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/vendor' 
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorPanel />
              </ProtectedRoute>
            } 
          />
          
          {/* Public Routes */}
          
          <Route path='/home' element={<HomePage />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<AuthUsers/>} />
          <Route path='/signup' element={<AuthUsers/>} />
          <Route path='/av/login' element={<AuthAv/>}/>
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/category' element={<CategoryPagePreview />} />
          <Route path='/category/selected' element={<CategoryPage />} />
          <Route path='/products/:id' element={<ProdPage/>}/>
          <Route path='/cart/all' element={<CartPage />} />
          <Route path='/order' element={<ProtectedRoute allowedRoles={['admin','user']}><CheckOutPage /></ProtectedRoute>} />
          <Route path='/order/:id' element={<ProtectedRoute allowedRoles={['admin','user']}><CheckOutProdPage /></ProtectedRoute>} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/order/myorders' element={<ProtectedRoute allowedRoles={['admin','user']}><MyOrders /></ProtectedRoute>} />
          <Route path='/generateotp' element={<GenerateOTP />} />
          <Route path='/order/placed/:id' element={<ProtectedRoute allowedRoles={['admin','user']}><OrderDetailsPage /></ProtectedRoute>} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/about' element={<AboutPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
