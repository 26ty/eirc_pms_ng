export interface NavItem {
    id?: number
    name: string
    path: string
    icon?: string
    children?: NavItem[]
}
