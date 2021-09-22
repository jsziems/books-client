import { NavItemProps } from "reactstrap";


// ToDo: Also need id?
export interface Resource {
    title: string,
    author: string,
    link: string,
    topic: string,
    media: string,
    readStatus: string,
    summary: string,
    rating: string,
    id?: Number
}