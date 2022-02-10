import { Box, Button, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql';
import router, { useRouter } from 'next/router';
import React, { useState } from 'react'
import { InputField } from '../../Components/InputField';
import { Wrapper } from '../../Components/Wrapper';
import { useChangePasswordMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link'

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    const router = useRouter()
    const [, changePassword] = useChangePasswordMutation()
    const [tokenError, setTokenError] = useState("")
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ newPassword: "" }} onSubmit={async (values, { setErrors }) => {

                const response = await changePassword({ newPassword: values.newPassword, token });
                if (response.data?.changePassword.errors) {
                    const errorMap = toErrorMap(response.data.changePassword.errors)
                    if ('token' in errorMap) {
                        setTokenError(errorMap.token)
                    }
                    setErrors(errorMap)
                } else if (response.data?.changePassword.user) {
                    router.push("/")
                }

            }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='newPassword' type="password" placeholder='new Password' label='New Password' />
                        {tokenError ? <Box color='red'>
                            <Box color="red">{tokenError}</Box>
                            <NextLink href={'/forgot-password'}>
                                <Link>
                                    try forgetting again
                                </Link>
                            </NextLink>

                        </Box> : null}
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

export default withUrqlClient(createUrqlClient)(ChangePassword) 