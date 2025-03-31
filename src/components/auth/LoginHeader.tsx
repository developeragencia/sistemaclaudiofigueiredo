import Link from 'next/link'

export function LoginHeader() {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Bem-vindo de volta
      </h1>
      <p className="text-sm text-muted-foreground">
        Entre com seu email e senha para acessar sua conta
      </p>
      <p className="text-sm text-muted-foreground">
        Não tem uma conta?{' '}
        <Link
          href="/auth/register"
          className="underline underline-offset-4 hover:text-primary"
        >
          Registre-se
        </Link>
      </p>
    </div>
  )
}
