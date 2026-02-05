'use server'

import { z } from 'zod'
import { createClient } from '@supabase/supabase-js' // Direct client for Admin access
import { redirect } from 'next/navigation'

const formSchema = z.object({
    venueName: z.string().min(2, "Venue name is required"),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    annualWeddings: z.enum(["0-5", "6-20", "20+", "50+"]),
    painPoint: z.string().min(1, "Please select a primary challenge"),
})

export async function submitApplication(prevState: any, formData: FormData) {
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
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please check your entries and try again.',
        }
    }

    const { annualWeddings, email, firstName, painPoint, venueName } = validatedFields.data

    // 1. Init Edge-Safe Supabase Client (Admin Mode)
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

    // Logic Gate
    if (annualWeddings === '20+' || annualWeddings === '50+') {
        redirect('/schedule')
    } else {
        redirect('/waitlist')
    }
}
