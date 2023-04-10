import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/quotes">View Quote History</Link></p>

            <p><Link to="/dash/quotes/new">Request a Quote</Link></p>

            <p><Link to="/dash/users">Edit User Profile</Link></p>


        </section>
    )

    return content
}
export default Welcome