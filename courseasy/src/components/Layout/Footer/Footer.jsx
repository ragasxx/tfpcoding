import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialInstagramCircular,
  TiSocialYoutubeCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';

const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading size={'md'} children="All Rights Reserved" />
          <Heading fontFamily={'body'} size="sm" children="@Courseasy" />
        </VStack>
        <HStack
          spacing={['2', '10']}
          justifyContent="center"
          color={'white'}
          fontSize="50"
        >
          <a href="https://www.youtube.com/@indnetworks1" target={'blank'}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://github.com/ragasxx" target={'blank'}>
            <DiGithub />
          </a>
          <a href="https://ragasxx.github.io/portfolio/" target={'blank'}>
            <TiSocialInstagramCircular />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
