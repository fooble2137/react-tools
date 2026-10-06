import { Link, useLocation } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { navbarItems } from "#/data/navbar";
import { cn } from "cn";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />}>
              <img
                src="/assets/fooble/logo.png"
                className="size-8 rounded-md"
              />

              <span className="font-medium text-base">Fooble Tools</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navbarItems.map((group) => (
          <SidebarGroup key={group.name}>
            <SidebarGroupLabel>{group.name}</SidebarGroupLabel>

            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link to={item.href} />}
                    isActive={pathname.startsWith(item.href)}
                    disabled={item.disabled}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>

                  <SidebarMenuBadge
                    className={cn(
                      item.name,
                      "bg-primary text-primary-foreground!",
                    )}
                  >
                    {item.disabled ? "Soon" : "New"}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
