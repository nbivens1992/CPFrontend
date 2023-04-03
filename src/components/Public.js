import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Cougar Petroleum!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Houston Texas, Cougar Petroleum provides competitive fuel prices for your company.</p>
                <address className="public__addr">
                    Cougar Petroleum<br />
                    4455 University Dr<br />
                    Houston, TX 77204<br />
                    <a href="tel:+2813308004">(555) 555-5555</a>
                </address>
                <br />
                <p>Owner: Nick Bivens</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public