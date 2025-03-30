'use client'

import { Box, Container, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { DashboardCard } from '@/components/DashboardCard'
import { FaUsers, FaStore, FaMoneyBillWave } from 'react-icons/fa'

export default function Home() {
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box as="main" minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl">
        <Heading mb={6}>Dashboard</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <DashboardCard
            title="Clientes"
            icon={FaUsers}
            value="0"
            href="/clientes"
          />
          <DashboardCard
            title="Fornecedores"
            icon={FaStore}
            value="0"
            href="/fornecedores"
          />
          <DashboardCard
            title="Pagamentos"
            icon={FaMoneyBillWave}
            value="R$ 0,00"
            href="/pagamentos"
          />
        </SimpleGrid>
      </Container>
    </Box>
  )
} 