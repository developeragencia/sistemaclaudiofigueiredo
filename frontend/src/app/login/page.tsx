'use client'

import React from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const toast = useToast()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await authService.login(data)
      localStorage.setItem('token', response.access_token)
      router.push('/')
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Verifique suas credenciais e tente novamente',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box minH="100vh" py={12} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Container maxW="lg">
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          p={8}
          rounded="lg"
          shadow="base"
        >
          <Stack spacing={4}>
            <Heading textAlign="center">Login</Heading>
            <Text textAlign="center" color="gray.600">
              Entre com suas credenciais para acessar o sistema
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    {...register('email', {
                      required: 'Email é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido',
                      },
                    })}
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    {...register('password', {
                      required: 'Senha é obrigatória',
                      minLength: {
                        value: 6,
                        message: 'A senha deve ter pelo menos 6 caracteres',
                      },
                    })}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  isLoading={isSubmitting}
                >
                  Entrar
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
} 