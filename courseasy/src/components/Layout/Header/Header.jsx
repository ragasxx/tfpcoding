import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';
import tfpLogo from '../../../assets/images/tfpLogo.png';

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

const Header = ({ isAuthenticated, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    onClose();
  };

  const drawerBg = useColorModeValue('gray.200', 'gray.900'); // Use custom dark color

  return (
    <>
      <ColorModeSwitcher />

      <Button
        onClick={onOpen}
        zIndex="overlay"
        colorScheme={'blue'}
        width="12"
        height={'12'}
        rounded="full"
        position={'fixed'}
        top="5"
        left={'5'}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(3px)'} />
        <DrawerContent bg={drawerBg}>
          <DrawerHeader borderBottomWidth={'1px'}>
            <img
              src={tfpLogo}
              alt="logo"
              style={{ width: '90px', padding: '3px' }}
              loading="lazy"
            />
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={'4'} alignItems="flex-start">
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request a Course"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />

              <HStack
                justifyContent={'space-evenly'}
                position="absolute"
                bottom={'2rem'}
                width="80%"
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link to="/profile" onClick={onClose}>
                          <Button variant={'ghost'} colorScheme={'blue'}>
                            Profile
                          </Button>
                        </Link>

                        <Button
                          colorScheme="red"
                          variant={'ghost'}
                          onClick={logoutHandler}
                        >
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>

                      {user && user.role === 'admin' && (
                        <Link to="/admin/dashboard" onClick={onClose}>
                          <Button
                            colorScheme={'purple'}
                            variant="ghost"
                            onClick={onClose}
                          >
                            <RiDashboardFill />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={onClose}>
                      <Button colorScheme={'blue'} onClick={onClose}>
                        Login
                      </Button>
                    </Link>
                    <p>OR</p>
                    <Link to="/register" onClick={onClose}>
                      <Button colorScheme={'blue'} onClick={onClose}>
                        Signup
                      </Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
