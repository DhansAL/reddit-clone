import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Button, Link } from '@chakra-ui/react';
import { Wrapper } from '../Components/Wrapper';
import { InputField } from '../Components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link'

const Login: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [, login] = useLoginMutation()

    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ usernameOrEmail: "", password: "" }} onSubmit={async (values, { setErrors }) => {
                const response = await login(values);
                if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors))
                } else if (response.data?.login.user) {
                    if (typeof router.query.next === 'string') {
                        router.push(router.query.next)
                    } else {
                        router.push('/')
                    }
                }

            }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='usernameOrEmail' placeholder='username or email' label='username or email' />
                        <Box mt={4}>
                            <InputField name='password' placeholder='password' label='Password' type="password" />
                            <NextLink href={'/forgot-password'}>
                                <Link>
                                    forgot password?
                                </Link>
                            </NextLink>

                        </Box>
                        <Button type="submit" mt={4}
                            isLoading={isSubmitting}
                            colorScheme='teal'>login</Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>

    )
}
export default withUrqlClient(createUrqlClient)(Login);