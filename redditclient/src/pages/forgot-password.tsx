import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React, { useState } from 'react'
import { InputField } from '../Components/InputField';
import { Wrapper } from '../Components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import login from './login';
import NextLink from 'next/link'
import { useForgotPasswordMutation, useLoginMutation } from '../generated/graphql';


export const ForgotPassword: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [complete, setComplete] = useState(false)
    const [, forgotPassword] = useForgotPasswordMutation()
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ email: "" }} onSubmit={async (values) => {
                await forgotPassword(values)
                setComplete(true)

            }}>
                {({ isSubmitting }) => complete ? <Box>if an account with that email exists we sent you an email</Box> : (
                    <Form>
                        <Box mt={4}>
                            <InputField name='email' placeholder='email' label='email' type="email" />
                        </Box>
                        <Button type="submit" mt={4}
                            isLoading={isSubmitting}
                            colorScheme='teal'>forgot password</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)