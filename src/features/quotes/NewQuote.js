import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import { selectAllUserInfos } from '../userInfos/userInfosApiSlice'

import NewQuoteForm from './NewQuoteForm'

const NewQuote = () => {
    const users = useSelector(selectAllUsers)
    const userInfos = useSelector(selectAllUserInfos)

    var userInfo = userInfos.find(userInfo => {
        return userInfo.user === '6429e5477dfd607d1e18273b'
      })


    const content = users ? <NewQuoteForm users={users} userInfo={userInfo}/> : <p>Loading...</p>

    return content
}
export default NewQuote