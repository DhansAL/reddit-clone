import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Box, Heading } from '@chakra-ui/react'
import React from 'react'

export const UpdootSection = () => {
  return (
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

  </Flex>
  )
}
