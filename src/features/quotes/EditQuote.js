import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectQuoteById } from './quotesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import { selectAllUserInfos } from '../userInfos/userInfosApiSlice'
import EditQuoteForm from './EditQuoteForm'

const EditQuote = () => {
    const { id } = useParams()
    const quote = useSelector(state => selectQuoteById(state, id))
    const users = useSelector(selectAllUsers)
    const userInfos = useSelector(selectAllUserInfos)

    var userInfo = userInfos.find(userInfo => {
        return userInfo.user === quote.user
      })

    const content = quote && users ? <EditQuoteForm quote={quote} userInfo={userInfo} /> : <p>Loading...</p>

    return content
}
export default EditQuote