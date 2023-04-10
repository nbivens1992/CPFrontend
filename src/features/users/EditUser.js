import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { selectAllUserInfos } from '../userInfos/userInfosApiSlice'
import EditUserForm from './EditUserForm'

const EditUser = () => {
    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id))

    const userInfos = useSelector(selectAllUserInfos)

    var userInfo = userInfos.find(userInfo => {
        return userInfo.user === id
      })

    const content = user ? <EditUserForm user={user} userInfo={userInfo} /> : <p>Loading...</p>

    return content
}
export default EditUser