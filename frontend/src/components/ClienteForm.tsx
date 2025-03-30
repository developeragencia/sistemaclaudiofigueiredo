'use client'

import React from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { clientesService } from '@/services/clientes'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
})

interface ClienteFormData {
  nome: string
  email: string
  telefone: string
}

interface ClienteFormProps {
  clienteId?: number
  initialData?: ClienteFormData
}

export function ClienteForm({ clienteId, initialData }: ClienteFormProps) {
  const router = useRouter()
  const toast = useToast()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClienteFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: ClienteFormData) => {
    try {
      if (clienteId) {
        await clientesService.atualizar(clienteId, data)
        toast({
          title: 'Cliente atualizado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        await clientesService.criar(data)
        toast({
          title: 'Cliente criado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
      router.push('/clientes')
    } catch (error) {
      toast({
        title: 'Erro ao salvar cliente',
        description: 'Tente novamente mais tarde',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.nome}>
          <FormLabel>Nome</FormLabel>
          <Input {...register('nome')} />
          <FormErrorMessage>{errors.nome?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.telefone}>
          <FormLabel>Telefone</FormLabel>
          <Input {...register('telefone')} />
          <FormErrorMessage>{errors.telefone?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isSubmitting}
        >
          {clienteId ? 'Atualizar' : 'Criar'}
        </Button>
      </Stack>
    </Box>
  )
} 