import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return <div className='h-[calc(100vh-4rem)] w-full flex justify-center items-center '>
        <SignIn signUpUrl='/sign-up' forceRedirectUrl='/'/>
    </div>
}