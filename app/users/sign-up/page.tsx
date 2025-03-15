import SignupForm from '@/app/ui/signup-form';
import { Suspense } from 'react';

export default function SignUpPage() {
    return (
        <Suspense>
            <SignupForm />
        </Suspense>
    );
}