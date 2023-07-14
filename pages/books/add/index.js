//import hook useState
import { useState } from "react";

//import router
import Router from "next/router";

//import layout
// import Layout from '../../../components/layout';

//import axios
import axios from "axios";

function BookCreate() {
  //state
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pages, setPages] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  //state validation
  const [validation, setValidation] = useState({});

  //function "handleFileChange"
  // const handleFileChange = (e) => {

  //     //define variable for get value image data
  //     const imageData = e.target.files[0]

  //     //check validation file
  //     if (!imageData.type.match('image.*')) {

  //         //set state "image" to null
  //         setImage('');

  //         return
  //     }

  //     //assign file to state "image"
  //     setImage(imageData);
  // }

  //method "storeBook"
  const storeBook = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("isbn", isbn);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("author", author);
    formData.append("published", published);
    formData.append("publisher", publisher);
    formData.append("pages", pages);
    formData.append("description", description);
    formData.append("website", website);

    //send data to server
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/books`, formData)
      .then(() => {
        //redirect
        Router.push("/books");
      })
      .catch((error) => {
        //assign validation on state
        setValidation(error.response.data);
      });
  };

  return (
    // <Layout>
    <div className="container" style={{ marginTop: "80px" }}>
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <form onSubmit={storeBook}>
                <div className="form-group mb-3">
                  <label className="form-label fw-bold">ISBN</label>
                  <input
                    className="form-control"
                    type="number"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    placeholder="Masukkan ISBN"
                  />
                </div>
                {validation.isbn && (
                  <div className="alert alert-danger">{validation.isbn}</div>
                )}

                <div className="form-group mb-3">
                  <label className="form-label fw-bold">TITLE</label>
                  <input
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </div>
                {validation.title && (
                  <div className="alert alert-danger">{validation.title}</div>
                )}

                <div className="form-group mb-3">
                  <label className="form-label fw-bold">SUBTITLE</label>
                  <input
                    className="form-control"
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Masukkan Subtitle"
                  />
                </div>
                {validation.subtitle && (
                  <div className="alert alert-danger">
                    {validation.subtitle}
                  </div>
                )}

                <div className="form-group mb-3">
                  <label className="form-label fw-bold">AUTHOR</label>
                  <input
                    className="form-control"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Masukkan Author"
                  />
                </div>
                {validation.author && (
                  <div className="alert alert-danger">{validation.author}</div>
                )}

                <div className="form-group mb-3">
                  <label className="form-label fw-bold">PUBLISHED</label>
                  <input
                    className="form-control"
                    type="date"
                    value={published}
                    onChange={(e) => setPublished(e.target.value)}
                    placeholder="Masukkan Tanggal Publikasi"
                  />
                </div>
                {validation.published && (
                  <div className="alert alert-danger">
                    {validation.published}
                  </div>
                )}

                <div className="form-group mb-3">
                  <label className="form-label fw-bold">PUBLISHER</label>
                  <input
                    className="form-control"
                    type="text"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="Masukkan Penerbit"
                  />
                </div>
                {validation.publisher && (
                  <div className="alert alert-danger">
                    {validation.publisher}
                  </div>
                )}

                <div className="form-group mb-3">
                  <label className="form-label fw-bold">HALAMAN</label>
                  <input
                    className="form-control"
                    type="number"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    placeholder="Masukkan Halaman"
                  />
                </div>
                {validation.pages && (
                  <div className="alert alert-danger">{validation.pages}</div>
                )}

                <div className="form-group mb-3">
                  <label className="form-label fw-bold">DESCRIPTION</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Masukkan Deskripsi"
                  />
                </div>
                {validation.description && (
                  <div className="alert alert-danger">
                    {validation.description}
                  </div>
                )}

                <div className="form-group mb-3">
                  <label className="form-label fw-bold">WEBSITE</label>
                  <input
                    className="form-control"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Masukkan URL"
                  />
                </div>
                {validation.website && (
                  <div className="alert alert-danger">{validation.website}</div>
                )}

                <button
                  className="btn btn-primary border-0 shadow-sm"
                  type="submit"
                >
                  SIMPAN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </Layout>
  );
}

export default BookCreate;
