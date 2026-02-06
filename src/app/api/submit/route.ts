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
        // Step 1: Validate environment variables
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl) {
            return NextResponse.json({
                message: 'Config error: SUPABASE_URL missing',
                step: 'env_check'
            }, { status: 500 })
        }
        if (!serviceKey) {
            return NextResponse.json({
                message: 'Config error: SERVICE_KEY missing',
                step: 'env_check'
            }, { status: 500 })
        }

        // Step 2: Parse form data
        let formData: FormData
        try {
            formData = await request.formData()
        } catch (e) {
            return NextResponse.json({
                message: 'Failed to parse form data',
                step: 'formdata_parse',
                error: String(e)
            }, { status: 400 })
        }

        const data = {
            venueName: formData.get('venueName'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            annualWeddings: formData.get('annualWeddings'),
            painPoint: formData.get('painPoint'),
        }

        // Step 3: Validate with Zod
        const validatedFields = formSchema.safeParse(data)

        if (!validatedFields.success) {
            return NextResponse.json({
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Validation failed',
                step: 'validation'
            }, { status: 400 })
        }

        const { annualWeddings, email, firstName, painPoint, venueName } = validatedFields.data

        // Step 4: Initialize Supabase
        let supabase
        try {
            supabase = createClient(supabaseUrl, serviceKey)
        } catch (e) {
            return NextResponse.json({
                message: 'Failed to create Supabase client',
                step: 'supabase_init',
                error: String(e)
            }, { status: 500 })
        }

        // Step 5: Insert into database
        const { data: insertData, error } = await supabase.from('applications').insert({
            venue_name: venueName,
            first_name: firstName,
            last_name: validatedFields.data.lastName,
            email: email,
            annual_weddings: annualWeddings,
            pain_point: painPoint,
            status: 'new'
        }).select()

        if (error) {
            return NextResponse.json({
                message: `Database error: ${error.message}`,
                step: 'db_insert',
                code: error.code,
                details: error.details
            }, { status: 500 })
        }

        // Step 6: Success - determine redirect
        const redirectUrl = annualWeddings === '20+' || annualWeddings === '50+'
            ? '/schedule'
            : '/waitlist'

        return NextResponse.json({
            success: true,
            redirect: redirectUrl
        })
    } catch (err: any) {
        return NextResponse.json({
            message: `Unexpected error: ${err?.message || String(err)}`,
            step: 'catch_all',
            stack: err?.stack?.substring(0, 500)
        }, { status: 500 })
    }
}
