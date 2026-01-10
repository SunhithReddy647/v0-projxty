import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_YvsUPvx7_29QF23me5TzZXMXzfomH3JHb')

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    console.log('[v0] Project inquiry received:', data)

    try {
      await resend.emails.send({
        from: 'Projxty <onboarding@resend.dev>',
        to: ['projxty@gmail.com'],
        subject: `New Project Inquiry - ${data.projectType}`,
        html: `
          <h2>New Project Inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <hr>
          <p><strong>Project Type:</strong> ${data.projectType}</p>
          <p><strong>Budget:</strong> ${data.budget}</p>
          <p><strong>Timeline:</strong> ${data.timeline}</p>
          <p><strong>Description:</strong> ${data.description}</p>
          <p><strong>Features:</strong> ${data.features.join(', ')}</p>
        `
      })
      console.log('[v0] Email sent successfully')
    } catch (emailError: any) {
      console.error('[v0] Resend error:', emailError.message)
    }

    return NextResponse.json({ success: true, message: 'Inquiry received!' })
  } catch (error) {
    console.error('[v0] Error:', error)
    return NextResponse.json({ success: false, message: 'Error occurred' }, { status: 500 })
  }
}
