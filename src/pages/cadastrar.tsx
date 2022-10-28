import Router from 'next/router';
import { useFormik } from "formik"
import * as Yup from "yup"
import { api } from "../services/apiClient"

function SignUp() {

    const formik = useFormik({
        initialValues: {
            username: '',
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Digite seu username!"),
            name: Yup.string().required("Digite seu nome!"),
            email: Yup.string().email("Email inválido").required("Digite seu email!"),
            password: Yup.string().min(8, "Minimo 8 caractere").required("Digite sua senha")
        }) ,
        onSubmit: async (values) => {
            const data = {
                username: values.username,
                name: values.name,
                email: values.email,
                password: values.password
            }
            try {
                api.post("users", data)
                    .then(response => {
                        if (response.status === 201) {
                            alert("Sucesso")
                            Router.push("/")
                        }
                    })
                    .catch((err) => {
                        if (err.response.data.message === "User Aldready exists") {
                            return alert("Usuario já cadastrado!")
                        }
                        return alert("Erro interno do servidor")
                    })
            } catch (error) {
                console.warn(error)
            }
        }
    })

    return (
        <div className="h-screen flex items-center">
            <form onSubmit={formik.handleSubmit} className="bg-gradient-to-r from-[#34265C]/60 via-[#754672]/60  to-[#34265C]/60 w-72 h-82 mx-auto p-10 flex flex-col gap-3 rounded">
                <div className="flex flex-col gap-1">
                    <label htmlFor="username">Usuário</label>
                    <input className="bg-transparent border-[3px] border-black focus:outline-[#1BA8DB]" id="username" type="text" onChange={formik.handleChange} value={formik.values.username} />
                    {formik.touched.username && formik.errors.username ? <span className='text-red-600'>{formik.errors.username}</span> : null}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Senha</label>
                    <input className="bg-transparent border-[3px] border-black focus:outline-[#1BA8DB]" id="password" type="password" onChange={formik.handleChange} value={formik.values.password} />
                    {formik.touched.password && formik.errors.password ? <span className='text-red-600'>{formik.errors.password}</span> : null}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input className="bg-transparent border-[3px] border-black focus:outline-[#1BA8DB]" id="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
                    {formik.touched.email && formik.errors.email ? <span className='text-red-600'>{formik.errors.email}</span> : null}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Nome</label>
                    <input className="bg-transparent border-[3px] border-black focus:outline-[#1BA8DB]" id="name" type="name" onChange={formik.handleChange} value={formik.values.name} />
                    {formik.touched.name && formik.errors.name ? <span className='text-red-600'>{formik.errors.name}</span> : null}
                </div>

                <div className="flex justify-center mt-2">
                    <button type='submit' className="bg-[#1BA8DB] hover:bg-blue-400 px-2 py-1 rounded">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUp