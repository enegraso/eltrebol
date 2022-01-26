import React, { useState } from "react";
import axios from "axios";
import { Image, Transformation } from "cloudinary-react";
import "./products.css";
import { urlPost } from "../../store/actions/products";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ImageProduct = () => {
  const [imgSelected, setImgSelected] = useState();
  const [photoData, setPhotoData] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const uploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(imgSelected);
    const formData = new FormData();
    formData.append("file", imgSelected);
    formData.append("upload_preset", "ntogjqc6");
    await axios
      .post("https://api.cloudinary.com/v1_1/dyejl1qrj/image/upload", formData)
      .then((response) => {
        setPhotoData(response.data.url);
        console.log(response.data.url);
        setLoading(false);
        dispatch(urlPost(response.data.url));
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sinImagen = async (e) => {
    setLoading(false);
    await dispatch(urlPost(""));
  };

  if (!localStorage.getItem("userInfo"))
    return (
      <>
        <Link to="/loginadmin">
          <h5>Debe estar logueado</h5>
        </Link>
      </>
    );

  return (
    <div className="imageup">
      <form action="/pedidos" method="post" encType="multipart/form-data">
        <div class="mb-3">
          <h4>Paso 1</h4>
          Imagen del producto
        </div>
        <div class="mb-3">
          <label class="form-label">
            Elegir archivo de imagen para producto
          </label>
          {/* <input name="image" placeholder="Upload a photo" className="container" type="file" /> */}
          <input
            class="form-control btn btn-outline-success"
            type="file"
            name="foto"
            onChange={(event) => {
              setImgSelected(event.target.files[0]);
            }}
          />
        </div>
        <div class="mb-3"> {loading && <i> Cargando... </i>}</div>
        <div class="mb-3">
          Luego de elegir archivo, presione
          <button
            class="btn btn-outline-success"
            disabled={loading}
            type="submit"
            value="Create"
            onClick={uploadImage}
          >
            {" "}
            Cargar Imagen{" "}
          </button>
          {photoData && (
            <Link to="/admin/addproduct">
              <button class="btn btn-success"> Continuar alta </button>
            </Link>
          )}
          {" "}
          o seguir{" "}
          <Link to="/admin/addproduct">
            <button className="btn btn-secondary" onClick={sinImagen}>
              {" "}
              sin magen{" "}
            </button>
          </Link>{" "}
          <Link to="/admin/products">
            <button className="btn btn-link" /* onClick={() => window.history.go(-1)} */>
              {" "}
              Volver{" "}
            </button>
          </Link>{" "}
        </div>
        <div class="mb-3">
          <Image cloudName="dyejl1qrj" publicId={photoData}></Image>
        </div>
        <div class="mb-3">
          {/*           {" "}
          {photoData && (
            <Link to="/admin/addproduct">
              <button class="btn btn-success"> Continuar alta </button>
            </Link>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default ImageProduct;
