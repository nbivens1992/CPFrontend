import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const userInfosAdapter = createEntityAdapter({})

const initialState = userInfosAdapter.getInitialState()

export const userInfosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserInfos: builder.query({
            query: () => '/userinfos',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUserInfos = responseData.map(userInfo => {
                    userInfo.id = userInfo._id
                    return userInfo
                });
                return userInfosAdapter.setAll(initialState, loadedUserInfos)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'UserInfo', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'UserInfo', id }))
                    ]
                } else return [{ type: 'UserInfo', id: 'LIST' }]
            }
        }),
        addNewUserInfo: builder.mutation({
            query: initialUserInfo => ({
                url: '/userInfos',
                method: 'POST',
                body: {
                    ...initialUserInfo,
                }
            }),
            invalidatesTags: [
                { type: 'UserInfo', id: "LIST" }
            ]
        }),
        updateUserInfo: builder.mutation({
            query: initialUserInfo => ({
                url: '/userInfos',
                method: 'PATCH',
                body: {
                    ...initialUserInfo,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'UserInfo', id: arg.id }
            ]
        }),
        deleteUserInfo: builder.mutation({
            query: ({ id }) => ({
                url: `/userInfos`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'UserInfo', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetUserInfosQuery,
    useAddNewUserInfoMutation,
    useUpdateUserInfoMutation,
    useDeleteUserInfoMutation
} = userInfosApiSlice

// returns the query result object
export const selectUserInfosResult = userInfosApiSlice.endpoints.getUserInfos.select()

// creates memoized selector
const selectUserInfosData = createSelector(
    selectUserInfosResult,
    userInfosResult => userInfosResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUserInfos,
    selectById: selectUserInfoById,
    selectIds: selectUserInfoIds
    // Pass in a selector that returns the userInfos slice of state
} = userInfosAdapter.getSelectors(state => selectUserInfosData(state) ?? initialState)