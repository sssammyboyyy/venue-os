import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

const formSchema = z.object({
    venueName: z.string().min(2, "Venue name is required"),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    annualWeddings: z.enum(["0-5", "6-20", "20+", "50+"]),
    painPoint: z.string().min(1, "Please select a primary challenge"),
})

export async function POST(request: NextRequest) {
    try {
        // Validate environment variables first
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
            console.error('Missing NEXT_PUBLIC_SUPABASE_URL')
            return NextResponse.json({ message: 'Server configuration error: Missing Supabase URL' }, { status: 500 })
        }
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            console.error('Missing SUPABASE_SERVICE_ROLE_KEY')
            return NextResponse.json({ message: 'Server configuration error: Missing service key' }, { status: 500 })
        }

        const formData = await request.formData()

        const data = {
            venueName: formData.get('venueName'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            annualWeddings: formData.get('annualWeddings'),
            painPoint: formData.get('painPoint'),
        }

        const validatedFields = formSchema.safeParse(data)

        if (!validatedFields.success) {
            return NextResponse.json({
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Please check your entries and try again.',
            }, { status: 400 })
        }

        const { annualWeddings, email, firstName, painPoint, venueName } = validatedFields.data

        // Init Supabase Client (Admin Mode)
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        // Insert into Supabase
        const { error } = await supabase.from('applications').insert({
            venue_name: venueName,
            first_name: firstName,
            last_name: validatedFields.data.lastName,
            email: email,
            annual_weddings: annualWeddings,
            pain_point: painPoint,
            status: 'new'
        })

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json({
                errors: {},
                message: 'Something went wrong. Please try again.',
            }, { status: 500 })
        }

        // Determine redirect
        const redirectUrl = annualWeddings === '20+' || annualWeddings === '50+'
            ? '/schedule'
            : '/waitlist'

        return NextResponse.json({
            success: true,
            redirect: redirectUrl
        })
    } catch (err) {
        console.error('API error:', err)
        return NextResponse.json({
            message: 'Server error. Please try again.',
        }, { status: 500 })
    }
}
