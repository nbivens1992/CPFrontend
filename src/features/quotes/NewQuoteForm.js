import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewQuoteMutation } from "./quotesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { selectAllQuotes } from './quotesApiSlice'
import { useSelector } from 'react-redux'


const NewQuoteForm = ({ users, userInfo }) => {

    const [addNewQuote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewQuoteMutation()

    const navigate = useNavigate()

    const [galReq, setGalReq] = useState('')
    const [dDate, setDDate] = useState('')
    let [sPrice, setSPrice] = useState('')
    let [amountDue, setAmountDue] = useState('')
    const [userId, setUserId] = useState('6429e5477dfd607d1e18273b')

    useEffect(() => {
        if (isSuccess) {
            setGalReq('')
            setDDate('')
            setSPrice('')
            setAmountDue('')
            setUserId('')
            navigate('/dash/quotes')
        }
    }, [isSuccess, navigate])

    let address = userInfo.address1 + ", " + userInfo.city+ ", "+ userInfo.state+ " "+userInfo.zip
    
        

    const onGalReqChanged = e => setGalReq(e.target.value)
    const onDDateChanged = e => setDDate(e.target.value)
    const onSPriceChanged = e => setSPrice(e.target.value)
    const onAmountDueChanged = e => setAmountDue(e.target.value)

    const canSave = [galReq, dDate, sPrice, userId].every(Boolean) && !isLoading

    const onSaveQuoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewQuote({ user: userId, galReq, dDate, sPrice, amountDue })
        }
    }


    const errClass = isError ? "errmsg" : "offscreen"
    const validGalReqClass = !galReq ? "form__input--incomplete" : ''
    const validDDateClass = !dDate ? "form__input--incomplete" : ''
    const validSPriceClass = !sPrice ? "form__input--incomplete" : ''
    
    let inState = .04
    if(userInfo.state === 'TX'){
        inState = .02;
    }

    let userQuotes = useSelector(selectAllQuotes)
    let usedBefore = 0
    if(userQuotes.includes(userInfo.username)){
        usedBefore = .01
    }

    let reqFactor = .03
    if(galReq >= 1000){
        reqFactor = .02
    }
    const startPrice = 1.5
    const coProfit = .1

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveQuoteClicked}>
                <div className="form__galReq-row">
                    <h2>New Quote</h2>
                </div>
                <label className="form__label" htmlFor="galReq">
                    Gallons Requested:</label>
                <input
                    className={`form__input ${validGalReqClass}`}
                    id="galReq"
                    name="galReq"
                    type="number"
                    autoComplete="off"
                    value={galReq}
                    required  maxlength="50"
                    onChange={onGalReqChanged}
                />

                <label className="form__label" htmlFor="dDate">
                    Due Date:</label>
                <input
                    className={`form__input form__input--dDate ${validDDateClass}`}
                    id="dDate"
                    name="dDate"
                    type = "date"
                    value={dDate}
                    required
                    onChange={onDDateChanged}
                />
                <label className="form__label" htmlFor="galReq">
                    Price Per Gallon:</label>
                <input
                    className={`form__input ${validSPriceClass}`}
                    id="sPrice"
                    name="sPrice"
                    type="number"
                    autoComplete="off"
                    value={sPrice = startPrice*(1+inState-usedBefore+reqFactor+coProfit)}
                    required 
                    onChange={onSPriceChanged}
                />
                <label className="form__label" htmlFor="galReq">
                    Total Quote Price:</label>
                <input
                    className={`form__input`}
                    id="amountDue"
                    name="amountDue"
                    type="number"
                    autoComplete="off"
                    value={amountDue=sPrice*galReq}
                    readonly
                    disabled="disabled"
                    onChange={onAmountDueChanged}
                />
                <label className="form__label" htmlFor="galReq">
                    Delivery Address:</label>
                <input
                    className={`form__input`}
                    id="address"
                    name="address"
                    type="test"
                    autoComplete="off"
                    value={address}
                    readonly
                    disabled="disabled"
                />
                <div className="form__action-buttons">
                        <button
                            className="form__submit-button"
                            galReq="Save"
                            disabled={!canSave}
                            text ="Submit"
                        >
                          Submit Quote 
                        </button>
                </div>

            </form>
        </>
    )

    return content
}

export default NewQuoteForm