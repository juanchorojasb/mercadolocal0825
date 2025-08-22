import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Únete a MercadoLocal
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Norte de Caldas - Programa de Emprendimiento
          </p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-lg"
            }
          }}
          redirectUrl="/onboarding/planes"
          afterSignUpUrl="/onboarding/planes"
        />
      </div>
    </div>
  )
}
