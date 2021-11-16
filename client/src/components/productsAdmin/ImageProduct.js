import React, { useState } from 'react'
import axios from 'axios'
import { Image } from 'cloudinary-react'
import "./products.css"
import { urlPost } from '../../store/actions/products'
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'

const ImageProduct = () => {
    const [imgSelected, setImgSelected] = useState()
    const [photoData, setPhotoData] = useState()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const uploadImage = async (e) => {
        e.preventDefault()
        setLoading(true)
        console.log(imgSelected)
        const formData = new FormData()
        formData.append("file", imgSelected)
        formData.append("upload_preset", "ntogjqc6")
        await axios.post("https://api.cloudinary.com/v1_1/dyejl1qrj/image/upload", formData).then((response) => {
            setPhotoData(response.data.url)
            console.log(response.data.url);
            setLoading(false)
            dispatch(urlPost(response.data.url))
            console.log(response)

            //             var txt;

            //             var r = window.confirm("Foto Cargada con EXITO quieres continuar cargando la actividad? ");

            // if (r == true) {
            //   txt = "You pressed OK!";
            // } else {
            //   txt = "You pressed Cancel!";
            // }
        }).catch((error) => {
            console.log(error)
        })
    }
    const formulario = async (e) => {

    }



    return (
        <div className="imageup">

            <form action="/pedidos" method="post" encType="multipart/form-data">
                <h2>Comienza cargando una imagen </h2>
                <br />

                {/* <input name="image" placeholder="Upload a photo" className="container" type="file" /> */}
                <input type="file" name="foto" onChange={(event) => { setImgSelected(event.target.files[0]) }} />
                <br />
                <div> {loading && <i> Cargando... </i>}</div>
                <br />

                <button disabled={loading} type="submit" value="Create" onClick={uploadImage} >  Upload  </button>
                <br />
                <Image cloudName='dyejl1qrj' publicId={photoData} />
                <div> {photoData && <Link to="/admin/addproduct" ><button> Continuar </button> </Link>}</div>
            </form>
        </div >
    )
}

export default ImageProduct