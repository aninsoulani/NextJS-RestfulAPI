//layout
// import Navbar from "../../components/navbar";
// import Footer from "../../components/footer";

//import Link
import Link from 'next/link';

//import axios
import axios from "axios";

//router
import { useRouter } from 'next/router';

//fetch with "getServerSideProps"
export async function getServerSideProps() {

    //http request
    const req  = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/books`)
    const res  = await req.data.data.data

    return {
      props: {
          books: res // <-- assign response
      },
    }
  }

function BookIndex(props) {

    //destruct
    const { books } = props;

     //router
    const router = useRouter();

    //refresh data
    const refreshData = () => {
        router.replace(router.asPath);
    }

    //function "deleteBook"
    const deleteBook = async (id) => {

        //sending
        await axios.delete(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/books/${id}`);

        //refresh data
        refreshData();

    }

    return(
        // <Layout>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body">
                                <Link href="/books/add">
                                    <button className="btn btn-primary border-0 shadow-sm mb-3">TAMBAH</button>
                                </Link>
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">ISBN</th>
                                            <th scope="col">TITLE</th>
                                            <th scope="col">SUBTITLE</th>
                                            <th scope="col">AUTHOR</th>
                                            <th scope="col">PUBLISHED</th>
                                            <th scope="col">PUBLISHER</th>
                                            <th scope="col">PAGES</th>
                                            <th scope="col">DESCRIPTION</th>
                                            <th scope="col">WEBSITE</th>
                                            <th scope="col">AKSI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { books.map((book) => (
                                        <tr key={ book.id }>
                                            <td>{ book.isbn }</td>
                                            <td>{ book.title }</td>
                                            <td>{ book.subtitle }</td>
                                            <td>{ book.author }</td>
                                            <td>{ book.published }</td>
                                            <td>{ book.publisher }</td>
                                            <td>{ book.pages }</td>
                                            <td>{ book.description }</td>
                                            <td>{ book.website }</td>
                                            <td className="text-center">
                                                <Link href={`/books/edit/${book.id}`}>
                                                    <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">EDIT</button>
                                                </Link>
                                                <button onClick={() => deleteBook(book.id)} className="btn btn-sm btn-danger border-0 shadow-sm mb-3">DELETE</button>
                                            </td>
                                        </tr>
                                    )) }
                                    </tbody>
                                </table>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        // </Layout>
    )
}

export default BookIndex