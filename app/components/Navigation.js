import NavigationItem from "./NavigationItem";
import { NavData } from "../info/NavJson";
import CartAction from "./CartAction";
import cartCount from "../backend/models/cartCount";

export default async function Navigation() {
  const { count } = await cartCount();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] bg-secondary" />
      <div className="w-max p-2 rounded-full nav-border z-50 transition-all duration-150 pointer-events-auto relative space-x-3 mx-auto flex min-h-full h-full items-center px-2 bg-black shadow-lg">
        {NavData.map((navItem) => (
          <NavigationItem
            key={navItem?.id}
            target={navItem?.link}
            label={navItem?.title}
          >
            {navItem?.svg}
          </NavigationItem>
        ))}
        <CartAction count={count} />
      </div>
    </nav>
  );
}
