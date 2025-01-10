import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  // Get auth token from cookies
  const authCookie = cookies().get('auth-storage')
  if (!authCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const authData = JSON.parse(authCookie.value)
    const apiKey = authData.state?.apiKey

    if (!apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get deployment data from request
    const deployData = await request.json()

    // Forward the request to the actual API with the auth header
    const response = await fetch('http://43.134.94.194:1314/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        'Accept': 'application/json',
      },
      body: JSON.stringify(deployData)
    })

    if (!response.ok) {
      const error = await response.text()
      return NextResponse.json({ error }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Deploy error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 