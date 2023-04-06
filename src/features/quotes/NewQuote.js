import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersApiSlice'
import NewQuoteForm from './NewQuoteForm'

const NewQuote = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <NewQuoteForm users={users} /> : <p>Loading...</p>

    return content
}
export default NewQuote