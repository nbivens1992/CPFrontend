import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewQuoteMutation } from "./quotesApiSlice"
import { selectAllQuotes } from './quotesApiSlice'
import { useSelector } from 'react-redux'
import {Pricing} from "./pricingModule"


const NewQuoteForm = ({ user, userInfo }) => {

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
    const [userId, setUserId] = useState(user.id)
    let [getQuoteClicked, setGotQuote] = useState(false)
    

    let userQuotes = useSelector(selectAllQuotes)
    let usedBefore = userQuotes.find(({user}) => user ===userInfo.user)


    useEffect(() => {
        if (isSuccess) {
            setGalReq('')
            setDDate('')
            setSPrice('')
            setAmountDue('')
            setUserId('')
            setGotQuote(false)
            navigate('/dash/quotes')
        }
    }, [isSuccess, navigate])

   
    let [address] = useState(userInfo.address1 + ", " + userInfo.city+ ", "+ userInfo.state+ " "+userInfo.zip)
        

    const onGalReqChanged = e => setGalReq(e.target.value)
    const onDDateChanged = e => setDDate(e.target.value)
    const onSPriceChanged = e => setSPrice(e.target.value)
    const onAmountDueChanged = e => setAmountDue(e.target.value)

    const canSave = [galReq, dDate, userId].every(Boolean) && !isLoading

    

    const onSaveQuoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewQuote({ user: userId, galReq, address, dDate , sPrice, amountDue })
        }
    }


    const errClass = isError ? "errmsg" : "offscreen"
    const validGalReqClass = !galReq ? "form__input--incomplete" : ''
    const validDDateClass = !dDate ? "form__input--incomplete" : ''
    const validSPriceClass = !sPrice ? "form__input--incomplete" : ''
    
    
    
    
    const onGetQuoteClicked = async (e) => {
            e.preventDefault()
            var para1 = document.getElementById("sPrice");
            var para2 = document.getElementById("amountDue");
    
            para1.type = "number"
            para2.type ="number"

            const pModule = new Pricing(userInfo.state, usedBefore, galReq);
            sPrice = pModule.suggestedPrice()
            amountDue=sPrice*galReq    
            setGotQuote(true) 
            setSPrice(sPrice)
            setAmountDue(amountDue)
            
    }
    
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
                    required  
                    onChange={onGalReqChanged}
                />

                <label className="form__label" htmlFor="dDate">
                    Preferred Delivery Date:</label>
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
                    Delivery Address:</label>
                <input
                    className={`form__input`}
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="off"
                    value={address}
                    readonly
                    disabled="disabled"
                />
                <label className="form__label" htmlFor="galReq">
                    Price Per Gallon:</label>
                <input
                    className={`form__input ${validSPriceClass}`}
                    id="sPrice"
                    name="sPrice"
                    type="number"
                    autoComplete="off"
                    readonly
                    disabled="disabled"
                    value={parseFloat(sPrice).toFixed(3)}
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
                    value={parseFloat(amountDue).toFixed(2)}
                    readonly
                    disabled="disabled"
                    onChange={onAmountDueChanged}
                />
                <div className="form__action-buttons">
                        <button
                            className="form__submit-button"
                            id = "submit"
                            disabled={!getQuoteClicked || !canSave}
                            text ="Submit"
                        >
                          Submit Quote 
                        </button>
                        <button
                            className="form__submit-button"
                            disabled={!canSave}
                            text ="Get Quote"
                            onClick={onGetQuoteClicked}
                        >
                          Get Quote
                        </button>
                        
                </div>

            </form>
        </>
    )

    return content
}

export default NewQuoteForm