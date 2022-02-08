import React from 'react';
import { Form, Formik } from 'formik'
    ;
interface registerProps {

}

const Register: React.FC<registerProps> = ({

}) => {
    return (
        <Formik initialValues={{ username: "", password: "" }}>
            {() => (
                <Form>
                    <div className="">hello </div>
                </Form>
            )}
        </Formik>
    )
}
export default Register;