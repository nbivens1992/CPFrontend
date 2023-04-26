import { useSelector } from 'react-redux'
import { selectAllUserInfos } from '../userInfos/userInfosApiSlice'
import EditUserForm from './EditUserForm'
import useAuth from '../../hooks/useAuth'
import { selectAllUsers } from './usersApiSlice'

const EditUser = () => {
  const users = useSelector(selectAllUsers)
  const {username} = useAuth()


  var user = users.find(user => user.username === username)
    

    const userInfos = useSelector(selectAllUserInfos)

    var userInfo = userInfos.find(userInfo => {
        return userInfo.user === user.id
      })



    const content = user ? <EditUserForm user={user} userInfo={userInfo} /> : <p>Loading...</p>

    return content
}
export default EditUser