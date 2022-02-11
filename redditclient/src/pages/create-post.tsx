import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../Components/InputField';
import { Layout } from '../Components/Layout';
import { Wrapper } from '../Components/Wrapper';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

const createPost: React.FC = () => {
    const [, createPost] = useCreatePostMutation()
    const router = useRouter()

    return (
        <Layout variant='small'>
            <Formik initialValues={{ title: "", text: "" }} onSubmit={async (values, { setErrors }) => {
                await createPost({ input: values })
                router.push("/")
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