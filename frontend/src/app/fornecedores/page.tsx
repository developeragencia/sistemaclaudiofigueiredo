'use client'

import React from 'react'
import { Box, Container, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function FornecedoresPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box as="main" minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          <Heading>Fornecedores</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="blue">
            Novo Fornecedor
          </Button>
        </Box>

        <Box bg={useColorModeValue('white', 'gray.700')} shadow="sm" rounded="lg" overflow="hidden">
          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>CNPJ</Th>
                <Th>Contato</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Carregando...</Td>
                <Td>Carregando...</Td>
                <Td>Carregando...</Td>
                <Td>Carregando...</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Box>
  )
} 