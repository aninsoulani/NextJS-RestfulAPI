//layout
import Layout from "../../components/layout";

//import hook react
import { useState, useEffect } from "react";

//import Head
import Head from "next/head";

//import Link
import Link from "next/link";

//router
import Router, { useRouter } from "next/router";

//import axios
import axios from "axios";

//import js cookie
import Cookies from "js-cookie";

//fetch with "getServerSideProps"
export async function getServerSideProps() {
  //http request
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BACKEND}/api/books`
  );
  const res = await req.data.data.data;

  return {
    props: {
      books: res, // <-- assign response
    },
  };
}

function BookIndex(props) {
  //destruct
  const { books } = props;

  //get token
  const token = Cookies.get("token");

  //state user
  const [user, setUser] = useState({});

  //router
  const router = useRouter();

  //function "fetchData"
  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch user from Rest API
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/user`)
      .then((response) => {
        //set response user to state
        setUser(response.data);
      });
  };

  //hook useEffect
  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      Router.push("/login");
    }

    //call function "fetchData"
    fetchData();
  }, []);

  //fungsi logout
  const logoutHanlder = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //fetch Rest API
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`)
      .then(() => {
        //remove token from cookies
        Cookies.remove("token");

        //redirect halaman login
        Router.push("/");
      });
  };

  //refresh data
  const refreshData = () => {
    router.replace(router.asPath);
  };

  //function "deleteBook"
  const deleteBook = async (id) => {
    //sending
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/api/books/${id}`
    );

    //refresh data
    refreshData();
  };

  return (
    <Layout>
      <Head>
        <title>List Buku</title>
      </Head>
      <div className="container" style={{ marginTop: "80px" }}>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <h1>SELAMAT DATANG{" "}
                <strong className="text-uppercase">{user.name}</strong>
                </h1>
                <hr />
                <Link href="/books/add">
                  <button className="btn btn-primary border-0 shadow-sm mb-3">
                    TAMBAH
                  </button>
                </Link>
                <button
                  onClick={logoutHanlder}
                  className="btn btn-primary border-0 shadow-sm mb-3 float-end btn-danger"
                >
                  LOGOUT
                </button>
                <div className="table-responsive-xxl">
                <table className="table table-striped table-hover">
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
                    {books.map((book) => (
                      <tr key={book.id}>
                        <td>{book.isbn}</td>
                        <td>{book.title}</td>
                        <td>{book.subtitle}</td>
                        <td>{book.author}</td>
                        <td>{book.published}</td>
                        <td>{book.publisher}</td>
                        <td>{book.pages}</td>
                        <td>{book.description}</td>
                        <td>{book.website}</td>
                        <td className="text-center">
                          <Link href={`/books/edit/${book.id}`}>
                            <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">
                              EDIT
                            </button>
                          </Link>
                          <button
                            onClick={() => deleteBook(book.id)}
                            className="btn btn-sm btn-danger border-0 shadow-sm mb-3"
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BookIndex;
