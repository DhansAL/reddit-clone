import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../Components/Layout";
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10
    }
  });
  console.log(data);

  return (
    <Layout>
      <Flex>
        <Heading >LiReddit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>

      <br />
      {fetching && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.map((p) =>
            <Box p={5} key={p.id} shadow='md' borderWidth='1px' >
              <Heading fontSize='xl'>{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>)}

        </Stack>
      )}
      {
        data ? <Flex>
          <Button isLoading={fetching} m="auto" my={4}>load more..</Button>
        </Flex> : null
      }
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index); 
