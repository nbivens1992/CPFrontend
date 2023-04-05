import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectQuoteById } from './quotesApiSlice'

const Quote = ({ quoteId }) => {

    const quote = useSelector(state => selectQuoteById(state, quoteId))

    const navigate = useNavigate()

    if (quote) {
    
        const reqDate = new Date(quote.dDate).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/quotes/${quoteId}`)

        return (
            <tr className="table__row">
                <td className="table__cell quote__status">
                    {quote.completed
                        ? <span className="quote__status--completed">Completed</span>
                        : <span className="quote__status--open">Open</span>
                    }
                </td>
                <td className="table__cell quote__created">{quote.galReq}</td>
                <td className="table__cell quote__updated">{reqDate}</td>
                <td className="table__cell quote__title">{quote.sPrice}</td>
                <td className="table__cell quote__username">{quote.amountDue}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Quote