import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { PostSnippetFragment, PostsQuery, useVoteMutation } from '../generated/graphql'

interface UpdootSectionProps {
  // post: PostsQuery['posts']['posts'][0]
  post: PostSnippetFragment
  //917
}
export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation()
  return (
    <Flex
      direction='column'
      justifyContent="center"
      alignItems='center'
      mr={4}
    >
      <IconButton onClick={() => {
        vote({
          postId: post.id,
          value: 1
        })
      }} aria-label='updoot post' icon={<ChevronUpIcon />} />
      {post.points}
      <IconButton onClick={() => {
        vote({
          postId: post.id,
          value: -1
        })
      }} aria-label='downdoot post' icon={<ChevronDownIcon />} />
    </Flex>
  )
}
