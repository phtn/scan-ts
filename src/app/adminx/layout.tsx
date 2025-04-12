import type { ReactNode } from "react";
import { TopOutlines } from "../_components/outlines";
import { Title } from "./components";
import { AuthCtxProvider } from "../_ctx/auth";
const AdminxLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthCtxProvider>
      <div className="container mx-auto max-w-4xl bg-gradient-to-b from-mariana via-deep to-black">
        <div className="h-14 relative w-full overflow-hidden">
          <TopOutlines />
          <Title />
        </div>
        <main className="h-[calc(100vh-56px)] overflow-y-scroll scroll-smooth w-full">
          {children}
        </main>
      </div>
    </AuthCtxProvider>
  );
};
export default AdminxLayout;
