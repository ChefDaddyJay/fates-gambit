import { Clickable } from "@/app/ui/utils";

export default function WelcomeOptions() {
    return (
        <div className="flex justify-center">
            <Clickable href="/users/sign-in" text="Sign In" />
            <Clickable href="/users/sign-up" text="Sign Up" />
        </div>
    );
}