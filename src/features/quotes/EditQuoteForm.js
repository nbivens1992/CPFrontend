import { useState, useEffect } from "react"
import { useUpdateQuoteMutation, useDeleteQuoteMutation } from "./quotesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditQuoteForm = ({ quote, userInfo}) => {

    const [updateQuote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateQuoteMutation()

    const [deleteQuote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteQuoteMutation()

    const navigate = useNavigate()

    const [galReq, setGalReq] = useState(quote.galReq)
    const [dDate, setDDate] = useState(quote.dDate)


    const reqDate = new Date(quote.dDate).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })
    const [sPrice, setSPrice] = useState(quote.sPrice)
    let [amountDue, setAmountDue] = useState(quote.amountDue)
    const [userId, setUserId] = useState(quote.user)

    let address = userInfo.address1 + ", " + userInfo.city+ ", "+ userInfo.state+ " "+userInfo.zip


    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setGalReq('')
            setDDate('')
            setUserId('')
            setSPrice('')
            setAmountDue('')
            navigate('/dash/quotes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onGalReqChanged = e => setGalReq(e.target.value)
    const onDDateChanged = e => setDDate(e.target.value)
    const onSPriceChanged = e => setSPrice(e.target.value)
    const onAmountDueChanged = e => setAmountDue(e.target.value)
    

    const canSave = [galReq, dDate,sPrice, userId].every(Boolean) && !isLoading

    const onSaveQuoteClicked = async (e) => {
        if (canSave) {
            await updateQuote({ id: quote.id, user: userId, galReq, dDate, sPrice,amountDue})
        }
    }

    const onDeleteQuoteClicked = async () => {
        await deleteQuote({ id: quote.id })
    }


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validGalReqClass = !galReq ? "form__input--incomplete" : ''
    const validDDateClass = !dDate ? "form__input--incomplete" : ''
    const validSPriceClass = !sPrice ? "form__input--incomplete" : ''
    const validAmountDueClass = !amountDue ? "form__input--incomplete" : ''
    const validUserClass = !userId ? "form__input--incomplete" : ''
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
    


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__galReq-row">
                    <h2>Edit Quote</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            galReq="Save"
                            onClick={onSaveQuoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            galReq="Delete"
                            onClick={onDeleteQuoteClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="quote-galReq">
                    Gallons Requested:</label>
                <input
                    className={`form__input ${validGalReqClass}`}
                    id="quote-galReq"
                    name="galReq"
                    type="number"
                    autoComplete="off"
                    required
                    value={galReq}
                    onChange={onGalReqChanged}
                />

                <label className="form__label" htmlFor="quote-dDate">
                    Due Date:</label>
                <input
                    className={`form__input ${validDDateClass}`}
                    id="quote-dDate"
                    name="dDate"
                    type ="date"
                    autoComplete="off"
                    required
                    value={reqDate}
                    onChange={onDDateChanged}
                />
                <label className="form__label" htmlFor="quote-galReq">
                    Price Per Gallon:</label>
                <input
                    className={`form__input ${validSPriceClass}`}
                    id="quote-sPrice"
                    name="sPrice"
                    type="number"
                    autoComplete="off"
                    required
                    value={sPrice}
                    onChange={onSPriceChanged}
                />
                <label className="form__label" htmlFor="quote-galReq">
                    Total Quote Price:</label>
                <input
                    className={`form__input ${validAmountDueClass}`}
                    id="quote-amountDue"
                    name="amountDue"
                    type="number"
                    autoComplete="off"
                    readonly
                    value={amountDue=galReq*sPrice}
                    onChange={onAmountDueChanged}
                />
                <label className="form__label" htmlFor="galReq">
                    Delivery Address:</label>
                <input
                    className={`form__input ${validAmountDueClass}`}
                    id="amountDue"
                    name="amountDue"
                    type="test"
                    autoComplete="off"
                    value={address}
                    readonly
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__text-container" htmlFor="quote-username">
                            ASSIGNED TO:</label>
                            <input
                                className={`form__input ${validUserClass}`}
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="off"
                                value={quote.username}
                                readonly
                               // onChange={onUserIdChanged}
                            
                            />
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditQuoteForm