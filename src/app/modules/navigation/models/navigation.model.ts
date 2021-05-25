export interface APPRouteData {
    title?: string;
    activeTopNav?: string;
    breadcrumbs?: Breadcrumb[];
    breadcrumb: string
}

export interface Breadcrumb {
    text: string;
    link?: string;
    active?: boolean;
}

export interface SideNavItems {
    [index: string]: SideNavItem;
}

export interface SideNavItem {
    icon?: string;
    text: string;
    link?: string;
    submenu?: SideNavItem[];
    isActive?: boolean;
    expanded?: boolean;
}

export interface SideNavSection {
    text?: string;
    items: string[];
}
