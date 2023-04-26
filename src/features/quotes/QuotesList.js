import { useGetQuotesQuery } from "./quotesApiSlice"
import Quote from "./quote"
import useAuth from "../../hooks/useAuth"

const QuotesList = () => {
    const {username} = useAuth()
    
    const {
        data: quotes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetQuotesQuery('QuotesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })


    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids,entities } = quotes
        let filteredIds
        filteredIds = ids.filter(quoteId => entities[quoteId].username === username)


        const tableContent = ids?.length && filteredIds.map(quoteId => <Quote key={quoteId} quoteId={quoteId} />)

        content = (
            <table className="table table--quotes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th quote__status">Gallons Requested</th>
                        <th scope="col" className="table__th quote__created">Date Requested</th>
                        <th scope="col" className="table__th quote__updated">Price/Gallon</th>
                        <th scope="col" className="table__th quote__title">Sugggested Price</th>
                        <th scope="col" className="table__th quote__title">Delivery Address</th>
                        <th scope="col" className="table__th quote__username">Owner</th>
                        <th scope="col" className="table__th quote__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default QuotesList