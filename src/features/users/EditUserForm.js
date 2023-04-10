import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useUpdateUserInfoMutation, useDeleteUserInfoMutation } from "../userInfos/userInfosApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user, userInfo }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const [updateUserInfo, {
        userInfoIsLoading,
        userInfoIsSuccess,
        userInfoIsError,
        userInfoError
    }] = useUpdateUserInfoMutation()

    const [deleteUserInfo, {
        isSuccess:  userInfoIsDelSuccess,
        isError:  userInfoIsDelError,
        error:  userInfoDelerror
    }] = useDeleteUserInfoMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [myUser, setUser] = useState(user.id)
    const [fullName, setFullName] = useState(userInfo.fullName)
    const [address1, setAddress1] = useState(userInfo.address1)
    const [address2, setAddress2] = useState(userInfo.address2)
    const [city, setCity] = useState(userInfo.city)
    const [state, setState] = useState(userInfo.state)
    const [zip, setZip] = useState(userInfo.zip)

    

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    useEffect(() => {
        console.log(userInfoIsSuccess)
        if (userInfoIsSuccess || userInfoIsDelSuccess) {
            setFullName('')
            setAddress1('')
            setAddress2('')
            setCity('')
            setState('')
            setZip('')
            navigate('/dash')
        }
    }, [userInfoIsSuccess,userInfoIsDelSuccess, navigate])

    

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onFullNameChanged = e => setFullName(e.target.value)
    const onAddress1Changed = e => setAddress1(e.target.value)
    const onAddress2Changed = e => setAddress2(e.target.value)
    const onCityChanged = e => setCity(e.target.value)
    const onStateChanged = e => setState(e.target.value)
    const onZipChanged = e => setZip(e.target.value)


    const onSaveUserClicked = async (e) => {
        if (address2) {
           // await updateUser({ id: user.id, username, password})
            await updateUserInfo({ id: userInfo.id, user: myUser, fullName, address1, address2, city, state, zip })
            navigate('/dash')
        } else {
            //await updateUser({ id: user.id, username})
            await updateUserInfo({ id: userInfo.id, user: myUser , fullName, address1, address2, city, state, zip })
            navigate('/dash')
        }
    }

    const onDeleteUserClicked = async () => {
        //await deleteUser({ id: user.id })
        await deleteUserInfo({id: userInfo.id})
    }

   

    let canSave
    if (password) {
        canSave = [validUsername, validPassword].every(Boolean) && !isLoading && !userInfoIsLoading
    } else {
        canSave = [validUsername].every(Boolean) && !isLoading && !userInfoIsLoading
    }

    const errClass = (isError || isDelError || userInfoIsError || userInfoIsDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    

    const errContent = (error?.data?.message || delerror?.data?.message || userInfoDelerror?.data?.message || userInfoError?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />
                <label className="form__label" htmlFor="fullName">
                    Full Name: </label>
                <input
                    className={`form__input `}
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={fullName}
                    onChange={onFullNameChanged}
                />
                <label className="form__label" htmlFor="address">
                    Address 1:</label>
                <input
                    className={`form__input`}
                    id="address"
                    name="address"
                    type="text"
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
                    value={zip}
                    onChange={onZipChanged}
                />

            </form>
        </>
    )

    return content
}
export default EditUserForm