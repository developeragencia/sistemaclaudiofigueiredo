'use client'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

const Links = [
  { name: 'Dashboard', href: '/' },
  { name: 'Clientes', href: '/clientes' },
  { name: 'Fornecedores', href: '/fornecedores' },
  { name: 'Pagamentos', href: '/pagamentos' },
]

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const pathname = usePathname()

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Text fontSize="xl" fontWeight="bold">Sistema Claudio</Text>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NextLink key={link.href} href={link.href} passHref>
                <Button
                  as="a"
                  variant={pathname === link.href ? 'solid' : 'ghost'}
                  colorScheme={pathname === link.href ? 'blue' : undefined}
                >
                  {link.name}
                </Button>
              </NextLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <IconButton
            mr={4}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
          />
          <Menu>
            <MenuButton as={Button} variant="ghost">
              Perfil
            </MenuButton>
            <MenuList>
              <MenuItem>Configurações</MenuItem>
              <MenuItem>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NextLink key={link.href} href={link.href} passHref>
                <Button
                  as="a"
                  w="full"
                  variant={pathname === link.href ? 'solid' : 'ghost'}
                  colorScheme={pathname === link.href ? 'blue' : undefined}
                >
                  {link.name}
                </Button>
              </NextLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
} 