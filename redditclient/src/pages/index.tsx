import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../Components/Layout";
import { Box, Button, Flex, Heading, Icon, IconButton, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const Index = () => {
  const [variables, setVariables] = useState({ limit: 15, cursor: null as null | string })
  const [{ data, fetching }] = usePostsQuery({
    variables
  });
  if (!fetching && !data) {
    return <>
      query failed
    </>
  }
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
          {data!.posts.posts.map((p) =>
            <Flex p={5} key={p.id} shadow='md' borderWidth='1px' >
              <Flex
                direction='column'
                justifyContent="center"
                alignItems='center'
                mr={4}
              >
                <IconButton aria-label='updoot post' icon={<ChevronUpIcon />} />
                {p.points}
                <IconButton aria-label='downdoot post' icon={<ChevronDownIcon />} />
              </Flex>
              <Box>
                <Heading fontSize='xl'>{p.title}</Heading>
                <Text mt={4}> posted by {p.creator.username}</Text>
                <Text mt={4}>{p.textSnippet}</Text> 
              </Box>

            </Flex>)}

        </Stack>
      )
      }
      {
        data && data.posts.hasMore ?
          <Flex>
            <Button
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
                })
              }}
              isLoading={fetching} m="auto" my={4}>load more..</Button>
          </Flex> : null
      }
    </Layout >
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index); 
