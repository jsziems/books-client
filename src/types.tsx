


export interface Resource {
    title: string,
    author: string,
    link: string,
    topic: string,
    media: string,
    readStatus: string,
    summary: string,
    rating: string,
    id?: number
}

export interface User {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    adminRole: boolean,
    createdAt: string,
    updatedAt: string
}