import { SideNavItems, SideNavSection } from '@app/modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard', 'screens', 'about'],
    },
    {
        text: 'INTERFACE',
        items: ['pages'],
    },
];

//export const sideNavItems: SideNavItems = {
export const sideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard'
    },
    about:{
        icon: 'info',
        text: 'About',
        link: '/about'
    },
    screens: {
        icon: 'columns',
        text: 'Screens',
        submenu: [
            {
                icon: 'clone',
                text: 'Posts',
                link: '/posts'
            },
            {
                icon: 'bug',
                text: 'Issues',
                link: '/issues'
            }
        ],
    },
    pages: {
        icon: 'book-open',
        text: 'Pages',
        submenu: [
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401'
                    },
                    {
                        text: '404 Page',
                        link: '/error/404'
                    },
                    {
                        text: '500 Page',
                        link: '/error/500'
                    },
                ],
            },
        ],
    },
    [Symbol.iterator]: function* () {
        let properties = Object.keys(this);
        for (let i of properties) {
            yield [i, this[i]];
        }
    }
};
