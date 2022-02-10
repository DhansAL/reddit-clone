import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next'
import router from 'next/router';
import React from 'react'
import { InputField } from '../../Components/InputField';
import { Wrapper } from '../../Components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import login from '../login';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ newPassword: "" }} onSubmit={async (values, { setErrors }) => {
                // const response = await login(values);
                // if (response.data?.login.errors) {

                //     setErrors(toErrorMap(response.data.login.errors))
                // } else if (response.data?.login.user) {
                //     router.push("/")
                // }

            }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='newPassword' type="password" placeholder='new Password' label='new Password' />

                        <Button type="submit" mt={4}
                            isLoading={isSubmitting}
                            colorScheme='teal'>Change password</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>

    )
}

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    }
}

export default ChangePassword 