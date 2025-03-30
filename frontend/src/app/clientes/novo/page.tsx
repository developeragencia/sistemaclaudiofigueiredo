'use client'

import React from 'react'
import { Box, Container, Heading, useColorModeValue } from '@chakra-ui/react'
import { ClienteForm } from '@/components/ClienteForm'

export default function NovoClientePage() {
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box as="main" minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.md">
        <Heading mb={6}>Novo Cliente</Heading>
        <Box bg={useColorModeValue('white', 'gray.700')} p={6} rounded="lg" shadow="base">
          <ClienteForm />
        </Box>
      </Container>
    </Box>
  )
} 