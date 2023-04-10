import { store } from '../../app/store'
import { quotesApiSlice } from '../quotes/quotesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { userInfosApiSlice } from '../userInfos/userInfosApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const quotes = store.dispatch(quotesApiSlice.endpoints.getQuotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const userInfos = store.dispatch(userInfosApiSlice.endpoints.getUserInfos.initiate())
        return () => {
            console.log('unsubscribing')
            quotes.unsubscribe()
            users.unsubscribe()
            userInfos.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch