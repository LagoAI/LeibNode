import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    console.log('Received login request')
    const formData = await request.formData()
    const email = formData.get('mail')
    const password = formData.get('password')

    console.log('Making request to external API...')
    // Forward the request to the actual API
    const response = await fetch('http://43.134.94.194:1314/user/login', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    })

    console.log('External API response status:', response.status)
    const responseText = await response.text()
    console.log('External API response:', responseText)

    try {
      // Try to parse as JSON
      const data = JSON.parse(responseText)
      console.log('Parsed response:', data)
      return NextResponse.json(data)
    } catch (e) {
      console.error('Failed to parse response as JSON:', e)
      return NextResponse.json(
        { error: 'Invalid response from server' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 500 }
    )
  }
} 