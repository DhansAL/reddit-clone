import React from 'react';
import { Form, Formik } from 'formik'
    ;
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../Components/Wrapper';
import { InputField } from '../Components/InputField';
interface registerProps {

}

const Register: React.FC<registerProps> = ({

}) => {
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => {
                console.log(values);

            }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='username' placeholder='username' label='Username' />
                        <Box mt={4}>
                            <InputField name='password' placeholder='password' label='Password' type="password" />

                        </Box>
                        <Button type="submit" mt={4}
                            isLoading={isSubmitting}
                            colorScheme='teal'>register</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>

    )
}
export default Register;