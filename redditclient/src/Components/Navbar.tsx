import { Box, Flex } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react'
import React from 'react';
import NextLink from 'next/link';

export const Navbar: React.FC = () => {
    return (
        <Flex bg="tomato" p={4}>
            <Box ml={'auto'}>
                <NextLink href='/login'>
                    <Link mr={2}>
                        login
                    </Link>
                </NextLink>
                <NextLink href='/register'>
                    <Link mr={2}>
                        register
                    </Link>
                </NextLink>
            </Box>
        </Flex>
    )
};
