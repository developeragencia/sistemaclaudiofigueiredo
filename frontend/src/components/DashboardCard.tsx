'use client'

import { Box, Heading, Text, VStack, Icon, LinkBox, LinkOverlay, useColorModeValue } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import NextLink from 'next/link'

interface DashboardCardProps {
  title: string
  icon: IconType
  value: string
  href: string
}

export function DashboardCard({ title, icon, value, href }: DashboardCardProps) {
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <LinkBox as="article">
      <Box
        p={6}
        bg={bgColor}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
        _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
        transition="all 0.2s"
      >
        <VStack spacing={4} align="center">
          <Icon as={icon} boxSize={8} color="blue.500" />
          <LinkOverlay as={NextLink} href={href}>
            <Heading size="md" textAlign="center">{title}</Heading>
          </LinkOverlay>
          <Text fontSize="2xl" fontWeight="bold">{value}</Text>
        </VStack>
      </Box>
    </LinkBox>
  )
} 