import { Form, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import fetchData from "../FetchData";


function EditCategories() {
    const location = useLocation()
    const navigate = useNavigate()
    const [category, setCategorie] = useState()

    useEffect(() => {
        const getCategorie = async () => {
            setCategorie(await fetchData("get", "/categories/" + location.state.id))
        }
        getCategorie()
    }, [])


    const handleSubmit = async (e) => {

        const form = e.target
        const formData = new FormData(form)

        const formJson = Object.fromEntries(formData.entries())

        const title = formJson.name
        const color = formJson.hex

        await fetchData("put", "/categories/" + location.state.id, { title, color })

        navigate("/app/categorias", { replace: true })
    }

    return (
        <div className="form-screen bg-blue">

            <div className="content">
                <button className="back-btn" onClick={() => navigate("/app/categorias", { replace: true })}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                    <span>Voltar</span>
                </button>
                <h1 style={{ marginTop: "5%" }}>Edição de Categoria</h1>
            </div>

            <Form className="form" onSubmit={handleSubmit}>
                <div>
                    <div className="form-group">
                        <label>Titulo
                            <input type="text" defaultValue={category?.title || ''} name="name" />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Cor
                            <input type="text" defaultValue={category?.color || ''} name="hex" />
                        </label>
                    </div>
                </div>

                <button className="form-btn" type="submit">Salvar</button>
            </Form>

        </div>
    )
}

export default EditCategories