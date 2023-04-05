import { useGetQuotesQuery } from "./quotesApiSlice"
import Quote from "./quote"

const QuotesList = () => {
    const {
        data: quotes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetQuotesQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = quotes

        const tableContent = ids?.length
            ? ids.map(quoteId => <Quote key={quoteId} quoteId={quoteId} />)
            : null

        content = (
            <table className="table table--quotes">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th quote__status">Gallons Requested</th>
                        <th scope="col" className="table__th quote__created">Date Requested</th>
                        <th scope="col" className="table__th quote__updated">Price/Gallon</th>
                        <th scope="col" className="table__th quote__title">Sugggested Price</th>
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