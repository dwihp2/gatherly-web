import { Metadata } from 'next'
import { SignInContainer } from '../view/container/SignInContainer'

export const metadata: Metadata = {
  title: 'Sign In - Gatherly',
  description: 'Sign in to your Gatherly organizer account',
}

export default function SignInPage() {
  return <SignInContainer />
}
