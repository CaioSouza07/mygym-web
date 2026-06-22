import BottomNavigation from "./BottomNavigation";
import Header from "./Header";

function LayoutPage({ children }) {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex w-full flex-col items-center min-h-screen p-4 gap-6 max-w-250 pb-28 lg:pb-4">
        <Header />
        {children}
        <BottomNavigation />
      </div>
    </div>
  );
}

export default LayoutPage;
