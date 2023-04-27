import { useState, useEffect} from "react"
import { useAddNewUserInfoMutation } from "../userInfos/userInfosApiSlice"

import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import useAuth from "../../hooks/useAuth"
import { selectAllUsers } from "./usersApiSlice"


const NewUserInfoForm = () => {
    const users = useSelector(selectAllUsers)
    const {username} = useAuth()


    var user = users.find(user => user.username === username)
    
    const [addNewUserInfo, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserInfoMutation()

    const navigate = useNavigate()

   

    //need to change line below
    
    const [fullName, setFullName] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setFullName('')
            setAddress1('')
            setAddress2('')
            setCity('')
            setState('')
            setZip('')
            navigate('/login')
        }
    }, [isSuccess, navigate])


    const onFullNameChanged = e => setFullName(e.target.value)
    const onAddress1Changed = e => setAddress1(e.target.value)
    const onAddress2Changed = e => setAddress2(e.target.value)
    const onCityChanged = e => setCity(e.target.value)
    const onStateChanged = e => setState(e.target.value)
    const onZipChanged = e => setZip(e.target.value)

    const canSave =  [fullName,address1,city,state,zip].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUserInfo({user,fullName, address1,address2, city, state, zip})
        }
    }


    const errClass = isError ? "errmsg" : "offscreen"


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveUserClicked }>
                <div className="form__title-row">
                    <h2>Create User Profile</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="fullName">
                    Full Name: </label>
                <input
                    className={`form__input `}
                    id="fullName"
                    name="fullName"
                    type="text"
                    maxLength= "50"
                    value={fullName}
                    required
                    onChange={onFullNameChanged}
                />
                <label className="form__label" htmlFor="address">
                    Address 1:</label>
                <input
                    className={`form__input`}
                    id="address"
                    name="address"
                    type="text"
                    maxLength= "100"
                    required
                    value={address1}
                    onChange={onAddress1Changed}
                />
                <label className="form__label" htmlFor="address2">
                    Address 2:</label>
                <input
                    className={`form__input`}
                    id="address2"
                    name="address2"
                    type="text"
                    maxLength= "100"
                    value={address2}
                    onChange={onAddress2Changed}
                />
                <label className="form__label" htmlFor="city">
                    City:</label>
                <input
                    className={`form__input`}
                    id="city"
                    name="city"
                    type="text"
                    maxLength= "100"
                    required
                    value={city}
                    onChange={onCityChanged}
                />
                <label className="form__label" htmlFor="city">
                    State:</label>
                <select
                    className={`form__input`}
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={state}
                    onChange={onStateChanged}
                >
                    <option value="---">---</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                </select>
                <label className="form__label" htmlFor="Zip">
                    Zip:</label>
                <input
                    className={`form__input`}
                    id="Zip"
                    name="Zip"
                    type="text"
                    minLength="5"
                    maxLength="9"
                    required
                    value={zip}
                    onChange={onZipChanged}
                />
            </form>
        </>
    )

    return content
}
export default NewUserInfoForm