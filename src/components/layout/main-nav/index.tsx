import { useIsMobile } from "@/hooks/use-mobile.ts";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";

export function MainNav() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex gap-4 flex-wrap px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 shadow-sm border border-stone-200 dark:border-stone-700">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-bold px-4 py-2 rounded-md ">
            메뉴
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[180px] rounded-xl shadow-lg border bg-white dark:bg-stone-900 dark:border-stone-800 transition-all">
            <ul className="space-y-1 py-2 px-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/start">🏁 Getting Started</Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link to="/fish-pond">🐟 Fish Pond</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
