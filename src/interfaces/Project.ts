import User from './User'
export default interface Project {
    id: number,
    name: string,
    description: string,
    owner: User
}