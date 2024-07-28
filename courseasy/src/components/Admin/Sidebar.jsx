import React from 'react';
import { Button, HStack, VStack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';

const Sidebar = () => {
  return (
    <VStack spacing="8" p={'16'} boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
      <LinkButton
        url={'dashboard'}
        Icon={RiDashboardFill}
        title={'Dashboard'}
      />
      <LinkButton
        url={'createcourse'}
        Icon={RiAddCircleFill}
        title={'Create Course'}
      />
      <LinkButton url={'courses'} Icon={RiEyeFill} title={'Courses'} />
      <LinkButton url={'users'} Icon={RiUser3Fill} title={'Users'} />
    </VStack>
  );
};

export default Sidebar;

function LinkButton({ url, Icon, title }) {
  return (
    <Link to={`/admin/${url}`}>
      <Button fontSize={'medium'} colorScheme={'purple'}>
        <Icon style={{ margin: '4px' }} />
        {title}
      </Button>
    </Link>
  );
}
