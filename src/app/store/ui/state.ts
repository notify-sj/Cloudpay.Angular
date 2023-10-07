export default <UiState>{
    navbarVariant: 'navbar-light',
    sidebarSkin: 'sidebar-dark-primary',
    menuSidebarCollapsed: true
    // screenSize: calculateWindowSize(window.innerWidth)
};

export interface UiState {
    menuSidebarCollapsed: boolean;
    navbarVariant: string;
    sidebarSkin?: string;
    screenSize: any;
}
