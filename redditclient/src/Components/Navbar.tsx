import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react'
import React from 'react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';

export const Navbar: React.FC = () => {
    //whats the first arg?
    const [{ data, fetching }] = useMeQuery()

    let body = null;
    if (fetching) {

    } else if (!data?.me) {
        body = (
            <>
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
            </>
        )
    } else {
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button variant="link ">logout</Button>

            </Flex>
        )
    }

    return (
        <Flex bg="tomato" p={4}>
            <Box ml={'auto'}>
                {body}
            </Box>
        </Flex>
    )
};
