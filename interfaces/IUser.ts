export interface IUser {
    website: string | null,
    subscription_id: string | null,
    gdc_number: string,
    profileBio: string | null,
    email: string,
    accountType: string,
    qualifications: string | null,
    username: string,
    exp: string | null,
    phone: string | null,
    auth_time: string | null,
    title: string | null,
    created_at: Date,
    isSuspended?: boolean
}
