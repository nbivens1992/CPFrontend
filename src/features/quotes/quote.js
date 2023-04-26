import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectQuoteById } from './quotesApiSlice'
import { selectAllUserInfos } from '../userInfos/userInfosApiSlice'

const Quote = ({ quoteId }) => {
    const quote = useSelector(state => selectQuoteById(state, quoteId))
    const userInfos = useSelector(selectAllUserInfos)

    var userInfo = userInfos.find(userInfo => {
        return userInfo.user === quote.user
      })



    let address = userInfo.address1 + ", " + userInfo.city+ ", "+ userInfo.state+ " "+userInfo.zip

    const navigate = useNavigate()

    if (quote) {
        const options = {
            timeZone: "UTC",
            day: "numeric",
            month: "long",
            year: "numeric", 
          };
        
    
        const reqDate = new Date(quote.dDate).toLocaleString('en-US', options)
        

        const handleEdit = () => navigate(`/dash/quotes/${quoteId}`)

        return (
            <tr className="table__row">
                <td className="table__cell quote__created">{quote.galReq}</td>
                <td className="table__cell quote__updated">{reqDate}</td>
                <td className="table__cell quote__title">{quote.sPrice}</td>
                <td className="table__cell quote__username">{quote.amountDue}</td>
                <td className="table__cell quote__username">{address}</td>
                <td className="table__cell quote__username">{quote.username}</td>
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