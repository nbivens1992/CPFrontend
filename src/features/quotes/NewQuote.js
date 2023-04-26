import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import { selectAllUserInfos } from '../userInfos/userInfosApiSlice'
import useAuth from "../../hooks/useAuth"

import NewQuoteForm from './NewQuoteForm'

const NewQuote = () => {

    const {username} =useAuth()
    const users = useSelector(selectAllUsers)
    const userInfos = useSelector(selectAllUserInfos)

    var user = users.find(user => {
      return user.username === username
    })

    
    var userInfo = userInfos.find(userInfo => {
        return userInfo.user === user._id
      })


    const content = users ? <NewQuoteForm user={user} userInfo={userInfo}/> : <p>Loading...</p>

    return content
}
export default NewQuote