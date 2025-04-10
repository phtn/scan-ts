import type { ReactNode } from "react";
import { TopOutlines } from "../_components/outlines";
import { Title } from "./components";

const AdminxLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div className="h-14 relative w-full overflow-hidden">
        <TopOutlines />
        <Title />
      </div>
      <div className="h-[calc(100vh-56px)] overflow-y-scroll scroll-smooth w-full">
        {children}
      </div>
    </main>
  );
};
export default AdminxLayout;
