'use client'

import React from 'react'
import { Box, Container, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, Badge } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function PagamentosPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box as="main" minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
          <Heading>Pagamentos</Heading>
          <Button leftIcon={<AddIcon />} colorScheme="blue">
            Novo Pagamento
          </Button>
        </Box>

        <Box bg={useColorModeValue('white', 'gray.700')} shadow="sm" rounded="lg" overflow="hidden">
          <Table>
            <Thead>
              <Tr>
                <Th>Fornecedor</Th>
                <Th>Valor</Th>
                <Th>Vencimento</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Carregando...</Td>
                <Td>Carregando...</Td>
                <Td>Carregando...</Td>
                <Td><Badge>Carregando...</Badge></Td>
                <Td>Carregando...</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Box>
  )
} 