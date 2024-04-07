import React from 'react';
import "./cms.layout.css";
import { Outlet } from 'react-router-dom';
import TopHeaderComponent from '../../../component/cms/top-header/top-header.component';
import SidebarComponent from '../../../component/cms/sidebar/sidebar.component';
import FooterComponent from '../../../component/cms/footer/footer.component';

export default function CMSLayout() {
  return (
    <>
        <TopHeaderComponent/>
        <div id="layoutSidenav">
            <SidebarComponent/>
            <div id="layoutSidenav_content">
                <main>
                    {/* content of the page from child */}
                  <Outlet/>
                </main>
                <FooterComponent/>
            </div>
        </div>
    </>
  )
}
