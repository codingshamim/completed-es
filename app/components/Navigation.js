// Navigation.jsx
import NavigationItem from "./NavigationItem";
import { NavData } from "../info/NavJson";
import CartAction from "./CartAction";
import cartCount from "../backend/models/cartCount";

export default async function Navigation() {
  const { count } = await cartCount();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto flex origin-bottom h-full max-h-[70px]">
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed bottom-0 inset-x-0 h-16 w-full to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] bg-secondary" />
      <div className="hidden md:flex w-max px-3 mb-6 rounded-2xl nav-border z-50 pointer-events-auto relative mx-auto min-h-full h-full items-center bg-black">
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

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-black border-t border-gray-800 z-50 pointer-events-auto">
        <div className="flex justify-around items-center h-16 px-4">
          {NavData.map((navItem) => (
            <NavigationItem
              key={navItem?.id}
              target={navItem?.link}
              label={navItem?.title}
              isMobile={true}
            >
              {navItem?.svg}
            </NavigationItem>
          ))}
          <CartAction count={count} isMobile={true} />
        </div>
      </div>
    </nav>
  );
}
