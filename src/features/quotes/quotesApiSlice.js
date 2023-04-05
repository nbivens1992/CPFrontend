import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const quotesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = quotesAdapter.getInitialState()

export const quotesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getQuotes: builder.query({
            query: () => '/quotes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedQuotes = responseData.map(quote => {
                    quote.id = quote._id
                    return quote
                });
                return quotesAdapter.setAll(initialState, loadedQuotes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Quote', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Quote', id }))
                    ]
                } else return [{ type: 'Quote', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetQuotesQuery,
} = quotesApiSlice

// returns the query result object
export const selectQuotesResult = quotesApiSlice.endpoints.getQuotes.select()

// creates memoized selector
const selectQuotesData = createSelector(
    selectQuotesResult,
    quotesResult => quotesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllQuotes,
    selectById: selectQuoteById,
    selectIds: selectQuoteIds
    // Pass in a selector that returns the quotes slice of state
} = quotesAdapter.getSelectors(state => selectQuotesData(state) ?? initialState)