import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import QuotesList from './features/quotes/QuotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserInfoForm from './features/users/NewUserInfoForm'

import NewUserForm from './features/users/NewUserForm'

import EditQuote from './features/quotes/EditQuote'
import NewQuote from './features/quotes/NewQuote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="new" element={<NewUserForm />} />

        <Route element={<PersistLogin />}>
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>

            <Route index element={<Welcome />} />

            <Route path="users">
              
              <Route path=":id" index element={<EditUser />} />
              
            </Route>

            <Route path="quotes">
              <Route index element={<QuotesList />} />
              <Route path=":id" element={<EditQuote />} />
              <Route path="new" element={<NewQuote />} />
            </Route>

          </Route>{/* End Dash */}
        </Route>
      </Route>

      </Route>
    </Routes>
  );
}

export default App;
