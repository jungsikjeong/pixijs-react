import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile.ts";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";

export function MainNav() {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center p-4">
      <NavigationMenu viewport={isMobile} className="max-w-max">
        <NavigationMenuList
          className={cn(
            "flex gap-1 px-1.5 py-1.5 rounded-2xl transition-all duration-300",
            "bg-white/70 dark:bg-stone-900/70 backdrop-blur-xl",
            "border border-white/40 dark:border-stone-800/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]"
          )}
        >
          <MenuLink to="/" label="Home" active={pathname === "/"} />

          <MenuLink
            to="/start"
            label="🏁 Getting Started"
            active={pathname === "/start"}
          />
          <MenuLink
            to="/fish-pond"
            label="🐟 Fish Pond"
            active={pathname === "/fish-pond"}
          />

          <MenuLink
            to="/train"
            label="🚂 Train"
            active={pathname === "/train"}
          />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function MenuLink({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active: boolean;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className={cn(
            "h-9 px-4 flex items-center text-[13px] font-medium tracking-tight hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-all",
            active && "bg-black/5 dark:bg-white/10"
          )}
        >
          {label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
