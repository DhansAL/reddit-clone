import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { InputField } from '../Components/InputField';
import { Layout } from '../Components/Layout';
import { Wrapper } from '../Components/Wrapper';
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const createPost: React.FC = () => {
    const [, createPost] = useCreatePostMutation()
    const router = useRouter()
    useIsAuth()
    return (
        <Layout variant='small'>
            <Formik initialValues={{ title: "", text: "" }} onSubmit={async (values, { setErrors }) => {
                const { error } = await createPost({ input: values })
                if (!error) {
                    router.push("/")
                }
            }}>

                {({ isSubmitting }) => (
                    <Form>
                        <InputField name='title' placeholder='title' label='title' />
                        <Box mt={4}>
                            <InputField textarea name='text' placeholder='text' label='body' type="text" />
                        </Box>
                        <Button type="submit" mt={4}
                            isLoading={isSubmitting}
                            colorScheme='teal'>create post</Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient)(createPost)