import type { ReactNode } from "react";
import { TopOutlines } from "../_components/outlines";
import { Title } from "./components";
import { AuthCtxProvider } from "../_ctx/auth";
import { getUsername } from "../actions";

const AdminxLayout = async ({ children }: { children: ReactNode }) => {
  const un = await getUsername();
  return (
    <AuthCtxProvider>
      <div className="container mx-auto max-w-4xl bg-gradient-to-b from-mariana via-deep to-black">
        <div className="h-14 relative w-full overflow-hidden">
          <TopOutlines />
          <Title un={un} />
        </div>
        <main className="h-[calc(100vh-56px)] overflow-y-scroll scroll-smooth w-full">
          {children}
        </main>
      </div>
    </AuthCtxProvider>
  );
};
export default AdminxLayout;
