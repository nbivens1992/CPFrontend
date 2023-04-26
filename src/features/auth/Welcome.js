import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'


const Welcome = () => {
    const { id } = useParams()

    const {username} = useAuth()
    

    const navigate = useNavigate()
    const handleEdit = () => navigate(`/dash/editUser/${id}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    //Edit User Profil needs to change
    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/quotes">View Quote History</Link></p>

            <p><Link to="/dash/quotes/new">Request a Quote</Link></p>

            <p><Link to={handleEdit()}>Edit User Profile</Link></p>


        </section>
    )

    return content
}
export default Welcome