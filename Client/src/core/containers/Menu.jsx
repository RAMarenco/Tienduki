import {useAuth} from './../AuthRoleUser';

let menuData = [];
const Menu = () => {   
    const user = useAuth().role;

    const ClientMenu = [
        {
            Page: "Stores"
        },
        {
            Page: "Cart"          
        },
        {
            Page: "Profile"
        },
        {
            Page: "LogOut"
        }
    ];

    const AdminMenu = [
        {
            Page: "Users"
        },
        {
            Page: "Stores"          
        },
        {
            Page: "Profile"
        },
        {
            Page: "LogOut"
        }
    ];

    const VendorMenu = [
        {
            Page: "Store"
        },        
        {
            Page: "Profile"
        },
        {
            Page: "LogOut"
        }
    ];

    const DefaultMenu = [
        {
            Page: "Stores"
        },
        {
            Page: "LogIn"
        }
    ]
    
    switch (user){
        case "Client":
            menuData = ClientMenu;
            break;
        case "Admin":
            menuData = AdminMenu;
            break;
        case "Vendor":
            menuData = VendorMenu;
            break;
        default:
            menuData = DefaultMenu;
            break;
    }
            
    return (menuData);
}
export default Menu();