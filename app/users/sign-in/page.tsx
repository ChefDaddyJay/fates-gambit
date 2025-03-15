import SigninForm from '@/app/ui/signin-form';
import { Suspense } from 'react';

export default function SignInPage() {
    return (
        <Suspense>
            <SigninForm />
        </Suspense>
    );
}