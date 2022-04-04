import {IoAtCircleOutline, IoLockClosedOutline, IoLockOpenOutline, IoPerson} from "react-icons/io5";
import useApi from "../../hook/useApi";
import {AuthForm, AuthFormContainer, AuthFormFieldInterface, AuthFormHeader, passwordTextSwitch} from "./components";
import {SIGNUP_PAGE_TEXT} from "../../content";

export default function Signup({state, setState}) {

    const InputFields: Array<AuthFormFieldInterface> = [
        {
            field: {
                icon: <IoAtCircleOutline/>,
                inputProps: {
                    type: "text",
                    name: "email",
                    onChange: setState,
                    value: state.email
                },
                label: "Email",
                validator: () => {
                    if (state.email === "test1234@gmail.com") {
                        return "Invalid email address"
                    }
                    return false
                },
            }
        },
        {
            field: null,
            rowClass: "sm:grid-cols-2",
            row: [
                {
                    icon: <IoPerson/>,
                    inputProps: {
                        type: "text",
                        name: "first_name",
                        onChange: setState,
                        value: state.first_name
                    },
                    label: "First Name",
                },
                {
                    icon: <IoPerson/>,
                    inputProps: {
                        type: "text",
                        name: "last_name",
                        onChange: setState,
                        value: state.last_name
                    },
                    label: "Last Name",
                }
            ],
        },
        {
            field: {
                icon: <IoLockOpenOutline/>,
                inputProps: {
                    type: "password",
                    name: "password",
                    onChange: setState,
                    value: state.password
                },
                label: "Password",
                iconOnClick: passwordTextSwitch
            }
        },
        {
            field: {
                icon: <IoLockClosedOutline/>,
                inputProps: {
                    type: "password",
                    name: "confirm_password",
                    onChange: setState,
                    value: state.confirm_password
                },
                label: "Confirm Password",
                iconOnClick: passwordTextSwitch
            }
        },
    ]

    const [apiData, postApi] = useApi<{ email: string, password: string }>('/api/auth/login',);

    const formOnClick = (e) => {
        e.preventDefault();
        postApi(state)
            .then(() => {
                console.log(apiData)
            })

    }

    return (
        <AuthFormContainer>
            <AuthFormHeader text={SIGNUP_PAGE_TEXT}/>
            <AuthForm buttonText={"Sign Up"} loading={apiData.loading} formOnSubmit={formOnClick} fields={InputFields}/>
        </AuthFormContainer>
    )
}