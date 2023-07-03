import {FC} from "react";
import {
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {Link, matchPath, useLocation} from "react-router-dom";
import {Assignment, Lightbulb, MenuBook} from "@mui/icons-material";

interface SidebarProps {
    open: boolean;
    handleToggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({open, handleToggle}) => {
    const location = useLocation();

    const isItemActive = (route: string) => {
        const match =matchPath({ path: route, end: false }, location.pathname);
        return match !== null;
    };

    return (
        <Drawer
            onClose={handleToggle}
            variant="temporary"
            anchor="left"
            open={open}
        >
            <List component="nav">
                <ListItemButton component={Link} to="/main">
                    <ListItemIcon>
                        <MenuBook />
                    </ListItemIcon>
                    <ListItemText primary="Trading Journal" />
                </ListItemButton>
                <Divider />
                <Typography variant="subtitle2" color="textSecondary" sx={{ pl: 2, pt: 1 }}>
                    Menu
                </Typography>
                <ListItemButton
                    component={Link}
                    to="/trades"
                    selected={isItemActive('/trades')}
                >
                    <ListItemIcon>
                        <Assignment />
                    </ListItemIcon>
                    <ListItemText primary="Trades" />
                </ListItemButton>
                <ListItemButton
                    component={Link}
                    to="/strategies"
                    selected={isItemActive('/strategies')}
                >
                    <ListItemIcon>
                        <Lightbulb />
                    </ListItemIcon>
                    <ListItemText primary="Strategies" />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default Sidebar;
