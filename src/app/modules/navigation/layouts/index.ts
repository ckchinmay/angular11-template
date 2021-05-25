import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { LayoutErrorComponent } from './layout-error/layout-error.component';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { LayoutTermsComponent } from './layout-terms/layout-terms.component';

export const layouts = [
    LayoutAuthComponent, 
    LayoutErrorComponent, 
    LayoutDefaultComponent,
    LayoutTermsComponent];

export * from './layout-auth/layout-auth.component';
export * from './layout-error/layout-error.component';
export * from './layout-default/layout-default.component';
export * from './layout-terms/layout-terms.component';
