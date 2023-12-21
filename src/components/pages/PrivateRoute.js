import {Navigate} from 'react-router-dom'
import {useAuth} from './AuthContext'

export default function PrivateRoute({children}) {
  const {currentUser} = useAuth()

  if(!currentUser?.emailVerified){
    return <Navigate to='/login' replace/>
  }

  return children
}