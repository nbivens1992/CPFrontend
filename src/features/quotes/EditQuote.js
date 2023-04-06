import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectQuoteById } from './quotesApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditQuoteForm from './EditQuoteForm'

const EditQuote = () => {
    const { id } = useParams()

    const quote = useSelector(state => selectQuoteById(state, id))
    const users = useSelector(selectAllUsers)

    const content = quote && users ? <EditQuoteForm quote={quote} users={users} /> : <p>Loading...</p>

    return content
}
export default EditQuote