import React from 'react';
    import { Menubar } from 'primereact/menubar';
    import { InputText } from 'primereact/inputtext';
    import { Badge } from 'primereact/badge';
    import { Avatar } from 'primereact/avatar';  
import { Button } from 'primereact/button';
import { Link, Outlet } from 'react-router-dom';
    

const Home=()=>{

        const itemRenderer = (item) => (
            <a className="flex align-items-center p-menuitem-link">
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.badge && <Badge className="ml-auto" value={item.badge} />}
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </a>
        );
        const items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                url:'/user/home'
            },
            {
                label: 'Courses',
                icon: 'pi pi-list',
                url:'/user/lesson'
                
            },
            {
                label: 'My Account',
                icon: 'pi pi-user',
                url:'/user/myAccount'
            }
            
        ];
    
        const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
        const end = (
            <div className="flex align-items-center gap-2">
                <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            </div>
        );
    
        return (
            <>
            
            <div >
                <Menubar 
                model={items} 
            end={end}/> 
            <Outlet/>
           
           
      </div>
            </>
        )
    }
            
export default Home